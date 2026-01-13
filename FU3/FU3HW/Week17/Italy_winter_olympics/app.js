/**
 * Week 17: Italy 2026 - Final Logic Engine (V7.2)
 * Update: Added Auto-Scroll Carousel for Desktop Comfort
 */

const App = {
    // --- 1. 全局状态 (持久化存储) ---
    state: {
        user: "Guest",
        step: 0, 
        myList: [], 
        scores: { vocab: 0, quiz_base: 0, quiz_bonus: 0, video_gen: 0, video_det: 0 },
        vocabTimers: {}, 
        answeredVideoQs: [], 
        videoTime: 0 
    },
    
    // --- 运行时变量 ---
    runtime: {
        cardIdx: 0,
        cardStart: 0,
        speechSynth: null,
        quizQueue: [],
        quizCurrent: 0,
        currentVideoQs: [],
        activeVideoQ: null,
        isPart1: true,
        isReplaying: false,
        replayEndTime: 0,
        carouselInterval: null // ★ 新增：轮播定时器
    },

    // --- 初始化 ---
    init() {
        this.initAzure();
        this.renderLanding();
        this.updateScoreDisplay();
        window.addEventListener('beforeunload', () => this.saveState());
    },

    // --- Azure TTS ---
    initAzure() {
        if (window.SpeechSDK && DATA.config.azureKey) {
            try {
                const config = SpeechSDK.SpeechConfig.fromSubscription(DATA.config.azureKey, DATA.config.azureRegion);
                config.speechSynthesisVoiceName = "en-US-AvaMultilingualNeural"; 
                this.runtime.speechSynth = new SpeechSDK.SpeechSynthesizer(config);
            } catch(e) { console.warn("Azure Init Error", e); }
        }
    },

    speak(text) {
        if (!text) return;
        if (this.runtime.speechSynth) {
            this.runtime.speechSynth.speakTextAsync(text);
        } else {
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'en-US';
            window.speechSynthesis.speak(u);
        }
    },

    saveState() {
        localStorage.setItem('W17_Italy_Final', JSON.stringify(this.state));
    },

    // --- 首页逻辑 (含自动轮播) ---
    renderLanding() {
        document.querySelectorAll('.page-section').forEach(el => el.classList.add('hidden'));
        document.getElementById('sec-login').classList.remove('hidden');
        
        this.renderCarousel();

        const saved = localStorage.getItem('W17_Italy_Final');
        const resumeBtn = document.getElementById('btn-resume');
        
        if (saved) {
            resumeBtn.classList.remove('hidden');
            resumeBtn.onclick = () => {
                this.state = JSON.parse(saved);
                this.updateScoreDisplay();
                this.renderSection(this.state.step || 1);
            };
        } else {
            resumeBtn.classList.add('hidden');
        }
    },

    renderCarousel() {
        const box = document.getElementById('intro-carousel');
        if(!box) return;
        
        box.innerHTML = DATA.images.map(img => `
            <div class="intro-slide" style="background-image: url('${img.file}');">
                <div style="position:absolute; bottom:0; width:100%; background:rgba(0,0,0,0.6); color:white; font-size:0.8rem; padding:5px; text-align:center; border-radius:0 0 12px 12px;">
                    ${img.prompt.substring(0, 30)}...
                </div>
            </div>
        `).join('');

        // ★★★ 启动自动播放 ★★★
        this.startCarouselAutoPlay(box);
    },

    startCarouselAutoPlay(box) {
        // 清除旧定时器防止叠加
        if(this.runtime.carouselInterval) clearInterval(this.runtime.carouselInterval);
        
        const autoScroll = () => {
            const item = box.querySelector('.intro-slide');
            if(!item) return;
            
            // 计算滚动距离：单张卡片宽度 + CSS中的gap(15px)
            const step = item.offsetWidth + 15; 
            const maxScroll = box.scrollWidth - box.clientWidth;
            
            // 如果已经滚到底部 (允许5px误差)，则回到开头
            if (box.scrollLeft >= maxScroll - 5) {
                box.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                box.scrollBy({ left: step, behavior: 'smooth' });
            }
        };

        // 每 3000ms (3秒) 滚动一次
        this.runtime.carouselInterval = setInterval(autoScroll, 3000);
        
        // 鼠标放上去暂停，移开继续
        box.onmouseenter = () => clearInterval(this.runtime.carouselInterval);
        box.onmouseleave = () => this.runtime.carouselInterval = setInterval(autoScroll, 3000);
        // 手机触摸同理
        box.ontouchstart = () => clearInterval(this.runtime.carouselInterval);
        box.ontouchend = () => this.runtime.carouselInterval = setInterval(autoScroll, 3000);
    },

    startNew() {
        const name = document.getElementById('inp-name').value.trim();
        if (!name) return alert("Please enter your name first.");

        if (localStorage.getItem('W17_Italy_Final')) {
            if (!confirm("Starting new will erase your previous progress. Continue?")) return;
        }

        this.state = {
            user: name,
            step: 1,
            myList: [],
            scores: { vocab: 0, quiz_base: 0, quiz_bonus: 0, video_gen: 0, video_det: 0 },
            vocabTimers: {},
            answeredVideoQs: [],
            videoTime: 0
        };
        
        this.updateScoreDisplay();
        this.goTo(1);
    },

    goTo(stepIndex) {
        // 停止轮播，节省资源
        if(this.runtime.carouselInterval) clearInterval(this.runtime.carouselInterval);

        if (this.state.step === 1 && stepIndex !== 1) this.trackCardTime();
        
        this.state.step = stepIndex;
        this.saveState();
        this.renderSection(stepIndex);
        window.scrollTo(0, 0);
    },

    renderSection(step) {
        document.querySelectorAll('.page-section').forEach(el => el.classList.add('hidden'));
        document.getElementById('user-display').innerText = this.state.user;

        switch(step) {
            case 1: 
                document.getElementById('sec-vocab').classList.remove('hidden');
                this.renderCard();
                break;
            case 2: 
                document.getElementById('sec-quiz-sel').classList.remove('hidden');
                break;
            case 3: 
                document.getElementById('sec-quiz-run').classList.remove('hidden');
                this.renderQuizQuestion();
                break;
            case 4: 
                document.getElementById('sec-reading').classList.remove('hidden');
                this.renderReading();
                break;
            case 5: 
                this.initVideo(true);
                break;
            case 6: 
                this.initVideo(false);
                break;
            case 7: 
                document.getElementById('sec-report').classList.remove('hidden');
                this.renderReport();
                break;
        }
    },

    updateScoreDisplay() {
        const s = this.state.scores;
        const total = s.vocab + s.quiz_base + s.quiz_bonus + s.video_gen + s.video_det;
        document.getElementById('global-score-num').innerText = total;
    },

    // --- 词汇 (无变化) ---
    renderCard() {
        const word = DATA.vocab[this.runtime.cardIdx];
        if (!word) return;

        this.runtime.cardStartTime = Date.now();
        const container = document.getElementById('vocab-card');
        const isAdded = this.state.myList.includes(word.id);

        const createRow = (label, en, cn, type) => `
            <div class="vocab-row">
                <div class="vocab-line">
                    <div class="vocab-text">
                        <span class="label">${label}</span> ${en || ''}
                    </div>
                    <div style="flex-shrink:0;">
                        <button class="btn-outline btn-sm" onclick="document.getElementById('cn-${type}').classList.toggle('hidden')">👁️</button>
                        <button class="btn-gold btn-sm" onclick="App.speak('${(en||'').replace(/'/g, "\\'")}')">🔊</button>
                    </div>
                </div>
                <div id="cn-${type}" class="trans-box hidden">${cn || ''}</div>
            </div>
        `;

        container.innerHTML = `
            <div class="flashcard">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                     <div style="flex:1;"></div>
                     <button class="btn-outline" style="border:none; font-size:1.2rem; color:${isAdded?'var(--green)':'var(--text-dim)'}" onclick="App.toggleList(${word.id})">
                        <i class="fas fa-${isAdded ? 'check-circle' : 'plus-circle'}"></i> ${isAdded ? 'Saved' : 'Save'}
                     </button>
                </div>

                <div class="word-title">${word.w}</div>
                <div style="text-align:center; margin-bottom:20px; color:#aaa;">
                    <i class="fas fa-volume-up cursor-pointer" onclick="App.speak('${word.w}')"></i>
                </div>

                ${createRow("DEF", word.en, word.cn, "def")}
                ${createRow("VIDEO", word.vid_ex, word.vid_cn, "vid")}
                ${createRow("LIFE", word.life_ex, word.life_cn, "life")}

                <div id="card-timer" class="timer-bar"></div>
            </div>

            <div style="text-align:center; margin-top:20px;">
                <p style="color:#888; margin-bottom:10px;">${this.runtime.cardIdx + 1} / ${DATA.vocab.length}</p>
                <div style="display:flex; justify-content:center; gap:20px;">
                    <button class="btn" onclick="App.navCard(-1)" ${this.runtime.cardIdx===0?'disabled':''}>Previous</button>
                    <button class="btn" onclick="App.navCard(1)">Next</button>
                </div>
            </div>
        `;

        setTimeout(() => { 
            const b = document.getElementById('card-timer'); 
            if(b) b.style.width = '100%'; 
        }, 100);
    },

    toggleList(id) {
        if (this.state.myList.includes(id)) {
            this.state.myList = this.state.myList.filter(x => x !== id);
        } else {
            this.state.myList.push(id);
        }
        this.renderCard();
    },

    trackCardTime() {
        const t = Date.now() - this.runtime.cardStartTime;
        const wid = DATA.vocab[this.runtime.cardIdx].id;
        if (!this.state.vocabTimers[wid]) this.state.vocabTimers[wid] = 0;
        this.state.vocabTimers[wid] += t;

        if (this.state.vocabTimers[wid] > 10000) {
            let pts = 0;
            for(let k in this.state.vocabTimers) {
                if (this.state.vocabTimers[k] > 10000) pts += 2;
            }
            this.state.scores.vocab = pts;
            this.updateScoreDisplay();
        }
    },

    navCard(dir) {
        this.trackCardTime();
        const next = this.runtime.cardIdx + dir;
        if (next >= 0 && next < DATA.vocab.length) {
            this.runtime.cardIdx = next;
            this.renderCard();
        } else if (next >= DATA.vocab.length) {
            if (confirm("Vocabulary study done. Proceed to Quiz?")) this.goTo(2);
        }
    },

    exportList() {
        if (this.state.myList.length === 0) return alert("Your list is empty. Add words by clicking 'Save' on flashcards.");
        
        const element = document.createElement('div');
        element.style.padding = '20px';
        element.style.background = 'white';
        element.style.color = 'black';
        element.style.fontFamily = 'Arial, sans-serif';
        
        let html = `<h1 style="text-align:center; border-bottom:2px solid #000; padding-bottom:10px;">${this.state.user}'s Vocabulary List</h1>`;
        
        this.state.myList.forEach(id => {
            const w = DATA.vocab.find(x => x.id === id);
            html += `
                <div style="margin-bottom:15px; border-bottom:1px solid #ddd; padding-bottom:10px;">
                    <h3 style="margin:5px 0; color:#00458B;">${w.w}</h3>
                    <p style="margin:2px 0; font-style:italic;">${w.en}</p>
                    <p style="margin:2px 0; color:#555;">Example: ${w.vid_ex}</p>
                </div>
            `;
        });
        
        html += `<p style="text-align:center; margin-top:30px; color:#666;">Italy 2026 Master Class</p>`;
        element.innerHTML = html;

        const opt = {
            margin:       10,
            filename:     'My_Vocab_List.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    },

    // --- Quiz (无变化) ---
    startQuiz(tierIdx) {
        const tier = DATA.config.quizTiers[tierIdx];
        this.state.scores.quiz_base = tier.base;
        this.state.scores.quiz_bonus = 0;
        
        const count = Math.ceil(DATA.vocab.length * tier.percent);
        const shuffled = [...DATA.vocab].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);
        
        this.runtime.quizQueue = selected.map(w => {
            const distractors = DATA.vocab
                .filter(x => x.id !== w.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(x => x.w);
            
            const opts = [...distractors, w.w].sort(() => 0.5 - Math.random());
            
            return {
                q: w.en, 
                ans: w.w, 
                hint: w.cn,
                opts: opts
            };
        });
        
        this.runtime.quizCurrent = 0;
        this.goTo(3);
    },

    renderQuizQuestion() {
        const q = this.runtime.quizQueue[this.runtime.quizCurrent];
        const box = document.getElementById('quiz-box');
        
        box.innerHTML = `
            <div style="background:rgba(255,255,255,0.05); padding:25px; border-radius:15px; border:1px solid rgba(255,255,255,0.1);">
                <h3 style="color:var(--gold); margin-bottom:10px;">Question ${this.runtime.quizCurrent + 1} / ${this.runtime.quizQueue.length}</h3>
                
                <p class="quiz-q-text">${q.q}</p>
                
                <button class="btn-outline btn-sm" onclick="document.getElementById('q-hint').classList.toggle('hidden')">👁️ Show Meaning</button>
                <div id="q-hint" class="quiz-hint-box hidden">${q.hint}</div>
                
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:20px;">
                    ${q.opts.map(opt => `
                        <button class="quiz-opt" onclick="App.handleQuizAnswer(this, '${opt.replace(/'/g, "\\'")}', '${q.ans.replace(/'/g, "\\'")}')">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                
                <div id="q-feedback" style="margin-top:15px; font-weight:bold; height:25px;"></div>
                <button id="btn-nq" class="btn hidden" style="width:100%; margin-top:10px;" onclick="App.nextQuizQ()">Next Question</button>
            </div>
        `;
    },

    handleQuizAnswer(btn, selected, correct) {
        document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
        const fb = document.getElementById('q-feedback');
        
        if (selected === correct) {
            btn.classList.add('correct');
            fb.innerHTML = `<span style="color:var(--green)">Correct! (+2 pts)</span>`;
            this.state.scores.quiz_bonus += 2;
        } else {
            btn.classList.add('wrong');
            fb.innerHTML = `<span style="color:var(--red)">Wrong! (-1 pt) Correct: ${correct}</span>`;
            this.state.scores.quiz_bonus -= 1;
        }
        this.updateScoreDisplay();
        document.getElementById('btn-nq').classList.remove('hidden');
    },

    nextQuizQ() {
        this.runtime.quizCurrent++;
        if (this.runtime.quizCurrent < this.runtime.quizQueue.length) {
            this.renderQuizQuestion();
        } else {
            if (confirm("Quiz Complete! Move to Reading?")) this.goTo(4);
        }
    },

    renderReading() {
        const box = document.getElementById('read-text');
        box.innerHTML = DATA.reading.map(para => `
            <div class="read-segment">
                <div class="read-text">${para.text}</div>
                <button class="btn-sm" style="margin-top:8px; display:inline-flex; align-items:center;" onclick="App.speak('${para.text.replace(/'/g, "\\'")}')">
                    <i class="fas fa-volume-up"></i> Listen
                </button>
            </div>
        `).join('');
    },

    // --- Video (无变化) ---
    initVideo(isPart1) {
        document.getElementById('sec-video').classList.remove('hidden');
        this.runtime.isPart1 = isPart1;
        const v = document.getElementById('main-video');
        const title = document.getElementById('vid-title');
        const subLayer = document.getElementById('vid-subs');
        
        v.src = DATA.config.videoFile;
        v.currentTime = isPart1 ? (this.state.videoTime || 0) : 0;
        
        title.innerText = isPart1 ? "Part 1: General (Subtitles ON)" : "Part 2: Detailed (Subtitles OFF)";
        subLayer.style.display = isPart1 ? 'block' : 'none';
        
        this.runtime.currentVideoQs = isPart1 ? DATA.quizzes.general : DATA.quizzes.detailed;
        
        v.ontimeupdate = () => {
            const t = v.currentTime;
            
            if (isPart1) {
                if (Math.floor(t) % 2 === 0) { this.state.videoTime = t; this.saveState(); }
            }
            
            document.getElementById('vid-prog').value = v.duration ? (t / v.duration) * 100 : 0;
            
            if (isPart1) {
                const sub = DATA.subtitles.find(s => t >= s.s && t <= s.e);
                if (sub) {
                    subLayer.innerText = sub.t;
                    subLayer.style.opacity = 1;
                } else {
                    subLayer.style.opacity = 0;
                }
            }
            
            if (this.runtime.isReplaying && t >= this.runtime.replayEndTime) {
                v.pause();
                this.runtime.isReplaying = false;
                document.getElementById('vid-modal').classList.remove('hidden');
                return;
            }
            
            this.checkVideoTriggers(t, v);
        };
    },

    checkVideoTriggers(t, v) {
        const hit = this.runtime.currentVideoQs.find(q => {
            const qId = (this.runtime.isPart1 ? 'g_' : 'd_') + q.time;
            if (this.state.answeredVideoQs.includes(qId)) return false;
            return Math.abs(q.time - t) < 0.8;
        });
        
        if (hit) {
            v.pause();
            this.showVideoModal(hit);
        }
    },

    showVideoModal(q) {
        const modal = document.getElementById('vid-modal');
        modal.classList.remove('hidden');
        this.runtime.activeVideoQ = q;
        
        const box = document.getElementById('vm-content');
        
        let html = `<div class="label" style="margin-bottom:10px;">${q.type.toUpperCase()}</div><div style="font-size:1.2rem; margin-bottom:15px; color:white;">${q.q}</div>`;
        
        if (q.type === 'text') {
            html += `
                <input id="v-inp" class="quiz-input" placeholder="Type answer...">
                <button class="btn btn-gold" style="width:100%; margin-top:10px;" onclick="App.ansVideoText(['${q.match.join("','")}'], ${q.time})">Submit</button>
            `;
        } else {
            html += `<div style="display:grid; gap:10px;">`;
            q.opts.forEach((o, i) => {
                html += `<button class="quiz-opt" onclick="App.ansVideoChoice(${i}, ${q.ans}, this, ${q.time})">${o}</button>`;
            });
            html += `</div>`;
        }
        
        html += `
            <div id="v-fb" style="margin-top:15px; font-weight:bold; height:20px;"></div>
            <div style="margin-top:20px; display:flex; gap:10px;">
                <button class="btn-outline" style="flex:1" onclick="App.replayClip()">🎥 Replay</button>
                <button id="btn-v-con" class="btn hidden" style="flex:1" onclick="App.resumeVideo()">Continue</button>
            </div>
        `;
        
        box.innerHTML = html;
    },

    ansVideoChoice(idx, corr, btn, time) {
        const ok = idx === corr;
        document.querySelectorAll('#vm-content .quiz-opt').forEach(b => {
            b.disabled = true;
            b.style.opacity = '0.6';
        });
        btn.style.opacity = '1';
        this.handleVideoRes(ok, btn, time);
    },

    ansVideoText(matches, time) {
        const val = document.getElementById('v-inp').value.toLowerCase().trim();
        const ok = matches.some(m => val.includes(m.toLowerCase()));
        const btn = document.querySelector('#vm-content .btn-gold');
        if(btn) btn.disabled = true;
        this.handleVideoRes(ok, btn, time);
    },

    handleVideoRes(ok, btn, time) {
        const fb = document.getElementById('v-fb');
        
        if (ok) {
            if(btn) btn.classList.add('correct');
            fb.innerHTML = `<span style="color:var(--green)">Correct! +2 pts</span>`;
            if (this.runtime.isPart1) this.state.scores.video_gen += 2;
            else this.state.scores.video_det += 2;
        } else {
            if(btn) btn.classList.add('wrong');
            fb.innerHTML = `<span style="color:var(--red)">Incorrect.</span>`;
        }
        
        this.updateScoreDisplay();
        const qId = (this.runtime.isPart1 ? 'g_' : 'd_') + time;
        this.state.answeredVideoQs.push(qId);
        document.getElementById('btn-v-con').classList.remove('hidden');
    },

    replayClip() {
        const q = this.runtime.activeVideoQ;
        if (!q.replay) return alert("No replay available.");
        document.getElementById('vid-modal').classList.add('hidden');
        this.runtime.isReplaying = true;
        this.runtime.replayEndTime = q.replay.end;
        const v = document.getElementById('main-video');
        v.currentTime = q.replay.start;
        v.play();
    },

    resumeVideo() {
        document.getElementById('vid-modal').classList.add('hidden');
        document.getElementById('main-video').play();
    },

    vidNext() {
        if (this.runtime.isPart1) {
            if (confirm("Part 1 Complete. Start Part 2?")) {
                this.state.videoTime = 0;
                this.goTo(6);
            }
        } else {
            if (confirm("All parts complete. View Report?")) this.goTo(7);
        }
    },

    setSpeed(val) {
        document.getElementById('main-video').playbackRate = parseFloat(val);
    },

    renderReport() {
        const s = this.state.scores;
        document.getElementById('rep-box').innerHTML = `
            <h2 style="color:var(--gold)">Performance Report</h2>
            <p><strong>Student:</strong> ${this.state.user}</p>
            <hr style="border-color:rgba(255,255,255,0.1); margin:20px 0;">
            <div class="score-grid">
                <div class="score-item">
                    <div>Vocabulary</div>
                    <div class="score-val">${s.vocab}</div>
                </div>
                <div class="score-item">
                    <div>Quiz</div>
                    <div class="score-val">${s.quiz_base + s.quiz_bonus}</div>
                </div>
                <div class="score-item">
                    <div>Video</div>
                    <div class="score-val">${s.video_gen + s.video_det}</div>
                </div>
            </div>
            <div style="margin-top:30px;">
                <h1 style="font-size:3rem; color:var(--blue)">${s.vocab + s.quiz_base + s.quiz_bonus + s.video_gen + s.video_det}</h1>
                <p style="color:#aaa">Total Score</p>
            </div>
        `;
    }
};

window.onload = () => App.init();