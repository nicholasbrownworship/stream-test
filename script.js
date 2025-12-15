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

// Micro-log lines that feel like file operations (keeps it “alive”)
const microPool = [
  "OPENING: DOSSIER /CRUSADE/CA-41",
  "SCANNING: INDEX TABLES … OK",
  "SORTING: BATTLE LOGS BY DATE",
  "HASHING: OUTCOME RECORDS … OK",
  "LINKING: TERRITORY CONTROL TABLE",
  "CACHING: MAP LAYERS … OK",
  "VALIDATING: ROSTER ENTRIES … OK",
  "PARSING: AFTER-ACTION REPORTS",
  "CHECKSUM: CAMPAIGN STATE … OK",
  "ALLOCATING: DATA BUFFERS … OK",
  "RESOLVING: WARP ROUTES … OK",
  "LOCKING: ARCHIVE SEALS … OK"
];

const statusEl = document.getElementById("statusSecondary");
const microEl  = document.getElementById("microLog");
const indexEl  = document.getElementById("indexCount");

// Timings
const HOLD_MS = 6500;
const FADE_MS = 700;

let msgIndex = 0;
let counter = 1;

// Micro-log: maintain a rolling window
const logLines = [];
const MAX_LINES = 6;

function pushLogLine(line) {
  logLines.push(line);
  while (logLines.length > MAX_LINES) logLines.shift();
  microEl.textContent = logLines.join("\n");
}

function nextMicroLine() {
  const pick = microPool[Math.floor(Math.random() * microPool.length)];
  const stamp = String(counter).padStart(4, "0");
  return `${stamp} | ${pick}`;
}

function setMessage(next) {
  statusEl.style.opacity = "0";
  setTimeout(() => {
    statusEl.textContent = next;
    statusEl.style.opacity = "1";
  }, FADE_MS);
}

// Prime log
for (let i = 0; i < MAX_LINES; i++) {
  pushLogLine(nextMicroLine());
  counter++;
}

indexEl.textContent = "0001";

// Loop
setInterval(() => {
  msgIndex = (msgIndex + 1) % messages.length;
  setMessage(messages[msgIndex]);

  // Add 1–2 new log lines per cycle to feel “busy”
  pushLogLine(nextMicroLine()); counter++;
  if (Math.random() > 0.55) { pushLogLine(nextMicroLine()); counter++; }

  // Update index counter
  const idx = (parseInt(indexEl.textContent, 10) + 1) % 9999;
  indexEl.textContent = String(idx || 1).padStart(4, "0");
}, HOLD_MS);
