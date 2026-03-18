// PUT YOUR FRESH API KEY HERE
const API_KEY = "YOUR_NEW_KEY_HERE"; 

// 1. NEURAL BACKGROUND ANIMATION
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particles = [];
function initCanvas() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    for(let i=0; i<60; i++) particles.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5});
}
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = "#00f2ff";
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x<0 || p.x>canvas.width) p.vx *= -1; if(p.y<0 || p.y>canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(animate);
}
initCanvas(); animate();

// 2. MATRIX HACK SURPRISE
const mCanvas = document.getElementById('matrix-canvas');
const mCtx = mCanvas.getContext('2d');
let mActive = false;
let drops = [];
function toggleMatrix() {
    mActive = !mActive; mCanvas.style.opacity = mActive ? "1" : "0";
    if(mActive) { mCanvas.width = window.innerWidth; mCanvas.height = window.innerHeight; drops = Array(Math.floor(mCanvas.width/20)).fill(1); drawMatrix(); }
}
function drawMatrix() {
    if(!mActive) return; mCtx.fillStyle = "rgba(0, 0, 0, 0.05)"; mCtx.fillRect(0,0,mCanvas.width,mCanvas.height); mCtx.fillStyle = "#00ff41";
    drops.forEach((y, i) => { mCtx.fillText(String.fromCharCode(65+Math.random()*33), i*20, y*20); if(y*20 > mCanvas.height && Math.random() > 0.975) drops[i] = 0; drops[i]++; });
    requestAnimationFrame(drawMatrix);
}

// 3. VOICE RECOGNITION (The MIC)
function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice not supported.");
    const rec = new SpeechRecognition();
    rec.onstart = () => document.getElementById('mic-btn').classList.add('mic-active');
    rec.onresult = (e) => { document.getElementById('chat-in').value = e.results[0][0].transcript; sendChat(); };
    rec.onend = () => document.getElementById('mic-btn').classList.remove('mic-active');
    rec.start();
}

// 4. LIVE GEMINI AI CHAT
async function sendChat() {
    const input = document.getElementById('chat-in').value;
    const box = document.getElementById('chat-box');
    if(!input || API_KEY === "YOUR_NEW_KEY_HERE") return;
    box.innerHTML += `<div class="text-right opacity-30">> ${input}</div>`;
    document.getElementById('chat-in').value = "";
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: `You are NagaGen OS, a futuristic terminal built by C. Weching Konyak. User asks: ${input}` }] }] })
        });
        const data = await response.json();
        const aiReply = data.candidates[0].content.parts[0].text;
        box.innerHTML += `<div class="text-cyan-400 font-bold">AI: ${aiReply}</div>`;
        box.scrollTop = box.scrollHeight;
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(aiReply));
    } catch (e) { box.innerHTML += `<div class="text-red-500">ERROR: Neural Link Failed.</div>`; }
}

// 5. CALCULATOR WITH SIDE HISTORY
function calculate() {
    const i = document.getElementById('calc-in').value;
    try {
        const r = eval(i); document.getElementById('calc-res').innerText = r;
        const h = document.getElementById('calc-history');
        if(h.innerText.includes("Empty")) h.innerHTML = "";
        h.innerHTML = `<div>${i}=${r}</div>` + h.innerHTML;
    } catch { alert("MATH_ERROR"); }
}

