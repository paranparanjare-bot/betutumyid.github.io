(function() {
    // --- KONFIGURASI ---
    const WORKER_URL = "https://betutu-ai-worker.betutubr.workers.dev/";
    const BOT_NAME = "BR Betutu Assistant";
    const PRIMARY_COLOR = "#8B4513"; 

    // 1. Tambahkan CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #betutu-chat-wrapper { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: sans-serif; }
        #chat-button { 
            width: 60px; height: 60px; background: ${PRIMARY_COLOR}; border-radius: 50%; 
            display: flex; align-items: center; justify-content: center; cursor: pointer; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: transform 0.3s; 
        }
        #chat-button:hover { transform: scale(1.1); }
        #chat-window { display: none; width: 350px; height: 450px; background: white; border-radius: 15px; flex-direction: column; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.2); border: 1px solid #eee; margin-bottom: 15px; }
        #chat-header { background: ${PRIMARY_COLOR}; color: white; padding: 15px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; }
        #chat-messages { flex: 1; padding: 15px; overflow-y: auto; background: #fdfaf7; display: flex; flex-direction: column; gap: 10px; }
        .msg { max-width: 80%; padding: 8px 12px; border-radius: 12px; font-size: 14px; line-height: 1.4; }
        .msg-user { align-self: flex-end; background: ${PRIMARY_COLOR}; color: white; border-bottom-right-radius: 2px; }
        .msg-bot { align-self: flex-start; background: white; color: #333; border: 1px solid #eee; border-bottom-left-radius: 2px; }
        #chat-input-area { padding: 10px; border-top: 1px solid #eee; display: flex; gap: 5px; background: white; }
        #chat-input { flex: 1; border: 1px solid #ddd; border-radius: 20px; padding: 8px 15px; outline: none; font-size: 14px; }
        #chat-send { background: ${PRIMARY_COLOR}; color: white; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; }
        
        /* Ikon Chat CS Baru (SVG) */
        .icon-cs { width: 30px; height: 30px; fill: white; }
    `;
    document.head.appendChild(style);

    // 2. Buat Elemen HTML
    const wrapper = document.createElement('div');
    wrapper.id = 'betutu-chat-wrapper';
    wrapper.innerHTML = `
        <div id="chat-window">
            <div id="chat-header">
                <span>💬 ${BOT_NAME}</span>
                <span id="chat-close" style="cursor:pointer">×</span>
            </div>
            <div id="chat-messages">
                <div class="msg msg-bot">Halo kak 😊. Ada yang bisa saya bantu seputar BR Bumbu Betutu? Silakan tanya harga, ongkir, atau cara order ya.</div>
            </div>
            <div id="chat-input-area">
                <input type="text" id="chat-input" placeholder="Ketik pesan di sini...">
                <button id="chat-send">➤</button>
            </div>
        </div>
        <div id="chat-button">
            <svg class="icon-cs" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </div>
    `;
    document.body.appendChild(wrapper);

    // 3. Logika Interaksi
    const btn = document.getElementById('chat-button');
    const win = document.getElementById('chat-window');
    const close = document.getElementById('chat-close');
    const input = document.getElementById('chat-input');
    const send = document.getElementById('chat-send');
    const msgBox = document.getElementById('chat-messages');

    btn.onclick = () => { win.style.display = 'flex'; btn.style.display = 'none'; };
    close.onclick = () => { win.style.display = 'none'; btn.style.display = 'flex'; };

    async function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        const loadingMsg = addMessage('...', 'bot');
        try {
            const res = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            msgBox.removeChild(loadingMsg);
            addMessage(data.response || "Maaf kak, sistem sedang sibuk 😊", 'bot');
        } catch (e) {
            msgBox.removeChild(loadingMsg);
            addMessage("Maaf kak, jaringan sibuk 😊", 'bot');
        }
    }

    function addMessage(text, side) {
        const div = document.createElement('div');
        div.className = `msg msg-${side}`;
        div.innerText = text;
        msgBox.appendChild(div);
        msgBox.scrollTop = msgBox.scrollHeight;
        return div;
    }

    send.onclick = handleSend;
    input.onkeypress = (e) => { if(e.key === 'Enter') handleSend(); };
})();
