/* 🤖 YATRI AI - ADVANCED BRAIN BY NIRMAL RAJPUT */

function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    if (chatWin) chatWin.classList.toggle('chat-hidden');
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    const userText = input.value.trim();
    if (!userText) return;

    // User Message Display
    chatBody.innerHTML += `<div class="user-msg">${userText}</div>`;
    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // Typing Effect
    const typingId = "typing-" + Date.now();
    chatBody.innerHTML += `<div class="ai-msg" id="${typingId}">Thinking... 🤔</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;

    const response = await getAIResponse(userText.toLowerCase());

    setTimeout(() => {
        document.getElementById(typingId).innerHTML = response;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

async function getAIResponse(query) {
    // 1. GREETINGS & PERSONALITY
    if (query.match(/(hi|hello|namaste|hey|hola)/)) {
        return "Namaste! 🙏 Main Bharat Yatra ka smart assistant hoon. Aap mujhse kisi city, budget, ya travel category (Beach, Hill, Temple) ke bare mein puch sakte hain!";
    }

    if (query.includes("nirmal") || query.includes("owner") || query.includes("founder")) {
        return "Bharat Yatra ko <b>Nirmal Rajput</b> ne banaya hai. Wo ek shandaar developer hain jo travelers ki help karna chahte hain! 🚀";
    }

    // 2. BUDGET LOGIC (Dynamic Filtering)
    if (query.includes("budget") || query.includes("sasta") || query.includes("cheap")) {
        const cheapCities = allCities.filter(c => c.budget_category === "Low").slice(0, 3);
        let list = cheapCities.map(c => `<li><b>${c.name}</b> (Approx: ${c.budget_range})</li>`).join("");
        return `Kam budget mein ye 3 jagah best hain: <ul>${list}</ul> <br> Baaki deals ke liye <a href='packages.html'>Packages</a> dekhein! 🏝️`;
    }

    // 3. SEASONAL SUGGESTIONS
    if (query.includes("garmi") || query.includes("summer") || query.includes("thanda")) {
        return "Garmiyon mein pahad hi sukoon dete hain! 🏔️ Aapko <b>Manali, Leh, ya Munnar</b> jaise Hill Stations try karne chahiye.";
    }
    
    if (query.includes("winter") || query.includes("sardi") || query.includes("thandi")) {
        return "Sardiyon mein <b>Rajasthan (Jaipur/Jaisalmer)</b> ya <b>Goa</b> ka mausam ekdum qatil hota hai! ✨";
    }

    // 4. CATEGORY LOGIC
    if (query.includes("beach") || query.includes("samundar") || query.includes("sea")) {
        const beaches = allCities.filter(c => c.category.toLowerCase().includes("beach")).slice(0, 3);
        return `Beach lovers ke liye <b>${beaches.map(b => b.name).join(", ")}</b> top options hain! 🏖️`;
    }

    if (query.includes("temple") || query.includes("mandir") || query.includes("religious")) {
        const temples = allCities.filter(c => c.category.toLowerCase().includes("temple")).slice(0, 3);
        return `Pavitra yatra ke liye aap <b>${temples.map(t => t.name).join(", ")}</b> ja sakte hain. 🛕`;
    }

    // 5. SMART CITY SEARCH (Deep Scan)
    const foundCity = allCities.find(c => query.includes(c.name.toLowerCase()));
    if (foundCity) {
        return `✨ <b>${foundCity.name}</b> (${foundCity.state}) ki highlights:<br>
                📍 <b>Ghumne layak:</b> ${foundCity.places.join(", ")}<br>
                🍱 <b>Famous Dish:</b> ${foundCity.food}<br>
                📅 <b>Best Time:</b> ${foundCity.best_time}<br><br>
                Aap yahan ke liye <a href='booking.html'>Ticket Book</a> kar sakte hain!`;
    }

    // 6. ACTION TRIGGERS
    if (query.includes("book") || query.includes("ticket") || query.includes("train") || query.includes("flight")) {
        return "Ticket booking ke liye hamare <a href='booking.html' style='color:#ff5722; font-weight:bold;'>Booking Portal</a> par jayein. ✈️";
    }

    // 7. FUNNY/DEFAULT FALLBACK
    const randomFails = [
        "Bhai, ye toh mere data se bahar hai! 😅 Lekin India ghumne ke baare mein kuch bhi pucho, main bata dunga.",
        "Ye sawal thoda tough hai! Search bar mein search karke dekhoge kya? 🔍",
        "Maaf karna bhai, mujhe sirf India ke 160+ cities ki jankari hai. 🇮🇳"
    ];
    return randomFails[Math.floor(Math.random() * randomFails.length)];
}
/* 🤖 YATRI AI - ADVANCED BRAIN BY NIRMAL RAJPUT */

function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    if (chatWin) chatWin.classList.toggle('chat-hidden');
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    const userText = input.value.trim();
    if (!userText) return;

    chatBody.innerHTML += `<div class="user-msg">${userText}</div>`;
    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    const typingId = "typing-" + Date.now();
    chatBody.innerHTML += `<div class="ai-msg" id="${typingId}">Thinking... 🤔</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;

    const response = await getAIResponse(userText.toLowerCase());

    setTimeout(() => {
        document.getElementById(typingId).innerHTML = response;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

async function getAIResponse(query) {
    // 1. GREETINGS (Desi style)
    if (query.match(/(hi|hello|namaste|hey|राम राम|kaise ho)/)) {
        return "Namaste! 🙏 Main Yatri AI hoon. Bharat ghumne ka plan hai? Kisi city ka naam bataiye ya puchiye 'Sasta trip' ya 'Hill station'!";
    }

    // 2. FOUNDER INFO
    if (query.match(/(nirmal|owner|founder|admin|kisne banaya)/)) {
        return "Bharat Yatra ko **Nirmal Rajput** ne banaya hai. Wo ek shandaar developer hain! 🚀";
    }

    // 3. BUDGET LOGIC (Desi Keywords)
    if (query.match(/(budget|sasta|cheap|kam paisa|low price|paisa kam)/)) {
        const cheapCities = allCities.filter(c => c.budget_category === "Low").slice(0, 4);
        let list = cheapCities.map(c => `<li>✅ <b>${c.name}</b> (${c.budget_range})</li>`).join("");
        return `Bhai, kam budget mein ye jagah best hain: <ul>${list}</ul> <br> Baaki deals <a href='packages.html'>Packages</a> mein check karlo! 🏝️`;
    }

    // 4. WEATHER & SEASON (Desi Keywords)
    if (query.match(/(garmi|summer|thanda|hot|dhup|dhup)/)) {
        return "Garmiyon mein toh pahad hi sahi rehte hain! 🏔️ Aap <b>Manali, Leh, ya Munnar</b> ja sakte hain.";
    }
    if (query.match(/(winter|sardi|thandi|cold|snow|barf)/)) {
        return "Sardiyon mein <b>Kashmir</b> mein barf dekhni ho ya <b>Goa</b> ki party, dono best hain! ✨";
    }

    // 5. FOOD LOGIC (Desi Keywords)
    if (query.match(/(khana|food|dinner|lunch|nashta|famous food|special dish)/)) {
        const foodCity = allCities.find(c => query.includes(c.name.toLowerCase()));
        if (foodCity) return `${foodCity.name} mein <b>${foodCity.food}</b> nahi khaya toh kya khaya! 🍱`;
        return "India ka khana toh world-famous hai! North ka <b>Chole Bhature</b> ho ya South ka <b>Dosa</b>, sab lajawab hai. 🍛";
    }

    // 6. CATEGORY SEARCH (Temples, Beaches, Mountains)
    if (query.match(/(beach|ocean|samundar|sea|pani)/)) {
        const beaches = allCities.filter(c => c.category.toLowerCase().includes("beach")).slice(0, 3);
        return `Beach ke liye <b>${beaches.map(b => b.name).join(", ")}</b> ekdum mast rahenge! 🏖️`;
    }
    if (query.match(/(temple|mandir|religious|darshan|bhakti)/)) {
        const temples = allCities.filter(c => c.category.toLowerCase().includes("temple")).slice(0, 3);
        return `Darshan ke liye <b>${temples.map(t => t.name).join(", ")}</b> jaise pavitra shehar best hain. 🛕`;
    }

    // 7. ADVANCED CITY SEARCH (Scan all 160+ Cities)
    const foundCity = allCities.find(c => query.includes(c.name.toLowerCase()));
    if (foundCity) {
        return `✨ <b>${foundCity.name}</b> (${foundCity.state}) ki details:<br>
                📍 <b>Ghumne layak:</b> ${foundCity.places.slice(0, 3).join(", ")}<br>
                🍱 <b>Special Food:</b> ${foundCity.food}<br>
                📅 <b>Best Time:</b> ${foundCity.best_time}<br><br>
                Aap yahan ke liye <a href='booking.html'>Ticket Book</a> kar sakte hain!`;
    }

    // 8. ACTION TRIGGERS
    if (query.match(/(book|ticket|train|flight|plane|bus)/)) {
        return "Ticket book karni hai? Hamare <a href='booking.html' style='color:#ff5722; font-weight:bold;'>Booking Portal</a> par turant jayein! ✈️";
    }

    // 9. FALLBACK (Jab kuch na mile)
    const fails = [
        "Bhai, ye sawal toh mere syllabus se bahar hai! 😅 Bharat ghumne ke bare mein kuch bhi puchiye.",
        "Maaf karna, mujhe sirf India ke 160+ shehron ki jankari hai. 🇮🇳 Kuch aur puchiye?",
        "Ye thoda tough hai! Aap Search Bar mein city ka naam likh kar dekhiye? 🔍"
    ];
    return fails[Math.floor(Math.random() * fails.length)];
}