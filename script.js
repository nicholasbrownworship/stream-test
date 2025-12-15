// Rotating “system messages” (fade only; no typing)
const messages = [
  "Loading Campaign Records",
  "Cross-Referencing Battle Logs",
  "Verifying Data Integrity",
  "Indexing Strategic Assets",
  "Compiling After-Action Summaries",
  "Awaiting Command Input"
];

const el = document.getElementById("statusSecondary");
let i = 0;

// Timing (tweak to taste)
const HOLD_MS = 6500;      // how long message stays
const FADE_MS = 700;       // must match CSS transition

function setMessage(next) {
  // fade out
  el.style.opacity = "0";
  window.setTimeout(() => {
    el.textContent = next;
    // fade in
    el.style.opacity = "1";
  }, FADE_MS);
}

window.setInterval(() => {
  i = (i + 1) % messages.length;
  setMessage(messages[i]);
}, HOLD_MS);
