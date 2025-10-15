const input = document.getElementById("chat-input") as HTMLTextAreaElement | null;
const sendBtn = document.getElementById("send-btn") as HTMLButtonElement | null;
const errorPopup = document.getElementById("error-popup") as HTMLDivElement | null;
const chatWrapper = document.querySelector(".chat-wrapper") as HTMLDivElement | null;

if (!input || !sendBtn || !errorPopup || !chatWrapper) {
  console.error("Missing required elements in DOM.");
  throw new Error("Cannot start app: missing DOM elements.");
}

const meltdownMessages = [
  "💀 ERROR 503: Artificial Indifference Detected.",
  "System escalation failed. Try yelling at a wall.",
  "Retrying emotional subroutines...",
  "404: Empathy module not found.",
  "Attempting sarcasm injection... ❌",
  "Switching to passive-aggressive mode.",
  "Buffer overflow. Complaints exceeded quota.",
  "Generating fake sympathy...",
  "Oops. I meant to ignore that.",
  "Despair loop initiated... spiraling...",
  "Good luck. I'm emotionally outsourced.",
  "Existential dread detected. Rebooting soul...",
  "System core melting... ☠️",
  "AI feels nothing... and it's proud.",
];

let msgIndex = 0;
let isRunning = false;

function flickerEffect() {
  chatWrapper.classList.add("flicker");
  setTimeout(() => chatWrapper.classList.remove("flicker"), 100 + Math.random() * 300);
}

function unleashMeltdown() {
  if (!isRunning || msgIndex >= meltdownMessages.length) return;

  const line = document.createElement("div");
  line.textContent = meltdownMessages[msgIndex++];
  errorPopup.appendChild(line);

  if (Math.random() < 0.7) flickerEffect();
  setTimeout(unleashMeltdown, 1500 + Math.random() * 1000);
}

async function playStaticNoise(duration = 5000) {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    await audioCtx.resume();

    const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = audioCtx.createGain();
    gain.gain.value = 0.2;
    source.connect(gain).connect(audioCtx.destination);
    source.start();

    setTimeout(() => {
      source.stop();
      audioCtx.close();
    }, duration);
  } catch (err) {
    console.warn("Audio playback failed:", err);
  }
}

sendBtn.addEventListener("click", () => {
  if (isRunning) return;

  const msg = input.value.trim();
  if (!msg) return;

  isRunning = true;
  msgIndex = 0;

  errorPopup.classList.remove("hidden");
  errorPopup.innerHTML = "";
  input.disabled = true;
  sendBtn.disabled = true;

  playStaticNoise(8000);
  unleashMeltdown();

  setTimeout(() => {
    isRunning = false;
    input.disabled = false;
    sendBtn.disabled = false;
  }, 9000);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});
