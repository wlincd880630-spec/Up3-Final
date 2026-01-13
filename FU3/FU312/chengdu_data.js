/**
 * Mission Data: Project Chengdu (Concise Feature Edition)
 * * UPDATE:
 * - 'featureSentence': Refined to concise phrases (Noun Phrase + Clause) 
 * instead of full sentences (removed "It is...", "This is...").
 * - Example: "world-class facility, simulates a natural environment..."
 */

const chengduSpots = [
    {
        id: 1,
        nameCn: "成都大熊猫繁育研究基地",
        nameEn: "Chengdu Research Base of Giant Panda Breeding",
        lat: 30.73362, lng: 104.13735,
        images: ["images/panda1.jpg", "images/panda2.jpg", "images/panda3.jpg"],
        
        // --- VISUAL TEXT (Simplified for Table Filling) ---
        location: "Northern Suburb (Chenghua)",
        cost: "55 RMB",
        // 修改：精简短语
        featureSentence: "world-class facility, simulates a natural ecological environment perfect for breeding pandas",
        highlights: ["Visit Sunshine Nursery", "Watch morning feeding"],
        funFact: "Pandas eat 14 hours a day.",

        // --- AUDIO SEGMENTS (Natural Spoken English) ---
        audioSegments: {
            location: "Hello everyone! We are currently situated in the northern suburbs of the Chenghua District, about 10km from the city center.",
            feature: "This isn't just a zoo; this world-class facility simulates a natural ecological environment perfect for breeding pandas.",
            todo: "Now, if you want to see the tiny pink ones, visitors should see the Sunshine Nursery. Trust me, the best activity is watching them eat breakfast.",
            cost: "Tickets are reasonable; the standard admission ticket costs 55 RMB per person.",
            funFact: "Oh, and here is a fun fact: Adult pandas spend up to 14 hours every day doing nothing but eating bamboo!"
        }
    },
    {
        id: 2,
        nameCn: "文殊院",
        nameEn: "Wenshu Monastery",
        lat: 30.67262, lng: 104.07365,
        images: ["images/wenshu1.jpg", "images/wenshu2.jpg", "images/wenshu3.jpg"],
        
        location: "City Center (Qingyang)",
        cost: "Free",
        // 修改：精简短语
        featureSentence: "best-preserved Buddhist temple in Chengdu, uniquely combining solemn worship with a relaxed local tea culture",
        highlights: ["Admire ancient statues", "Sit in garden teahouse"],
        funFact: "Bone of Xuanzang.",

        audioSegments: {
            location: "Now for a moment of peace. This ancient temple is conveniently located in the city center within the Qingyang District.",
            feature: "It's special because it stands as the best-preserved Buddhist temple in Chengdu, uniquely combining solemn worship with a relaxed local tea culture.",
            todo: "Take a look around at the ancient statues. If you need a break, visitors often sit in the garden teahouse to enjoy traditional covered-bowl tea.",
            cost: "The best part? Admission to the monastery is completely free for all visitors.",
            funFact: "Legend says the temple houses a piece of the skull bone of Xuanzang, the legendary monk."
        }
    },
    {
        id: 3,
        nameCn: "东郊记忆",
        nameEn: "Dongjiao Memory",
        lat: 30.67083, lng: 104.12634,
        images: ["images/dongjiao1.jpg", "images/dongjiao2.jpg", "images/dongjiao3.jpg"],
        
        location: "Eastern Suburb (Chenghua)",
        cost: "Free",
        // 修改：精简短语
        featureSentence: "vibrant industrial art park retaining its heritage, featuring massive pipes, chimneys, and slogans",
        highlights: ["See vintage steam trains", "Take industrial photos"],
        funFact: "Chengdu's '798 Art Zone'.",

        audioSegments: {
            location: "Let's head east. It is found in the eastern suburbs of the Chenghua District, at an old factory site.",
            feature: "It's super cool because it is a vibrant industrial art park that preserves its original factory aesthetic with massive pipes and chimneys.",
            todo: "Look over there—you will see vintage steam trains. For all you Instagrammers, it is a perfect spot to take industrial-style photos.",
            cost: "Good news for your wallet: Entrance to the main park area is free of charge.",
            funFact: "Locals often refer to it as the '798 Art Zone of Chengdu' due to its unique style."
        }
    },
    {
        id: 4,
        nameCn: "望平街",
        nameEn: "Wangping Street",
        lat: 30.65585, lng: 104.09355,
        images: ["images/wangping1.jpg", "images/wangping2.jpg", "images/wangping3.jpg"],
        
        location: "Jinjiang River Bank",
        cost: "Free",
        // 修改：精简短语
        featureSentence: "renovated riverside street offering a trendy vibe, a perfect blend of old community life and new architecture",
        highlights: ["Check out Geometric Bookshop", "Relax at riverside cafes"],
        funFact: "Bar hub at night.",

        audioSegments: {
            location: "Ready for a walk? It runs along the banks of the Jinjiang River, near the television tower.",
            feature: "I love this place because this renovated riverside street offers a trendy vibe mixed with local life.",
            todo: "Make sure to check out the Geometric Bookshop. If you're tired, relax and drink coffee at one of the many riverside cafes.",
            cost: "Since it is a public street, walking there is free.",
            funFact: "Here is a cool detail: The area transforms from a quiet street by day into a lively bar hub at night."
        }
    },
    {
        id: 5,
        nameCn: "太古里",
        nameEn: "Taikoo Li",
        lat: 30.65331, lng: 104.08272,
        images: ["images/taikoo1.jpg", "images/taikoo2.jpg", "images/taikoo3.jpg"],
        
        location: "City Center (Chunxi Road)",
        cost: "Free",
        // 修改：精简短语
        featureSentence: "open-air luxury retail complex, featuring traditional Sichuan-style roofs and low-rise buildings",
        highlights: ["See Climbing Panda", "Visit Daci Temple"],
        funFact: "Built around a temple.",

        audioSegments: {
            location: "Welcome to the fashion center! It is situated in the heart of the city, adjacent to the famous Chunxi Road.",
            feature: "Look at the architecture; it is an open-air luxury retail complex featuring traditional Sichuan-style roofs.",
            todo: "Look up! You cannot miss the giant Climbing Panda sculpture. Also, discover the serene Daci Temple hidden inside.",
            cost: "Don't worry about tickets, it is free to enter the district and walk around.",
            funFact: "What's amazing is that the entire modern mall was carefully built around a 1600-year-old temple."
        }
    },
    {
        id: 6,
        nameCn: "玉林路",
        nameEn: "Yulin Road",
        lat: 30.63225, lng: 104.06201,
        images: ["images/yulin1.jpg", "images/yulin2.jpg", "images/yulin3.jpg"],
        
        location: "South (Wuhou District)",
        cost: "Free",
        // 修改：精简短语
        featureSentence: "famous 'Slow Life' neighborhood with a vibrant bistro culture, offering an authentic street vibe",
        highlights: ["Look for Little Bar", "Eat traditional BBQ"],
        funFact: "Song 'Chengdu'.",

        audioSegments: {
            location: "Now for some local vibes. This area is located in the Wuhou District, south of the city center.",
            feature: "Yulin is famous for its 'Slow Life' philosophy and vibrant bistro culture, offering an authentic street vibe.",
            todo: "Look for the entrance of the famous 'Little Bar'. When the sun goes down, experience the nightlife by eating traditional BBQ.",
            cost: "It is a public neighborhood, so exploring it is free.",
            funFact: "Did you know? This neighborhood became famous nationwide due to the pop song 'Chengdu'."
        }
    },
    {
        id: 7,
        nameCn: "武侯祠",
        nameEn: "Wuhou Shrine",
        lat: 30.64570, lng: 104.04945,
        images: ["images/wuhou1.jpg", "images/wuhou2.jpg", "images/wuhou3.jpg"],
        
        location: "Southwest (Next to Jinli)",
        cost: "50 RMB",
        // 修改：精简短语
        featureSentence: "most significant Three Kingdoms temple, unique for honoring both the Emperor and Minister together",
        highlights: ["Walk Red Wall path", "Rent audio guide"],
        funFact: "Loyalty bond.",

        audioSegments: {
            location: "History buffs, this one is for you. It is located next to Jinli Street in the southwest part of the city.",
            feature: "This is the most significant temple dedicated to the Three Kingdoms heroes, unique because it honors both Emperor and Minister.",
            todo: "You absolutely must walk through the iconic Red Wall bamboo path for a classic photo. I suggest renting an audio guide.",
            cost: "The entrance ticket costs 50 RMB per person.",
            funFact: "It's special because the temple commemorates the sacred bond of loyalty between ruler and advisor."
        }
    },
    {
        id: 8,
        nameCn: "锦里古街",
        nameEn: "Jinli Ancient Street",
        lat: 30.64522, lng: 104.05075,
        images: ["images/jinli1.jpg", "images/jinli2.jpg", "images/jinli3.jpg"],
        
        location: "Next to Wuhou Shrine",
        cost: "Free",
        // 修改：精简短语
        featureSentence: "pedestrian street built in Qing Dynasty style, famous for red lanterns and folk crafts",
        highlights: ["Check out Opera Stage", "Taste local snacks"],
        funFact: "First Street of Shu.",

        audioSegments: {
            location: "Just a few steps away is Jinli. It is located immediately next to the Wuhou Shrine complex.",
            feature: "It is a pedestrian street built in the architectural style of the Qing Dynasty, famous for its red lanterns.",
            todo: "While you're here, check out the traditional Opera Stage. If you're hungry, you can taste various local snacks.",
            cost: "Great news: Admission to the street is entirely free of charge.",
            funFact: "It is known as the 'First Street of the Shu Kingdom' due to its history."
        }
    },
    {
        id: 9,
        nameCn: "杜甫草堂",
        nameEn: "Du Fu Thatched Cottage",
        lat: 30.66277, lng: 104.02611,
        images: ["images/dufu1.jpg", "images/dufu2.jpg", "images/dufu3.jpg"],
        
        location: "West Chengdu (Huanhuaxi)",
        cost: "50 RMB",
        // 修改：精简短语
        featureSentence: "former residence of Du Fu, serving as both a museum and a serene classical Chinese garden",
        highlights: ["Visit Thatched Cottage", "Walk Flower Path"],
        funFact: "240+ poems.",

        audioSegments: {
            location: "Let's visit a poet's home. It is located in the west of Chengdu, adjacent to the Huanhuaxi Park.",
            feature: "This was the former residence of Du Fu, known as China's 'Sage of Poetry', serving as a museum and garden.",
            todo: "Make sure to visit the reconstructed Thatched Cottage. You can spend time reading Du Fu's poetry in the garden.",
            cost: "The standard entry ticket is 50 RMB.",
            funFact: "He was very productive here; Du Fu wrote more than 240 of his most famous poems while living here."
        }
    },
    {
        id: 10,
        nameCn: "金沙遗址博物馆",
        nameEn: "Jinsha Site Museum",
        lat: 30.68118, lng: 104.01260,
        images: ["images/jinsha1.jpg", "images/jinsha2.jpg", "images/jinsha3.jpg"],
        
        location: "Northwest Chengdu",
        cost: "70 RMB",
        // 修改：精简短语
        featureSentence: "museum protecting the mysterious 3,000-year-old Ancient Shu ruins, built directly over the excavation site",
        highlights: ["See Golden Sun Bird", "Watch 4D movie"],
        funFact: "Sun Bird is city logo.",

        audioSegments: {
            location: "Prepare to be amazed by gold. It is located in northwest Chengdu, at the original excavation site.",
            feature: "It protects the ruins of the mysterious 3,000-year-old Ancient Shu Civilization, built directly over the dig site.",
            todo: "The highlight? The most important artifact to see is the exquisite Golden Sun Bird. Also, watch the 4D movie.",
            cost: "The admission fee is 70 RMB per person.",
            funFact: "The Golden Sun Bird found here is now the official logo of Chengdu city."
        }
    },
    {
        id: 11,
        nameCn: "府青路片区",
        nameEn: "Fuqing Flyover",
        lat: 30.68750, lng: 104.10300,
        images: ["images/fuqing1.jpg", "images/fuqing2.jpg", "images/fuqing3.jpg"],
        
        location: "Northeast (Chenghua)",
        cost: "Free",
        // 修改：精简短语
        featureSentence: "futuristic 'Cyberpunk' viewpoint, featuring multi-layered bridges surrounded by dense buildings",
        highlights: ["Observe traffic lights", "Go at night"],
        funFact: "Viral Sci-Fi aesthetic.",

        audioSegments: {
            location: "Want to see the future? It is located in the northeast, at a major highway intersection in Chenghua.",
            feature: "It offers a futuristic, Cyberpunk view of the city, featuring multi-layered bridges surrounded by buildings.",
            todo: "Look down and observe the endless stream of traffic lights. The best plan is to go there at night for photos.",
            cost: "It is a public pedestrian bridge, so access is free.",
            funFact: "This spot went viral on social media because it looks exactly like a scene from the movie Blade Runner."
        }
    },
    {
        id: 12,
        nameCn: "宽窄巷子",
        nameEn: "Kuanzhai Alleys",
        lat: 30.66335, lng: 104.05335,
        images: ["images/kuanzhai1.jpg", "images/kuanzhai2.jpg", "images/kuanzhai3.jpg"],
        
        location: "City Center (Qingyang)",
        cost: "Free",
        // 修改：精简短语
        featureSentence: "three historic alleys preserving the traditional courtyard architecture of the Qing Dynasty era",
        highlights: ["Admire brick carvings", "Try ear-cleaning"],
        funFact: "Manchu garrison.",

        audioSegments: {
            location: "Here we are at the Kuanzhai Alleys. Ideally located in the city center, a short walk from People's Park.",
            feature: "The area comprises three historic alleys that preserve the traditional courtyard architecture of the Qing Dynasty era.",
            todo: "Look closely; you can admire the detailed brick carvings. You can also try the traditional ear-cleaning service.",
            cost: "It is free to walk around the alleys.",
            funFact: "Fun fact: This area originally served as a garrison for Manchu soldiers in the past."
        }
    },
    {
        id: 13,
        nameCn: "人民公园",
        nameEn: "People's Park",
        lat: 30.65950, lng: 104.05490,
        images: ["images/people1.jpg", "images/people2.jpg", "images/people3.jpg"],
        
        location: "City Center (Near Kuanzhai)",
        cost: "Free",
        // 修改：精简短语
        featureSentence: "most authentic place to experience local life, famous for its lively teahouses and Matchmaking Corner",
        highlights: ["Order Jasmine tea", "Visit Matchmaking Corner"],
        funFact: "Matchmaking for kids.",

        audioSegments: {
            location: "And finally, People's Park. It is located in the city center, very close to the Kuanzhai Alleys.",
            feature: "It is the most authentic place to experience the daily life of locals, famous for its lively teahouses.",
            todo: "Be sure to visit the Matchmaking Corner. When you are tired, you must order a cup of Jasmine tea.",
            cost: "Entrance to the park is free for everyone.",
            funFact: "It's funny but true: Parents post advertisements in the Matchmaking Corner to find partners for their kids."
        }
    }
];