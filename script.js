// Rotating “system messages” (fade only; no typing)
const messages = [
  "Loading Campaign Records",
  "Cross-Referencing Battle Logs",
  "Verifying Data Integrity",
  "Indexing Strategic Assets",
  "Compiling After-Action Summaries",
  "Resolving Territorial Claims",
  "Awaiting Command Input"
];

const microLines = [
  "OPENING: DOSSIER /CRUSADE/CA-41",
  "SCANNING: INDEX TABLES … OK",
  "SORTING: BATTLE LOGS BY DATE",
  "HASHING: OUTCOME RECORDS … OK",
  "LINKING: TERRITORY CONTROL TABLE",
  "CACHING: MAP LAYERS … OK"
];

const statusEl = document.getElementById("statusSecondary");
const microEl = document.getElementById("microLog");
const indexEl = document.getElementById("indexCount");

let msgIndex = 0;
let tick = 1;

// timings (tweakable)
const HOLD_MS = 6500;
const FADE_MS = 700;

// micro-log “activity” loop
function updateMicroLog() {
  const a = microLines[(tick + 0) % microLines.length];
  const b = microLines[(tick + 1) % microLines.length];
  const c = microLines[(tick + 2) % microLines.length];
  microEl.textContent = `${a}\n${b}\n${c}`;
}

// index counter (slow, procedural)
function updateIndex() {
  const n = (tick % 9999).toString().padStart(4, "0");
  indexEl.textContent = n;
}

function setMessage(next) {
  statusEl.style.opacity = "0";
  window.setTimeout(() => {
    statusEl.textContent = next;
    statusEl.style.opacity = "1";
  }, FADE_MS);
}

// init
updateMicroLog();
updateIndex();

// rotate main messages
window.setInterval(() => {
  msgIndex = (msgIndex + 1) % messages.length;
  setMessage(messages[msgIndex]);

  tick += 1;
  updateMicroLog();
  updateIndex();
}, HOLD_MS);
