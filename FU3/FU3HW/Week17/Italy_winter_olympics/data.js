/**
 * Week 17: Italy 2026 Winter Games - Master Data V7.2 (Subtitles Updated)
 * 修正记录：
 * 1. 字幕时间轴重算：锁定 StartTime，强制延长上一句 EndTime 以填补空隙（防止字幕闪烁或过快消失）。
 * 2. 确保 8 张 Intro 图片配置正确。
 * 3. 优化词汇文本格式，利于 PDF 导出。
 * 4. 字幕内容已替换为最新提供的版本。
 */

const DATA = {
    // --- 1. 系统配置 ---
    config: {
        title: "Week 17: Italy 2026 Winter Games",
videoFile: "./Italy_is_going_big.mp4",
        
        // Azure Speech API
        azureKey: "DKRXk8ueSfo5NdIOMqFRTCAfpeGDezJ3Snf5K8gGgtyqxiWdugLzJQQJ99BLACHYHv6XJ3w3AAAYACOGUYP9",
        azureRegion: "eastus2",
        
        // 词汇测试配置
        quizTiers: [
            { percent: 0.3, base: 30, label: "30% (Basic)" },
            { percent: 0.5, base: 60, label: "50% (Standard)" },
            { percent: 0.8, base: 100, label: "80% (Advanced)" },
            { percent: 1.0, base: 140, label: "100% (Master)" }
        ]
    },

    // --- 2. 介绍页 8 张轮播图 (Intro Carousel) ---
    // 这些图片将在首页 (sec-login) 显示
    images: [
        { file: "slide1.jpg", prompt: "Milan Duomo at sunset" },
        { file: "slide2.jpg", prompt: "Cortina d'Ampezzo ski resort" },
        { file: "slide3.jpg", prompt: "Arena di Verona at night" },
        { file: "slide4.jpg", prompt: "Italian high fashion runway" },
        { file: "slide5.jpg", prompt: "Authentic Pizza Margherita" },
        { file: "slide6.jpg", prompt: "High-speed train in Alps" },
        { file: "slide7.jpg", prompt: "Venetian canals in winter" },
        { file: "slide8.jpg", prompt: "Map of Northern Italy" }
    ],

    // --- 3. 课前阅读 (Introduction Reading) ---
    reading: [
        {
            text: "The 2026 Winter Olympics will be a historic event, hosted jointly by two distinct Italian locations: the bustling metropolitan city of Milan (米兰) and the stunning mountain town of Cortina d'Ampezzo (科尔蒂纳丹佩佐). This unique 'duality' represents the modern Italian spirit."
        },
        {
            text: "This is not Italy's first time welcoming the world. Cortina previously hosted the Winter Games in 1956, and Turin (都灵) hosted in 2006. However, the 2026 Games are setting a new standard for sustainability by using existing venues."
        },
        {
            text: "From the fashion capital of Milan to the snow-capped peaks of the Dolomites (多洛米蒂山脉), and finally to the closing ceremony at the ancient Arena di Verona (维罗纳圆形竞技场), Italy is ready to roll out the red carpet."
        }
    ],

    // --- 4. 核心词汇表 (34个) ---
    // 用于 Flashcard 和 PDF 导出
    vocab: [
        { 
            id: 1, w: "Roll out the red carpet", 
            en: "To give a very grand and special welcome.", cn: "隆重欢迎；铺红地毯", 
            vid_ex: "Northern Italy rolls out the red carpet to the world.", vid_cn: "北意大利向全世界铺开红地毯。",
            life_ex: "The hotel rolled out the red carpet for the VIP guests.", life_cn: "酒店为贵宾们提供了极其隆重的接待。"
        },
        { 
            id: 2, w: "Curtain up", 
            en: "The start of a performance or event.", cn: "开幕；好戏开场", 
            vid_ex: "It is almost curtain up for Italy.", vid_cn: "意大利冬奥会的大幕即将拉开。",
            life_ex: "We need to be ready before curtain up at 8 PM.", life_cn: "我们必须在晚上8点开幕前做好准备。"
        },
        { 
            id: 3, w: "Culminate", 
            en: "To reach a climax or highest point.", cn: "达到高潮；告终", 
            vid_ex: "The event culminates with a closing ceremony in an ancient arena.", vid_cn: "活动在古老竞技场举行的闭幕式中达到高潮。",
            life_ex: "Years of hard work culminated in her winning the gold medal.", life_cn: "多年的努力最终让她赢得了金牌。"
        },
        { 
            id: 4, w: "Weave together", 
            en: "To combine different elements into a whole.", cn: "交织；融合", 
            vid_ex: "Weaving together competition with the nation's artistic soul.", vid_cn: "将激烈的竞赛与国家的艺术灵魂交织在一起。",
            life_ex: "The author weaves together history and fiction.", life_cn: "作者将历史与虚构交织在了一起。"
        },
        { 
            id: 5, w: "Reenact", 
            en: "To act out a past event again.", cn: "重演；再现", 
            vid_ex: "The glitzy battles of antiquity were reenacted here.", vid_cn: "古代那些辉煌的战斗曾在这里被重演。",
            life_ex: "Students reenacted the signing of the Declaration.", life_cn: "学生们重演了宣言签署的场景。"
        },
        { 
            id: 6, w: "Cosmopolitan", 
            en: "Containing people/cultures from many countries.", cn: "国际化的", 
            vid_ex: "From the cosmopolitan heart of Milan.", vid_cn: "来自米兰这个国际化的心脏地带。",
            life_ex: "Singapore is a cosmopolitan city.", life_cn: "新加坡是一座国际化都市。"
        },
        { 
            id: 7, w: "Breathtaking", 
            en: "Extremely beautiful or surprising.", cn: "美到窒息的", 
            vid_ex: "Stories of a host country with breathtaking splendor.", vid_cn: "关于一个拥有令人窒息之美的东道国的故事。",
            life_ex: "The view from the mountain top was breathtaking.", life_cn: "山顶的景色美得令人窒息。"
        },
        { 
            id: 8, w: "Snow-capped", 
            en: "Covered with snow on the top.", cn: "白雪皑皑的", 
            vid_ex: "To the snow-capped Dolomite mountains.", vid_cn: "前往白雪皑皑的多洛米蒂山脉。",
            life_ex: "We could see the snow-capped peaks.", life_cn: "我们可以看到白雪皑皑的山峰。"
        },
        { 
            id: 9, w: "Widespread", 
            en: "Distributed over a large area.", cn: "分布广泛的", 
            vid_ex: "Organizers are planning the most widespread Olympics ever.", vid_cn: "组委会正在规划史上分布最广的奥运会。",
            life_ex: "There is widespread support for the new policy.", life_cn: "这项新政策得到了广泛的支持。"
        },
        { 
            id: 10, w: "Glitzy", 
            en: "Attractive in a showy, glittering way.", cn: "耀眼的；奢华的", 
            vid_ex: "The glitzy battles of antiquity.", vid_cn: "古代那些耀眼辉煌的战斗。",
            life_ex: "She attended a glitzy awards ceremony.", life_cn: "她参加了耀眼的颁奖典礼。"
        },
        { 
            id: 11, w: "Accessible", 
            en: "Easy to approach, enter, or use.", cn: "无障碍的", 
            vid_ex: "Making the stadium more accessible for wheelchair people.", vid_cn: "让体育馆对轮椅使用者更加无障碍。",
            life_ex: "Public transport should be accessible to everyone.", life_cn: "公共交通应该对每个人都是方便可达的。"
        },
        { 
            id: 12, w: "Unforgettable", 
            en: "Impossible to forget; very memorable.", cn: "难忘的", 
            vid_ex: "50 summer evenings of unforgettable emotions.", vid_cn: "50个充满难忘情感的夏夜。",
            life_ex: "Our trip to Italy was an unforgettable experience.", life_cn: "我们的意大利之旅是一次难忘的经历。"
        },
        { 
            id: 13, w: "Spectacular", 
            en: "Beautiful in a dramatic way.", cn: "壮观的", 
            vid_ex: "Spectacular events took place in the amphitheater.", vid_cn: "壮观的活动曾在露天剧场举行。",
            life_ex: "The fireworks display was spectacular.", life_cn: "烟花表演非常壮观。"
        },
        { 
            id: 14, w: "Duality", 
            en: "The state of having two different parts.", cn: "双重性", 
            vid_ex: "Represent this duality of our games: the city and the mountain.", vid_cn: "体现我们赛事的双重性：城市与高山。",
            life_ex: "The movie explores the duality of human nature.", life_cn: "这部电影探讨了人性的双重性。"
        },
        { 
            id: 15, w: "Innovation", 
            en: "A new method, idea, or product.", cn: "创新", 
            vid_ex: "Milan is the global capital of fashion and innovation.", vid_cn: "米兰是全球时尚与创新的中心。",
            life_ex: "Innovation is key to business success.", life_cn: "创新是商业成功的关键。"
        },
        { 
            id: 16, w: "Vice versa", 
            en: "With the order reversed.", cn: "反之亦然", 
            vid_ex: "Adapt the games to the territory and not vice versa.", vid_cn: "让赛事适应地形，而非反之亦然。",
            life_ex: "I trust him, and vice versa.", life_cn: "我信任他，反过来他也信任我。"
        },
        { 
            id: 17, w: "Splendor", 
            en: "Magnificent appearance.", cn: "壮丽", 
            vid_ex: "Stories of breathtaking splendor.", vid_cn: "关于惊人壮丽美景的故事。",
            life_ex: "The palace was restored to its former splendor.", life_cn: "宫殿恢复了往日的辉煌。"
        },
        { 
            id: 18, w: "Masterpiece", 
            en: "Outstanding work of skill.", cn: "杰作", 
            vid_ex: "Creating a masterpiece by weaving together art and sport.", vid_cn: "通过交织艺术与体育创造出一件杰作。",
            life_ex: "The painting is considered a masterpiece.", life_cn: "这幅画被认为是一件杰作。"
        },
        { 
            id: 19, w: "Candidature", 
            en: "The fact of being a candidate.", cn: "申办；候选", 
            vid_ex: "We decided the locations since the candidature.", vid_cn: "我们从申办起就选定了地点。",
            life_ex: "He announced his candidature for president.", life_cn: "他宣布竞选总统。"
        },
        { 
            id: 20, w: "Infrastructure", 
            en: "Basic physical structures (roads, power).", cn: "基础设施", 
            vid_ex: "The canals were one of the greatest infrastructures back then.", vid_cn: "这些运河在当时是伟大的基础设施之一。",
            life_ex: "Investment in infrastructure helps the economy.", life_cn: "基础设施投资有助于经济。"
        },
        { 
            id: 21, w: "Existing venues", 
            en: "Places already built.", cn: "现有场馆", 
            vid_ex: "Using existing venues so Italy didn't have to build new ones.", vid_cn: "使用现有场馆，这样意大利就不必建造新场馆。",
            life_ex: "The concert was held in existing venues to save money.", life_cn: "为了省钱，音乐会在现有场馆举行。"
        },
        { 
            id: 22, w: "Renovate", 
            en: "To repair and improve.", cn: "翻新", 
            vid_ex: "They are renovating the 1952 ice arena.", vid_cn: "他们正在翻新那座1952年的冰上竞技场。",
            life_ex: "We plan to renovate our kitchen.", life_cn: "我们计划翻新厨房。"
        },
        { 
            id: 23, w: "Accommodate", 
            en: "To provide space for.", cn: "容纳", 
            vid_ex: "The arena can accommodate up to 30,000 spectators.", vid_cn: "这座竞技场可容纳多达3万名观众。",
            life_ex: "This hotel can accommodate 500 guests.", life_cn: "这家酒店可以容纳500位客人。"
        },
        { 
            id: 24, w: "Spectators", 
            en: "People watching an event.", cn: "观众", 
            vid_ex: "Spectators move through public transport.", vid_cn: "观众通过公共交通出行。",
            life_ex: "The stadium was full of spectators.", life_cn: "体育场里挤满了观众。"
        },
        { 
            id: 25, w: "Dimensions", 
            en: "Measurable extent (size).", cn: "尺寸", 
            vid_ex: "The arena dimensions ensure perfect visibility.", vid_cn: "竞技场的尺寸确保了完美的视野。",
            life_ex: "Check the dimensions before buying furniture.", life_cn: "买家具前请检查尺寸。"
        },
        { 
            id: 26, w: "Visibility", 
            en: "The ability to see.", cn: "视野；能见度", 
            vid_ex: "Dimensions that ensure the perfect visibility for fans.", vid_cn: "确保粉丝拥有完美视野的尺寸设计。",
            life_ex: "Fog reduced visibility on the road.", life_cn: "大雾降低了道路能见度。"
        },
        { 
            id: 27, w: "Antiquity", 
            en: "The ancient past.", cn: "古代", 
            vid_ex: "The glitzy battles of antiquity were reenacted.", vid_cn: "古代那些辉煌的战斗被重新演绎。",
            life_ex: "The museum contains treasures from antiquity.", life_cn: "博物馆里有许多来自古代的珍宝。"
        },
        { 
            id: 28, w: "Steeped in", 
            en: "Filled with a quality.", cn: "充满；沉浸于", 
            vid_ex: "A venue steeped in Olympic history.", vid_cn: "一个充满奥运历史底蕴的场馆。",
            life_ex: "This town is steeped in tradition.", life_cn: "这个小镇充满了传统。"
        },
        { 
            id: 29, w: "Amphitheater", 
            en: "Oval open building.", cn: "露天剧场", 
            vid_ex: "Spectacular events took place in the amphitheater.", vid_cn: "壮观的活动在露天剧场举行。",
            life_ex: "We watched a play in the amphitheater.", life_cn: "我们在露天剧场看了一场戏。"
        },
        { 
            id: 30, w: "Acoustics", 
            en: "Sound properties.", cn: "音响效果", 
            vid_ex: "Amazing acoustics amplify the summer concerts.", vid_cn: "绝佳的音响效果增强了夏季音乐会。",
            life_ex: "The hall has perfect acoustics.", life_cn: "这座大厅拥有完美的音响效果。"
        },
        { 
            id: 31, w: "Gladiators", 
            en: "Ancient Roman fighters.", cn: "角斗士", 
            vid_ex: "Gladiators fought here and the arena was once flooded.", vid_cn: "角斗士曾在此战斗，竞技场也曾被注水。",
            life_ex: "The film is about a Roman gladiator.", life_cn: "这部电影关于一个罗马角斗士。"
        },
        { 
            id: 32, w: "Canals", 
            en: "Artificial waterways.", cn: "运河", 
            vid_ex: "Milan has canals too, not just Venice.", vid_cn: "米兰也有运河，不仅仅是威尼斯。",
            life_ex: "We took a boat trip along the canals.", life_cn: "我们乘船游览了运河。"
        },
        { 
            id: 33, w: "Top seller", 
            en: "Best selling product.", cn: "畅销品", 
            vid_ex: "The pizza is a top seller.", vid_cn: "这款披萨是畅销品。",
            life_ex: "This book is a top seller.", life_cn: "这本书是畅销书。"
        },
        { 
            id: 34, w: "Arrivederci", 
            en: "Italian for Goodbye.", cn: "再见", 
            vid_ex: "Ciao and Arrivederci.", vid_cn: "你好，再见。",
            life_ex: "Say Arrivederci to your friends.", life_cn: "跟你的朋友们说再见。"
        }
    ],

    // --- 5. 完整字幕 (Updated V7.2) ---
    // 已更新为您提供的最新字幕
    subtitles: [
        { s: 5.27, e: 9.43, t: "Northern Italy rolls out the red carpet to the world as host of the 2026 Winter Games." },
        { s: 9.43, e: 12.63, t: "2026 Winter Games." },
        { s: 13.39, e: 17.03, t: "From the cosmopolitan heart of Milan." },
        { s: 17.70, e: 22.62, t: "The global capital of fashion, design, art and innovation." },
        { s: 23.88, e: 27.84, t: "To the snow capped Dolomite mountains of Cortina, a scene" },
        { s: 27.84, e: 30.16, t: "out of a Hallmark movie." },
        { s: 32.35, e: 35.99, t: "The world comes to Italy. The world comes to hear stories of" },
        { s: 35.99, e: 39.71, t: "a host country with breathtaking splendor." },
        { s: 41.87, e: 46.19, t: "And culminates with a closing ceremony in an ancient 2000 year" },
        { s: 46.19, e: 49.51, t: "old Coliseum built by the Romans." },
        { s: 51.36, e: 55.20, t: "It's almost curtained up for Italy, weaving together competition with" },
        { s: 55.20, e: 59.52, t: "the nations artistic soul to create a masterpiece." },
        { s: 61.15, e: 65.07, t: "Join us for Countdown to the Winter Games." },
        { s: 66.03, e: 69.27, t: "Hello, I'm Matt Renew and welcome to Italy, host country for" },
        { s: 69.27, e: 72.35, t: "the upcoming Winter Olympics. This isn't the first time this" },
        { s: 72.35, e: 73.79, t: "country has hosted the Winter Games." },
        { s: 73.79, e: 76.59, t: "They did it here in Cortina in 1956." },
        { s: 76.59, e: 79.47, t: "Then they hosted again in Torino in 2006." },
        { s: 79.47, e: 82.79, t: "Now they're at it again with two host cities, Milan and Cortina" },
        { s: 82.79, e: 86.59, t: "for the 2026 Winter Olympics. We hope you'll join us as we" },
        { s: 86.59, e: 89.47, t: "explore the beautiful scenery of this country, look at how" },
        { s: 89.47, e: 93.07, t: "organizers are planning the most spread out Olympics ever and" },
        { s: 93.07, e: 95.67, t: "explore what makes Italy famous." },
        { s: 95.67, e: 100.55, t: "From its fast cars to its food to its fashion." },
        { s: 101.33, e: 105.49, t: "The 2026 Winter Olympics in Italy is doing something never tried" },
        { s: 105.49, e: 107.01, t: "before. I think it's fantastic." },
        { s: 107.01, e: 109.89, t: "And you know, the two cities and the widespread games, and" },
        { s: 109.89, e: 114.45, t: "then you have to put this into reality with organizers picking." },
        { s: 115.12, e: 117.44, t: "Two cities to share the Olympic hosting duties." },
        { s: 117.44, e: 121.84, t: "So Milano, Cortina and the IOC accepted this this change of" },
        { s: 121.84, e: 125.20, t: "tradition, which is not always easy to change." },
        { s: 125.20, e: 128.20, t: "The hockey and ice skating are being held in Milan while five" },
        { s: 128.20, e: 130.36, t: "hours away." },
        { s: 130.80, e: 133.55, t: "Alpine ski racing, currently curling and boxing bobsled are." },
        { s: 133.55, e: 136.31, t: "Held in Cortina. In Cortina there's a strong" },
        { s: 136.31, e: 138.35, t: "tradition. You know, we have some of the" },
        { s: 138.35, e: 141.71, t: "best athletes. The recent 2024 Summer Olympics had" },
        { s: 141.71, e: 144.83, t: "events all over Paris but Italy." },
        { s: 145.67, e: 149.83, t: "Is going bigger to represent this duality of our games and all the" },
        { s: 149.83, e: 154.39, t: "the the city and the mountain with events all over northern Italy in" },
        { s: 154.39, e: 159.55, t: "the most spread out Olympics ever. So the idea is to adopt the games" },
        { s: 159.55, e: 161.31, t: "to the territory and not vice versa." },
        { s: 161.31, e: 166.95, t: "So we decided since the candidature to go in location using existing" },
        { s: 166.95, e: 171.12, t: "venues so that Italy didn't have to build many new venues." },
        { s: 171.12, e: 174.20, t: "To go where existing venues were, rather than building new ones and" },
        { s: 174.20, e: 177.12, t: "making sure that they they venues will be used afterwards, in" },
        { s: 177.12, e: 178.35, t: "the mountains especially." },
        { s: 178.35, e: 182.35, t: "And while there are challenges from securing all these areas to even" },
        { s: 182.35, e: 186.23, t: "getting people to all these places, transportation systems that we have" },
        { s: 186.23, e: 190.51, t: "everybody, not only spectators but also media and and Olympic" },
        { s: 190.51, e: 193.03, t: "family move through public transport." },
        { s: 193.03, e: 196.99, t: "Organizers say these Olympics will show the world a new way to host" },
        { s: 196.99, e: 201.87, t: "the Olympics while also showing a lot of Italy character and" },
        { s: 201.87, e: 206.15, t: "personality of our games is what we call the the new Italian spirit." },
        { s: 206.64, e: 209.71, t: "The model for the Olympics now are for host cities to use." },
        { s: 209.71, e: 213.87, t: "Existing venues, and they're doing that here in Cortina with" },
        { s: 213.87, e: 218.39, t: "curling being held in a venue steeped in Olympic history." },
        { s: 218.39, e: 222.67, t: "This is where they held the opening ceremony in figure skating for the" },
        { s: 222.67, e: 225.35, t: "Olympics 70 years ago." },
        { s: 226.12, e: 231.00, t: "The Italian mountain town of Cortina is filled with beauty and" },
        { s: 231.00, e: 233.28, t: "Cortina born, Giacomo Collie says." },
        { s: 233.28, e: 236.52, t: "I'm born in Cortina, raised in Cortina." },
        { s: 237.32, e: 240.28, t: "A lot of Olympic history and the first Olympic here in Cordena," },
        { s: 240.28, e: 241.11, t: "really." },
        { s: 241.11, e: 244.35, t: "Changed the lives of people from Cortina." },
        { s: 244.35, e: 248.19, t: "Cortina hosted the 1956 Winter Olympics and the Opening Ceremony" },
        { s: 248.19, e: 250.43, t: "stadium where they held figure skating in hockey." },
        { s: 250.43, e: 255.19, t: "People during the Olympics will be mainly hidden on the long side 70" },
        { s: 255.19, e: 257.07, t: "years later." },
        { s: 257.76, e: 261.16, t: "Is still being used, playing a big part of the 2026 Winter" },
        { s: 261.16, e: 265.76, t: "Olympics with curling being held here after some big upgrades." },
        { s: 265.76, e: 268.60, t: "The venue here, it's, it's quite old because it was built in" },
        { s: 268.60, e: 270.80, t: "1952 for the 1956." },
        { s: 271.27, e: 275.67, t: "Olympic Games, but now with the 2026 Olympics, they're" },
        { s: 275.67, e: 278.87, t: "renovating it, building new changing rooms and making it more" },
        { s: 278.87, e: 283.63, t: "accessible for wheelchair people. The ones open air stadium," },
        { s: 283.63, e: 288.47, t: "but back in the day it was an open air now has a blue roof on it." },
        { s: 288.47, e: 293.51, t: "But the original 1950s wooden structure surrounding the inside of" },
        { s: 293.51, e: 298.39, t: "this ice arena Voden part is the old one and the blue one is the new" },
        { s: 298.39, e: 301.39, t: "seating is still there along with the original metal floors." },
        { s: 301.39, e: 305.19, t: "That are perfect for curling fans, hockey games to make a lot of" },
        { s: 305.19, e: 307.71, t: "noise. Stuff here everybody." },
        { s: 307.71, e: 311.79, t: "And located next door to the women's Alpine ski racing venue in the" },
        { s: 311.79, e: 315.27, t: "2026 Olympic bobsled course. That's the last curve of the" },
        { s: 315.27, e: 317.95, t: "bobsledge truck. Giacomo says this historic ice" },
        { s: 317.95, e: 322.39, t: "arena will help add the next chapter in Cortina's rich Olympic" },
        { s: 322.39, e: 324.27, t: "history. A great opportunity for Cortina" },
        { s: 324.27, e: 326.11, t: "having the Olympics back again." },
        { s: 326.11, e: 329.63, t: "Italy is known for a lot of things, and Venice is one of them." },
        { s: 329.63, e: 333.15, t: "It's the city of water, but it's not the only place that you'll" },
        { s: 333.15, e: 336.71, t: "find canals. In fact, the 2026 Winter Olympic" },
        { s: 336.71, e: 340.55, t: "host city of Milan has them too." },
        { s: 341.23, e: 344.95, t: "Milan, Italy is most known for its amazing cathedral." },
        { s: 344.95, e: 347.47, t: "Always we have to go by the cathedral." },
        { s: 347.47, e: 351.15, t: "But Milan resident Alessandro Panini says there's another part of" },
        { s: 351.15, e: 354.35, t: "this city that a lot of people don't know about." },
        { s: 354.35, e: 357.27, t: "Yes, people are very surprised because the most of the people are" },
        { s: 357.27, e: 361.15, t: "not aware of the fact that we have water in Milano." },
        { s: 361.59, e: 367.07, t: "And looks a little like Venice. Here we are the beautiful canals of" },
        { s: 367.07, e: 369.51, t: "Milano. Did you expect to find the canals" },
        { s: 369.51, e: 373.03, t: "here? The canals of Milan were once a big" },
        { s: 373.03, e: 377.23, t: "deal in Europe and were part of the oldest canals that once flowed 31" },
        { s: 377.23, e: 380.71, t: "miles connecting to a network of canals flowing through the city." },
        { s: 380.71, e: 384.23, t: "It was one of the greatest infrastructures back then that" },
        { s: 384.23, e: 387.79, t: "helped transport goods. Milan was full of canals." },
        { s: 387.79, e: 390.83, t: "It got a little bit the feeling of Venice." },
        { s: 390.83, e: 392.63, t: "Until trucks." },
        { s: 392.63, e: 396.11, t: "Started doing the job, and that's when these canals were" },
        { s: 396.11, e: 399.39, t: "closed. It just started, you know," },
        { s: 399.39, e: 402.67, t: "being less useful. Today, only a portion of them" },
        { s: 402.67, e: 406.19, t: "still flow. And you're only going to find one" },
        { s: 406.19, e: 408.87, t: "gondola on the water. I'm not joking." },
        { s: 408.87, e: 412.75, t: "We have one gondola, so you can take a ride on the canal." },
        { s: 412.75, e: 418.07, t: "But more tourists are discovering the water here, leaving locks" },
        { s: 418.07, e: 421.56, t: "on the bridges and enjoying a part of Milan." },
        { s: 421.56, e: 423.71, t: "Tourists are starting to appreciate." },
        { s: 423.71, e: 427.15, t: "This area as well, Alessandro says, has been flowing with" },
        { s: 427.15, e: 432.23, t: "beauty for centuries. It's very lovely." },
        { s: 434.50, e: 439.46, t: "In Cortina, Italy, where ski racing and food are everything." },
        { s: 439.46, e: 441.18, t: "And food." },
        { s: 442.31, e: 448.11, t: "Francesco Ganita and his wife. I'm the guy managing with my wife" },
        { s: 448.11, e: 453.11, t: "own the Five Tory Restaurant where they combine two things Italians" },
        { s: 453.11, e: 459.43, t: "love most, ski racing and pizza. This restaurant is a home of skiers" },
        { s: 459.43, e: 462.07, t: "because this is a ski racing family." },
        { s: 462.07, e: 464.75, t: "Francesco co-owner cousin was a ski racer." },
        { s: 464.75, e: 469.03, t: "He raced 5 Olympics and back in Colorado Francesco raised with" },
        { s: 469.03, e: 471.63, t: "Denver University helping that team win." },
        { s: 471.63, e: 475.11, t: "NCAA Championship, and the last year we won the NCAA" },
        { s: 475.11, e: 477.71, t: "Championship. So now in his fourteen, a" },
        { s: 477.71, e: 481.55, t: "restaurant among all the great Italian dishes, you'll also" },
        { s: 481.55, e: 486.43, t: "find pizza named after two of the fastest US ski racers of all time." },
        { s: 486.43, e: 490.31, t: "Two or three pizzas in the menu named by an athlete." },
        { s: 490.31, e: 493.19, t: "This story started probably." },
        { s: 494.56, e: 498.60, t: "767 years ago, the Ted Ligety Pizza made just how Ted Ligety" },
        { s: 498.60, e: 502.24, t: "likes his pizza. He made the the same pizza without" },
        { s: 502.24, e: 505.00, t: "remembering. So we decided to name it that legit" },
        { s: 505.00, e: 506.28, t: "pizza." },
        { s: 506.55, e: 511.27, t: "And it got really famous. And there's also the Lindsey Vonn." },
        { s: 511.43, e: 514.43, t: "Lindsey, probably the best customer we had in the past 15" },
        { s: 514.43, e: 517.23, t: "years, named after her favorite pizza." },
        { s: 517.23, e: 520.35, t: "Both are regulars here, which is one of two requirements to have" },
        { s: 520.35, e: 524.03, t: "a ski racing pizza named after you. He was speaking Margarita all the" },
        { s: 524.03, e: 525.83, t: "time. So it's really hard to change that" },
        { s: 525.83, e: 526.87, t: "name." },
        { s: 526.87, e: 530.03, t: "But after they come back, she decided to come back." },
        { s: 530.03, e: 532.99, t: "We put a Margarita in Sivan pizza in the menu." },
        { s: 532.99, e: 537.07, t: "And Francesco says both pizzas are delicious as a good pick and why" },
        { s: 537.07, t: 541.75, t: "during the Olympics people are racing to get a slice is a bit is a" },
        { s: 541.75, e: 544.07, t: "top seller doing the workout." },
        { s: 545.11, e: 549.39, t: "2026 Winter Olympics will have a closing ceremony unlike any other." },
        { s: 549.39, e: 554.47, t: "In fact, organizers are planning to hold it in a 2000 year old arena" },
        { s: 554.47, e: 560.75, t: "older than the Roman Colosseum. It will be a special sight to see." },
        { s: 561.31, e: 565.07, t: "In the historic city of Verona, David Dacomo." },
        { s: 565.07, e: 570.11, t: "My name is David Dacomo and I'm the responsible of the educational area" },
        { s: 570.11, e: 574.67, t: "for the Arena di Verona Foundation is inside." },
        { s: 574.67, e: 579.91, t: "One of Italy's most historic places built around the 1st century AD," },
        { s: 579.91, e: 583.79, t: "the Arena de Verona, has been standing." },
        { s: 583.79, e: 588.47, t: "For nearly 2000 years and is actually 20 years older than the" },
        { s: 588.47, e: 593.07, t: "Roman Colosseum in Rome and has seen a lot of action." },
        { s: 593.07, e: 597.19, t: "Spectacular events took place in the amphitheater." },
        { s: 597.19, e: 600.83, t: "Gladiators fought here and the arena was once flooded to recreate" },
        { s: 600.83, e: 604.27, t: "Greek naval battles. Flooded with water from the Aditi" },
        { s: 604.27, e: 609.15, t: "River and with small boats. The glitzy battles of antiquity" },
        { s: 609.15, e: 612.07, t: "were reenacted. More recently, Buffalo Bill" },
        { s: 612.07, e: 614.64, t: "performed his wild circus here." },
        { s: 614.64, e: 622.32, t: "In a place where 30,000 Romans once sat accommodate up to 30,000" },
        { s: 622.32, e: 627.28, t: "spectators, an impressive number considering the construction" },
        { s: 627.28, e: 630.36, t: "techniques of the time. But an earthquake damaged the upper" },
        { s: 630.36, e: 633.04, t: "ring of the arena. Now only a part of that original" },
        { s: 633.04, e: 637.80, t: "structure still stands, and today it seats 10,000 people" },
        { s: 637.80, e: 641.36, t: "who now watch from the same seats Roman sat in thousands of years" },
        { s: 641.36, e: 642.36, t: "ago." },
        { s: 642.36, e: 644.47, t: "At the same seat where the Romans." },
        { s: 644.47, e: 651.47, t: "Seated in the in the past inside an arena that when you first walk in," },
        { s: 651.47, e: 654.83, t: "takes your breath away. First time when I come inside into" },
        { s: 654.83, e: 656.51, t: "the arena." },
        { s: 656.51, e: 661.31, t: "It was without without my, without her in my, in my body" },
        { s: 661.31, e: 664.83, t: "with amazing acoustics amplifying the Arena Verona Summer Concert" },
        { s: 664.83, e: 670.39, t: "Series with music performed on the world's largest opera stage every" },
        { s: 670.39, e: 674.71, t: "summer on the largest opera stage in the world. 50" },
        { s: 674.71, e: 679.71, t: "summer evenings of unforgettable emotions with this arena's biggest" },
        { s: 679.71, e: 685.07, t: "act yet to come as the site for the 2026 Winter Olympic Closing" },
        { s: 685.07, e: 686.79, t: "Ceremony tucked." },
        { s: 686.79, e: 692.15, t: "This 450 foot by 400 foot arena dimensions that ensure the perfect" },
        { s: 692.15, e: 696.47, t: "visibility that David says will offer a close up view of Italian" },
        { s: 696.47, e: 700.55, t: "history. 10,000 people leave the same emotion at" },
        { s: 700.55, e: 704.47, t: "the same time in a space as historic as it gets." },
        { s: 704.47, e: 709.35, t: "This creator a connection and it's very important." },
        { s: 712.18, e: 714.82, t: "Thank you for joining us on this journey through Italy." },
        { s: 714.82, e: 718.54, t: "No matter what your favorite Winter Olympic sport is, this upcoming" },
        { s: 718.54, e: 722.34, t: "Olympics is going to be an exciting one in one of the most beautiful" },
        { s: 722.34, e: 726.50, t: "countries on the planet. Ciao and Arrivederci." }
    ],

    // --- 6. 题库 (带 Replay 和 time) ---
    quizzes: {
        general: [
            { time: 85, type: 'bool', q: "True or False: This is the very first time Italy has ever hosted the Winter Olympics.", opts: ["True", "False"], ans: 1, replay: { start: 70, end: 80 } },
            { time: 120, type: 'choice', q: "The video mentions a unique 'Duality'. What does this refer to?", opts: ["Summer & Winter", "City (Milan) & Mountain (Cortina)", "Modern & Ancient", "North & South"], ans: 1, replay: { start: 142, end: 152 } },
            { time: 160, type: 'choice', q: "What record does the 2026 Winter Olympics set regarding geography?", opts: ["It is the coldest ever", "It is the most spread out ever", "It is the highest altitude", "It is the smallest ever"], ans: 1, replay: { start: 89, end: 93 } },
            { time: 180, type: 'choice', q: "How are the organizers making these Games sustainable?", opts: ["No spectators allowed", "Building wood stadiums", "Using existing venues", "Daytime events only"], ans: 2, replay: { start: 160, end: 172 } },
            { time: 650, type: 'choice', q: "Where will the Closing Ceremony be held?", opts: ["San Siro Stadium", "Roman Colosseum", "Arena di Verona", "Cortina Ice Rink"], ans: 2, replay: { start: 540, end: 552 } }
        ],
        detailed: [
            { time: 80, type: 'text', q: "In what year did Cortina first host the Winter Olympics? (Enter year)", match: ["1956", "56"], replay: { start: 73, end: 79} },
            { time: 140, type: 'choice', q: "Which group of sports is held in Cortina?", opts: ["Hockey & Skating", "Alpine Skiing, Curling, Bobsled", "Snowboarding only", "Figure Skating"], ans: 1, replay: { start: 130, end: 138 } },
            { time: 295, type: 'choice', q: "What major renovation was done to the 1956 Ice Stadium?", opts: ["Demolished completely", "Added a blue roof", "Converted to hotel", "Added a glass floor"], ans: 1, replay: { start: 275, end: 293 } },
            { time: 349, type: 'bool', q: "True or False: Milan has canals similar to Venice, though fewer.", opts: ["True", "False"], ans: 0, replay: { start: 358, end: 365 } },
            { time: 380, type: 'choice', q: "What were Milan's canals originally used for?", opts: ["Swimming competitions", "Transporting goods", "Ice skating in winter", "Fishing only"], ans: 1, replay: { start: 374, end: 380 } },
            { time: 420, type: 'choice', q: "How many gondolas can you currently find in Milan?", opts: ["Hundreds", "None", "Exactly one", "Fifty"], ans: 2, replay: { start: 403, end: 408 } },
            { time: 470, type: 'text', q: "The restaurant owner's cousin competed in how many Olympics?", match: ["5", "five"], replay: { start: 456, end: 460 } },
            { time: 530, type: 'choice', q: "Which female US athlete has a pizza named after her?", opts: ["Shaun White", "Lindsey Vonn", "Mikaela Shiffrin", "Simone Biles"], ans: 1, replay: { start: 504, end: 510 } },
            { time: 590, type: 'bool', q: "True or False: The Verona Arena is actually older than the Roman Colosseum.", opts: ["True", "False"], ans: 0, replay: { start: 565, end: 570 } },
            { time: 610, type: 'choice', q: "What unique event once happened in the Verona Arena?", opts: ["Space shuttle launch", "Flooded for naval battles", "Hockey game", "Formula 1 racing"], ans: 1, replay: { start: 580, end: 588 } }
        ]
    }
};