/* 🤖 YATRI AI - STABLE BRAIN BY NIRMAL RAJPUT */

const MY_AI_KEY = "AIzaSyCjZITdlajxpMVVi3nmJFhUXF4CwYr1iBo"; 

function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    if (chatWin) {
        chatWin.classList.toggle('chat-active');
        document.body.style.overflow = chatWin.classList.contains('chat-active') ? "hidden" : "auto";
    }
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    const userText = input.value.trim();

    if (!userText) return;

    // 1. User ka message dikhao
    chatBody.innerHTML += `<div class="user-msg" style="align-self: flex-end; background: #2c562a; color: white; padding: 12px; border-radius: 15px 15px 0 15px; margin-bottom: 10px; max-width: 80%;">${userText}</div>`;
    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. Typing Indicator
    const typingId = "typing-" + Date.now();
    chatBody.innerHTML += `<div class="ai-msg" id="${typingId}" style="align-self: flex-start; background: #eee; padding: 12px; border-radius: 15px 15px 15px 0; margin-bottom: 10px; max-width: 80%;">Thinking... 🤔</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;

    // 3. API Call
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${MY_AI_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Tu Bharat Yatra ka official AI hai jise Nirmal Rajput ne banaya hai. Tera kaam travel help karna hai. User ka sawal: ${userText}. Short Hinglish mein jawab de.` }]
                }]
            })
        });

        const data = await response.json();
        
        // Agar API key fail ho jaye ya response na aaye
        if (data.candidates && data.candidates[0].content) {
            let aiText = data.candidates[0].content.parts[0].text;
            document.getElementById(typingId).innerHTML = aiText.replace(/\*/g, ""); // Bold stars hatane ke liye
        } else {
            // FALLBACK JAWAB (Agar API kaam na kare)
            document.getElementById(typingId).innerHTML = "Bhai, API key mein thoda issue lag raha hai, lekin main Nirmal Rajput ka assistant hoon! Aap Jaipur, Mumbai ya Goa ke baare mein puch sakte hain. ✨";
        }
    } catch (error) {
        document.getElementById(typingId).innerHTML = "Bhai, network ya API ka lafda hai. Internet check karo ya apni API key dobara generate karo! 🌐";
    }
    chatBody.scrollTop = chatBody.scrollHeight;
}
