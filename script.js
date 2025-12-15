// script.js
// Randomized micro-log stamps + randomized INDEX (no counting up from 1)

const messages = [
  "Loading Campaign Records",
  "Cross-Referencing Battle Logs",
  "Verifying Data Integrity",
  "Indexing Strategic Assets",
  "Compiling After-Action Summaries",
  "Resolving Territorial Claims",
  "Awaiting Command Input"
];

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

// Random stamp generator (avoids repeats for a bit to feel more "system-y")
const usedStamps = new Set();
function randStamp4() {
  let s;
  do {
    s = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  } while (usedStamps.has(s) && usedStamps.size < 9000);

  usedStamps.add(s);

  // Keep memory bounded (still reduces immediate repeats)
  if (usedStamps.size > 200) usedStamps.clear();

  return s;
}

function randIndex4() {
  return String(Math.floor(Math.random() * 10000)).padStart(4, "0");
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Micro-log: maintain a rolling window
const logLines = [];
const MAX_LINES = 6;

function pushLogLine(line) {
  logLines.push(line);
  while (logLines.length > MAX_LINES) logLines.shift();
  microEl.textContent = logLines.join("\n");
}

function nextMicroLine() {
  return `${randStamp4()} | ${pick(microPool)}`;
}

function setMessage(next) {
  statusEl.style.opacity = "0";
  setTimeout(() => {
    statusEl.textContent = next;
    statusEl.style.opacity = "1";
  }, FADE_MS);
}

// Init
for (let i = 0; i < MAX_LINES; i++) pushLogLine(nextMicroLine());
indexEl.textContent = randIndex4();

// Loop
let msgIndex = 0;

setInterval(() => {
  msgIndex = (msgIndex + 1) % messages.length;
  setMessage(messages[msgIndex]);

  // Add 1–2 new log lines per cycle to feel “busy”
  pushLogLine(nextMicroLine());
  if (Math.random() > 0.55) pushLogLine(nextMicroLine());

  // Random index (simulates random access / file pointer jumps)
  indexEl.textContent = randIndex4();
}, HOLD_MS);
