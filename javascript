function sendChat() {
    const input = document.getElementById('chat-in').value.toLowerCase();
    const box = document.getElementById('chat-box');
    if(!input) return;

    // 1. Show User Message
    box.innerHTML += `<div class="text-right opacity-30">> ${input}</div>`;
    
    // 2. The Logic (Expanded for your screenshots!)
    let reply = "Scanning neural networks... query undefined in current reality.";

    if(input.includes("hello") || input.includes("hi")) {
        reply = "Welcome, Lead Architect. How shall we build Nagaland today?";
    } else if(input.includes("a for")) {
        reply = "A stands for Artificial Intelligence—the engine of our future!";
    } else if(input.includes("konyak")) {
        reply = "Language preservation app status: 75% complete. Konyak core online.";
    } else if(input.includes("nielit")) {
        reply = "System Node: NIELIT Kohima verified. Student link active.";
    } else if(input.includes("who are you") || input.includes("who build you")) {
        reply = "I am NagaGen OS, a Vision 3001 terminal engineered by Architect C. Weching Konyak.";
    } else if(input.includes("google ceo") || input.includes("sundar pichai")) {
        reply = "Sundar Pichai is the CEO of Google and Alphabet.";
    } else if(input.includes("funny") || input.includes("haha")) {
        reply = "Humor levels detected at 85%. Reality is indeed quite amusing, Architect.";
    }

    // 3. Show AI Response with Sound & Scroll
    setTimeout(() => {
        box.innerHTML += `<div class="text-cyan-400 font-bold">AI: ${reply}</div>`;
        box.scrollTop = box.scrollHeight;
        window.speechSynthesis.speak(new SynthesisUtterance(reply));
        playSound(660); // Trigger the surprise sound effect!
    }, 600);

    document.getElementById('chat-in').value = "";
      }

