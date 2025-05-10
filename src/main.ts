const input = document.getElementById("chat-input") as HTMLTextAreaElement;
const sendBtn = document.getElementById("send-btn") as HTMLButtonElement;
const errorPopup = document.getElementById("error-popup") as HTMLDivElement;
const chatWrapper = document.querySelector(".chat-wrapper") as HTMLDivElement;

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

function unleashMeltdown() {
  if (msgIndex >= meltdownMessages.length) return;

  const newLine = document.createElement("div");
  newLine.textContent = meltdownMessages[msgIndex++];
  errorPopup.appendChild(newLine);

  // Add flicker randomly
  if (Math.random() < 0.7) flickerEffect();

  setTimeout(unleashMeltdown, 1500 + Math.random() * 1000);
}

function flickerEffect() {
  chatWrapper.classList.add("flicker");
  setTimeout(() => {
    chatWrapper.classList.remove("flicker");
  }, 100 + Math.random() * 300);
}

function playStaticNoise(duration = 5000) {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const bufferSize = 4096;
  const noise = audioCtx.createScriptProcessor(bufferSize, 1, 1);

  noise.onaudioprocess = function (e) {
    const output = e.outputBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1; // White noise
    }
  };

  noise.connect(audioCtx.destination);

  setTimeout(() => {
    noise.disconnect();
    audioCtx.close();
  }, duration);
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendBtn.click();
  }
});

sendBtn.addEventListener("click", () => {
  const msg = input.value.trim();
  if (msg.length > 0) {
    errorPopup.classList.remove("hidden");
    input.disabled = true;
    sendBtn.disabled = true;
    errorPopup.innerHTML = "";
    playStaticNoise(8000);
    unleashMeltdown();
  }
});
