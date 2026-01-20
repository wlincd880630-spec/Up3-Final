import os
import json
import time
import re
import subprocess
import base64
import requests
import warnings

# 屏蔽 Google SDK 弃用警告
warnings.simplefilter(action='ignore', category=FutureWarning)

import google.generativeai as genai
from jinja2 import Template
import azure.cognitiveservices.speech as speechsdk

# ==========================================
# CONFIGURATION
# ==========================================
AZURE_KEY = "DKRXk8ueSfo5NdIOMqFRTCAfpeGDezJ3Snf5K8gGgtyqxiWdugLzJQQJ99BLACHYHv6XJ3w3AAAYACOGUYP9"
AZURE_REGION = "eastus2"
DEEPSEEK_KEY = "sk-daa16008e81843deba6fefe9dce51465"
os.environ["GOOGLE_API_KEY"] = "AIzaSyB-gmri47Fok0bS9nVAoVzswrs2DleFM6E"

MODEL_NAME = "gemini-2.0-flash" 
IMAGEN_MODEL = "imagen-3.0-generate-001"

VIDEO_FILE = "Video.mp4"
TEMP_AUDIO = "temp_audio.wav"
CACHE_FILE = "subtitles_cache.json"

# ==========================================
# 1. AUDIO
# ==========================================
def step1_extract_audio():
    print(f"\n🔨 [Step 1] Extracting Audio...")
    if os.path.exists(TEMP_AUDIO): return True
    if not os.path.exists("ffmpeg.exe"): print("❌ No ffmpeg.exe"); return False
    cmd = f'ffmpeg.exe -i "{VIDEO_FILE}" -vn -acodec pcm_s16le -ar 16000 -ac 1 "{TEMP_AUDIO}" -y -loglevel quiet'
    try: subprocess.run(cmd, shell=True, check=True); return True
    except: return False

# ==========================================
# 2. AZURE
# ==========================================
def refine_subtitles(original_subs):
    print("   ✂️  Refining Subtitles...")
    new_subs = []
    for sub in original_subs:
        text = sub['t']
        if len(text) > 80 and re.search(r'[.?!]', text):
            parts = re.split(r'([.?!])\s+', text); sentences = []; curr = ""
            for p in parts:
                if p in ['.','?','!']: curr += p; sentences.append(curr); curr=""
                else: curr += p
            if curr: sentences.append(curr)
            if len(sentences) > 1:
                total_len = sum(len(s) for s in sentences); curr_t = sub['s']; dur = sub['e'] - sub['s']
                for s in sentences:
                    s_dur = (len(s)/total_len) * dur
                    new_subs.append({"s": round(curr_t,2), "e": round(curr_t+s_dur,2), "t": s.strip()}); curr_t += s_dur
            else: new_subs.append(sub)
        else: new_subs.append(sub)
    return new_subs

def step2_azure_transcribe():
    print(f"🎤 [Step 2] Azure Transcribing...")
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r", encoding="utf-8") as f: return refine_subtitles(json.load(f))
    speech_config = speechsdk.SpeechConfig(subscription=AZURE_KEY, region=AZURE_REGION)
    audio_config = speechsdk.audio.AudioConfig(filename=TEMP_AUDIO)
    recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
    done = False; subs = []
    def stop(e): nonlocal done; done=True
    def rec(e): 
        if e.result.reason == speechsdk.ResultReason.RecognizedSpeech:
            print(".", end="", flush=True)
            subs.append({"s":e.result.offset/10000000, "e":(e.result.offset+e.result.duration)/10000000, "t":e.result.text})
    recognizer.recognized.connect(rec); recognizer.session_stopped.connect(stop); recognizer.canceled.connect(stop)
    recognizer.start_continuous_recognition(); 
    while not done: time.sleep(0.5)
    with open(CACHE_FILE, "w", encoding="utf-8") as f: json.dump(subs, f)
    return refine_subtitles(subs)

# ==========================================
# 3. GEMINI (SPLIT TASKS + PYTHON FIXER)
# ==========================================
def call_ai(model, prompt):
    for attempt in range(3):
        try:
            res = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
            return json.loads(res.text)
        except Exception as e:
            print(f"\n   ⚠️ Error: {e}. Retrying ({attempt+1}/3)..."); time.sleep(5)
    return None

# 🔥 V7.0 新增核心函数：强制修正时间戳
def force_correct_timings(quiz_data, subtitles):
    print("   🔧 Python correcting timestamps (Target: End + 4s)...")
    
    # 辅助函数：根据 AI 提供的时间（可能是开始时间）找到最匹配的字幕行
    def find_subtitle_by_time(time_hint):
        for sub in subtitles:
            # 如果时间戳落在字幕范围内，或者非常接近开始时间
            if abs(sub['s'] - time_hint) < 1.0: 
                return sub
            if sub['s'] <= time_hint <= sub['e']:
                return sub
        return None

    # 遍历所有题目进行修正
    for section in ['general', 'detailed']:
        if section in quiz_data:
            for q in quiz_data[section]:
                ai_time = q.get('time', 0)
                # 1. 尝试找到对应的字幕行
                match = find_subtitle_by_time(ai_time)
                
                if match:
                    # 2. 找到了！执行强制计算
                    # 规则：Time = Subtitle End + 4.0s
                    correct_pop_time = match['e'] + 4.0
                    
                    q['time'] = round(correct_pop_time, 2)
                    
                    # 3. 修正回放区间：从 Start 到 (End + 4s)
                    # 这样回放时也能看到那 4 秒的缓冲
                    q['replay'] = {
                        "start": match['s'],
                        "end": round(correct_pop_time, 2)
                    }
                    # print(f"     ✅ Fixed: AI({ai_time}s) -> Sub({match['s']}-{match['e']}) -> Pop({q['time']}s)")
                else:
                    # 没找到匹配字幕（很少见），只能强制 +4s
                    q['time'] = round(ai_time + 4.0, 2)
                    q['replay'] = {"start": max(0, ai_time - 5), "end": q['time']}
    return quiz_data

def step3_gemini_generate(subtitles):
    print(f"\n🧠 [Step 3] Gemini 2.0 Flash (V7.0 Python-Fixed)...")
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
    full_text = " ".join([f"[{s['s']:.2f}-{s['e']:.2f}] {s['t']}" for s in subtitles])
    duration = subtitles[-1]['e']
    model = genai.GenerativeModel(MODEL_NAME)
    
    final_data = {}

    # --- TASK 1: Overview & Images ---
    print("   🔹 Task 1/3: Overview & Images...")
    p1 = f"""
    Task: Generate Overview and Images for video (Duration: {duration}s).
    Transcript: "{full_text[:35000]}..."
    Output JSON: {{
      "config": {{ "title": "Title", "theme": {{ "primary": "#4F46E5", "accent": "#F59E0B", "bg_start": "#EEF2FF", "bg_end": "#E0E7FF" }}, "quizTiers": [{{ "percent":0.3, "base":30, "label":"Basic" }}, {{ "percent":0.5, "base":60, "label":"Standard" }}, {{ "percent":0.8, "base":100, "label":"Advanced" }}, {{ "percent":1.0, "base":140, "label":"Master" }}] }},
      "reading": [ {{ "text": "Paragraph 1..." }}, {{ "text": "Paragraph 2..." }} ],
      "images": [ {{ "prompt": "Visual scene 1" }}, {{ "prompt": "Visual scene 2" }}, {{ "prompt": "Visual scene 3" }}, {{ "prompt": "Visual scene 4" }} ]
    }}
    """
    d1 = call_ai(model, p1)
    if not d1: return None
    final_data.update(d1)

    # --- TASK 2: Vocabulary ---
    print("   🔹 Task 2/3: Vocabulary (Hard Mode)...")
    p2 = f"""
    Task: Extract Vocabulary.
    Transcript: "{full_text[:35000]}..."
    REQUIREMENTS:
    1. 35 **General Words**: Level B2/C1. NO simple words.
    2. **Proper Nouns**: Extra list.
    3. **Sentences**: NO BLANKS. Complete sentences only.
    Output JSON: {{
      "vocab": [ 
        {{ "id": 0, "w": "Word", "type": "general", "en_def": "Def", "cn": "CN", "vid_ex": "Complete sentence.", "vid_cn": "CN", "life_ex": "Complete sentence.", "life_cn": "CN" }}
      ]
    }}
    """
    d2 = call_ai(model, p2)
    if not d2: return None
    final_data['vocab'] = d2['vocab']

    # --- TASK 3: Quizzes (AI Locates, Python Calculates) ---
    print("   🔹 Task 3/3: Quizzes (AI Locations)...")
    chunk_g = duration / 4; chunk_d = duration / 8
    dist_rules_g = "\n".join([f"- Q{i+1}: Focus on segment {int(i*chunk_g)}s-{int((i+1)*chunk_g)}s." for i in range(4)])
    dist_rules_d = "\n".join([f"- Q{i+1}: Focus on segment {int(i*chunk_d)}s-{int((i+1)*chunk_d)}s." for i in range(8)])
    
    p3 = f"""
    Task: Generate Quizzes.
    Transcript: "{full_text[:35000]}..."
    
    **TIMING INSTRUCTION**:
    - Simply provide the **START TIMESTAMP** of the sentence where the answer is found.
    - DO NOT calculate delays. Just give the exact start time from the transcript tag.
    - My Python script will handle the delay calculation.

    **TYPES**:
    - **Choice** (A/B/C/D), **True/False**, **Cloze** (Fill-in).
    - **Balanced Options**: All options similar length.
    - **No repeatance questions**: General questions and detailed question should not be the same.
    
    **DISTRIBUTION**:
    General (4 Qs): {dist_rules_g}
    Detailed (8 Qs): {dist_rules_d}
    
    Output JSON: {{
      "quizzes": {{
        "general": [ {{ "time": 10.5, "type": "choice", "q": "...", "opts": ["A","B","C","D"], "ans": 0, "review": "..." }} ],
        "detailed": [ {{ "time": 20.5, "type": "cloze", "q": "...", "opts": ["A","B"], "ans": 0, "review": "...", "replay": {{ "start": 0, "end": 0 }} }} ]
      }}
    }}
    """
    d3 = call_ai(model, p3)
    if not d3: return None
    
    # 🔥 关键步骤：调用 Python 函数修正时间
    d3['quizzes'] = force_correct_timings(d3['quizzes'], subtitles)
    
    final_data['quizzes'] = d3['quizzes']

    return final_data

# ==========================================
# 3.5. IMAGES
# ==========================================
def step3_5_generate_images(data):
    print(f"\n🎨 [Step 3.5] Generating Images...")
    api_key = os.environ["GOOGLE_API_KEY"]
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{IMAGEN_MODEL}:predict?key={api_key}"
    
    for i, img in enumerate(data.get('images', [])):
        print(f"   - Img {i+1}...")
        try:
            res = requests.post(url, json={"instances": [{"prompt": img['prompt']}], "parameters": {"sampleCount":1}}, headers={'Content-Type': 'application/json'})
            if res.status_code == 200 and 'predictions' in res.json():
                b64 = res.json()['predictions'][0]['bytesBase64Encoded']
                img['src'] = f"data:image/png;base64,{b64}"
                print("     ✅ OK")
            else:
                img['src'] = f"https://placehold.co/800x400/4F46E5/FFFFFF?text={img['prompt'][:10]}"
        except:
            img['src'] = f"https://placehold.co/800x400/4F46E5/FFFFFF?text={img['prompt'][:10]}"
    return data

# ==========================================
# 4. BUILD
# ==========================================
def step4_build_html(data, subtitles):
    if not os.path.exists("template.html"): return
    data['subtitles'] = subtitles
    data['config']['videoFile'] = VIDEO_FILE
    data['config']['azureKey'] = AZURE_KEY
    data['config']['azureRegion'] = AZURE_REGION
    data['config']['deepseekKey'] = DEEPSEEK_KEY

    with open("template.html", "r", encoding="utf-8") as f: template = Template(f.read())
    html = template.render(config=data['config'], images=data.get('images',[]), reading=data.get('reading',[]), vocab=data.get('vocab',[]), json_data=json.dumps(data))
    
    fname = os.path.splitext(VIDEO_FILE)[0] + "_Homework.html"
    with open(fname, "w", encoding="utf-8") as f: f.write(html)
    print(f"\n🎉 SUCCESS! Generated: {fname}")

if __name__ == "__main__":
    if step1_extract_audio():
        subs = step2_azure_transcribe()
        if subs:
            data = step3_gemini_generate(subs)
            if data:
                data = step3_5_generate_images(data)
                step4_build_html(data, subs)