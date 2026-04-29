const scene = document.querySelector(".scene");
const dolls = [...document.querySelectorAll(".doll")];
const outfitButtons = [...document.querySelectorAll(".outfit-button")];
const mazeButtons = [...document.querySelectorAll(".maze-pad button")];
const poopToggle = document.querySelector("#poopToggle");
const flagToggle = document.querySelector("#flagToggle");
const pictionaryToggle = document.querySelector("#pictionaryToggle");
const mazeBoard = document.querySelector("#mazeBoard");
const mazeStatus = document.querySelector("#mazeStatus");
const caption = document.querySelector(".caption");
const pictionaryPanel = document.querySelector(".pictionary-panel");
const turnName = document.querySelector("#turnName");
const turnPrompt = document.querySelector("#turnPrompt");
const turnSubtitle = document.querySelector("#turnSubtitle");
const skipTurn = document.querySelector("#skipTurn");
const timerButton = document.querySelector("#timerButton");
const correctGuess = document.querySelector("#correctGuess");
const nextTurn = document.querySelector("#nextTurn");
const poopCountNodes = {
  blonde: document.querySelector("#poopCountAlba"),
  brunette: document.querySelector("#poopCountLaino"),
  niya: document.querySelector("#poopCountNiya"),
};
const flagCountNodes = {
  blonde: document.querySelector("#flagCountAlba"),
  brunette: document.querySelector("#flagCountLaino"),
  niya: document.querySelector("#flagCountNiya"),
};
const pictionaryScoreNodes = {
  blonde: document.querySelector("#scoreAlba"),
  brunette: document.querySelector("#scoreLaino"),
  niya: document.querySelector("#scoreNiya"),
};
const canvas = document.querySelector("#confetti");
const ctx = canvas.getContext("2d");

const lines = {
  blonde: [
    "Ay Angel estoy cansada",
    "Etruscos jijiji",
    "Ay que fomo",
  ],
  brunette: [
    "Ja ja, Angel calvo. Aupa!",
    "Soy una friki del arte",
    "Ja ja, Angel calvo. Kaixo!",
  ],
  niya: [
    "Precaria",
    "Haber, los dias de la semana",
  ],
};

const references = {
  blonde: [
    { title: "Palencia", icon: "palencia-icon", note: "Cristo del Otero" },
    { title: "Bella Desconocida", icon: "cathedral-icon", note: "Catedral de Palencia" },
    { title: "Canal", icon: "canal-icon", note: "Canal de Castilla" },
    { title: "Etruscos", icon: "vase-icon", note: "jijiji historico" },
    { title: "Fomo", icon: "phone-icon", note: "se lo estan pasando sin mi" },
    { title: "Siesta", icon: "sleep-icon", note: "cansancio nivel Palencia" },
    { title: "San Antolin", icon: "cathedral-icon", note: "cripta y catedral" },
    { title: "Calle Mayor", icon: "canal-icon", note: "paseo palentino" },
    { title: "Monte el Viejo", icon: "sleep-icon", note: "aire de Palencia" },
    { title: "Lechazo", icon: "pintxo-icon", note: "referencia castellana" },
  ],
  brunette: [
    { title: "Donosti", icon: "donosti-icon", note: "La Concha" },
    { title: "Pintxos", icon: "pintxo-icon", note: "ruta seria" },
    { title: "Chillida", icon: "chillida-icon", note: "Peine del Viento" },
    { title: "Arte", icon: "frame-icon", note: "friki oficial" },
    { title: "Zurriola", icon: "wave-icon", note: "ola y criterio" },
    { title: "Kaixo", icon: "sun-icon", note: "Donosti energy" },
    { title: "Urgull", icon: "donosti-icon", note: "monte y bahia" },
    { title: "Igueldo", icon: "sun-icon", note: "vistas de postal" },
    { title: "Kursaal", icon: "frame-icon", note: "cubos y arte" },
    { title: "Parte Vieja", icon: "pintxo-icon", note: "pintxos everywhere" },
  ],
  niya: [
    { title: "Spaventapasseri", icon: "mic-icon", note: "Italian drama mode" },
    { title: "Аз съм филмова маниачка", icon: "camera-icon", note: "soy una friki de las pelis" },
    { title: "Film Class", icon: "camera-icon", note: "scene one, take one" },
  ],
};

let activeDoll = null;
let pointer = null;
let particles = [];
let lastTime = 0;
let activeGame = null;
const poopCounts = {
  blonde: 0,
  brunette: 0,
  niya: 0,
};
const flagCounts = {
  blonde: 0,
  brunette: 0,
  niya: 0,
};
let poopTimer = 0;
let audioContext = null;
let hintCount = 0;
let hintInterval = null;
let hintTimer = null;
let currentTurnIndex = 0;
let mimeTimer = null;
let mimeTimeLeft = 60;
const pictionaryPeople = [
  { person: "blonde", name: "Alba" },
  { person: "brunette", name: "Laino" },
  { person: "niya", name: "Niya" },
];
const pictionaryPrompts = [
  { es: "haz mimica de montar una rueda de prensa incomoda", en: "act out an awkward press conference" },
  { es: "haz mimica de doblar una pelicula dramatica", en: "mime dubbing a dramatic movie scene" },
  { es: "haz mimica de dirigir una escena sin presupuesto", en: "act out directing a no-budget film scene" },
  { es: "haz mimica de entrevistar a alguien que no contesta", en: "mime interviewing someone who refuses to answer" },
  { es: "haz mimica de vender un libro rarísimo", en: "act out selling a very weird book" },
  { es: "haz mimica de encontrar un spoiler en clase", en: "mime discovering a spoiler in class" },
  { es: "haz mimica de pedir un cafe mientras llegas tarde", en: "act out ordering coffee while running late" },
  { es: "haz mimica de tocar el piano como si fuera una tragedia", en: "mime playing piano like a tragedy" },
  { es: "haz mimica de grabar un documental sobre una silla azul", en: "act out filming a documentary about a blue chair" },
  { es: "haz mimica de presentar las noticias sin teleprompter", en: "mime presenting the news without a teleprompter" },
  { es: "haz mimica de hacer casting para una pelicula búlgara", en: "act out casting for a Bulgarian movie" },
  { es: "haz mimica de explicar los dias de la semana", en: "mime explaining the days of the week" },
  { es: "haz mimica de un espantapajaros italiano", en: "act out an Italian scarecrow" },
  { es: "haz mimica de perder el micro en directo", en: "mime losing the microphone live on air" },
  { es: "haz mimica de criticar una peli muy seria", en: "act out reviewing a very serious film" },
  { es: "haz mimica de hacer una escena en camara lenta", en: "mime a slow-motion movie scene" },
];
const pictionaryScores = {
  blonde: 0,
  brunette: 0,
  niya: 0,
};
const mazeLevels = [
  [
    "#################",
    "#A.............E#",
    "#.###.###.###.#.#",
    "#...#...#.#...#.#",
    "###.#.#.#.#.#.###",
    "#N..#.#...#.#...#",
    "#.###.#####.###.#",
    "#...#...#...#...#",
    "#.#.###.###.###.#",
    "#L.............E#",
    "#################",
  ],
  [
    "#################",
    "#A.............E#",
    "#.###.#####.###.#",
    "#...#.....#.....#",
    "###.#.###.#####.#",
    "#N..#...#.......#",
    "#.#####.###.###.#",
    "#.....#.....#...#",
    "#.###.#####.###.#",
    "#L.............E#",
    "#################",
  ],
  [
    "#################",
    "#A....#.......#E#",
    "#.###.#.#####.#.#",
    "#...#.#.....#...#",
    "###.#.#####.###.#",
    "#N..#.....#.....#",
    "#.#######.#####.#",
    "#.#.....#.......#",
    "#.#.###.#######.#",
    "#L....#........E#",
    "#################",
  ],
  [
    "###################",
    "#A......#........E#",
    "#.####..#.######..#",
    "#....#..#......#..#",
    "####.#.######..##.#",
    "#N...#......#.....#",
    "#.#########.#.###.#",
    "#.....#.....#...#.#",
    "#.###.#.#######.#.#",
    "#L..#...........#E#",
    "###################",
  ],
  [
    "###################",
    "#A..#............E#",
    "#.#.#.###########.#",
    "#.#.#.....#.......#",
    "#.#.#####.#.#####.#",
    "#N#.....#.#.....#.#",
    "#.#####.#.#####.#.#",
    "#.....#.#.....#.#.#",
    "#####.#.#####.#.#.#",
    "#L....#.......#..E#",
    "###################",
  ],
  [
    "###################",
    "#A......#.....#..E#",
    "###.###.#.###.#.#.#",
    "#...#...#.#...#.#.#",
    "#.###.###.#.###.#.#",
    "#N....#...#.....#.#",
    "#.###.#.#######.#.#",
    "#.#...#.....#...#.#",
    "#.#.#######.#.###.#",
    "#L#.............#E#",
    "###################",
  ],
];
let currentMazeIndex = 0;
let mazeRoundLocked = false;
let mazeHoldTimer = 0;
const mazePlayers = {
  blonde: { col: 1, row: 1, done: false },
  brunette: { col: 1, row: 7, done: false },
  niya: { col: 1, row: 5, done: false },
};

const state = new Map(
  dolls.map((doll) => [
    doll,
    {
      x: readCssNumber(doll, "--x"),
      y: readCssNumber(doll, "--y"),
      r: readCssNumber(doll, "--r"),
      vx: 0,
      vy: 0,
      vr: 0,
      lastX: 0,
      lastY: 0,
      lastT: 0,
    },
  ]),
);

function readCssNumber(el, prop) {
  return Number.parseFloat(getComputedStyle(el).getPropertyValue(prop)) || 0;
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(innerWidth * ratio);
  canvas.height = Math.floor(innerHeight * ratio);
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function updateDoll(doll) {
  const item = state.get(doll);
  doll.style.setProperty("--x", `${item.x}px`);
  doll.style.setProperty("--y", `${item.y}px`);
  doll.style.setProperty("--r", `${item.r}deg`);
}

function speak(doll) {
  const bubble = doll.querySelector(".bubble");
  const options = lines[doll.dataset.person];
  sayText(doll, options[Math.floor(Math.random() * options.length)]);
}

function sayText(doll, text, duration = 900) {
  const bubble = doll.querySelector(".bubble");
  bubble.textContent = text;
  doll.classList.add("talking", "popped");
  clearTimeout(doll._popTimer);
  clearTimeout(doll._talkTimer);
  doll._popTimer = setTimeout(() => doll.classList.remove("popped"), 520);
  doll._talkTimer = setTimeout(() => doll.classList.remove("talking"), duration);
}

function burst(x, y, person, amount = 12) {
  const words =
    person === "blonde"
      ? ["Palencia", "Cristo", "FOMO", "Etruscos", "zzz", "♥"]
      : person === "brunette"
        ? ["Aupa", "Kaixo", "Donosti", "Arte", "Pintxo", "♥"]
        : ["Niya", "Bulgaria", "Sofia", "Rila", "Banitsa", "♥"];
  for (let i = 0; i < amount; i += 1) {
    const spark = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 24 + Math.random() * 62;
    spark.className = "spark";
    spark.textContent = words[Math.floor(Math.random() * words.length)];
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.color = ["#ffd166", "#49d7b8", "#ff6f91", "#fff8e8", "#56a3ff"][i % 5];
    spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    scene.appendChild(spark);
    setTimeout(() => spark.remove(), 760);
  }
}

function playVictoryMusic(person) {
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  audioContext.resume?.();
  const now = audioContext.currentTime;
  const notes = person === "blonde"
    ? [523.25, 659.25, 783.99, 1046.5, 880, 1046.5]
    : person === "brunette"
      ? [392, 493.88, 587.33, 783.99, 659.25, 783.99]
      : [440, 554.37, 659.25, 830.61, 739.99, 987.77];

  notes.forEach((frequency, index) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = index % 2 ? "square" : "triangle";
    osc.frequency.setValueAtTime(frequency, now + index * 0.16);
    gain.gain.setValueAtTime(0, now + index * 0.16);
    gain.gain.linearRampToValueAtTime(0.08, now + index * 0.16 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.16 + 0.18);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(now + index * 0.16);
    osc.stop(now + index * 0.16 + 0.2);
  });

  const bass = audioContext.createOscillator();
  const bassGain = audioContext.createGain();
  bass.type = "sawtooth";
  bass.frequency.setValueAtTime(person === "blonde" ? 130.81 : person === "brunette" ? 98 : 116.54, now);
  bass.frequency.exponentialRampToValueAtTime(person === "blonde" ? 196 : person === "brunette" ? 146.83 : 174.61, now + 0.8);
  bassGain.gain.setValueAtTime(0.055, now);
  bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);
  bass.connect(bassGain).connect(audioContext.destination);
  bass.start(now);
  bass.stop(now + 1.18);
}

function showVictoryJumpscare(person) {
  const winner = dolls.find((item) => item.dataset.person === person);
  const overlay = document.createElement("div");
  const clone = winner.cloneNode(true);
  const words = person === "blonde"
    ? ["YUPI", "PALENCIA", "ETRUSCOS", "FOMO", "ALBA"]
    : person === "brunette"
      ? ["YUPI", "DONOSTI", "ARTE", "KAIXO", "LAINO"]
      : ["YUPI", "NIYA", "BULGARIA", "SOFIA", "BANITSA"];

  overlay.className = `victory-jumpscare ${person === "blonde" ? "alba" : person === "brunette" ? "laino" : "niya"}`;
  overlay.setAttribute("aria-hidden", "true");
  clone.classList.remove("dragging", "maze-step", "maze-winner", "maze-loser", "maze-caught");
  clone.classList.add("victory-doll");
  clone.removeAttribute("tabindex");
  clone.querySelector(".bubble").textContent = "Yupi";
  overlay.appendChild(clone);

  for (let i = 0; i < 34; i += 1) {
    const bit = document.createElement("span");
    bit.className = "victory-bit";
    bit.textContent = words[i % words.length];
    bit.style.left = `${8 + Math.random() * 84}%`;
    bit.style.top = `${10 + Math.random() * 78}%`;
    bit.style.setProperty("--spin", `${-28 + Math.random() * 56}deg`);
    bit.style.setProperty("--delay", `${Math.random() * 0.5}s`);
    overlay.appendChild(bit);
  }

  scene.appendChild(overlay);
  playVictoryMusic(person);
  for (let i = 0; i < 5; i += 1) {
    setTimeout(() => burst(innerWidth / 2, innerHeight / 2, person, 18), i * 420);
  }
  setTimeout(() => overlay.remove(), 3000);
}

function placeAnimation(person) {
  const card = document.createElement("div");
  const isBlonde = person === "blonde";
  const options = references[person];
  const ref = options[Math.floor(Math.random() * options.length)];
  card.className = `place-flyby ${isBlonde ? "palencia" : person === "brunette" ? "donosti" : "bulgaria"}`;
  card.innerHTML = `
    <span class="place-title">${ref.title}</span>
    <span class="place-icon ${ref.icon}" aria-hidden="true"></span>
    <span class="place-note">${ref.note}</span>
  `;
  scene.appendChild(card);
  setTimeout(() => card.remove(), 3200);
}

function clearGameObjects() {
  document.querySelectorAll(".poop, .flag-target, .victory-jumpscare, .singing-mic").forEach((item) => item.remove());
  dolls.forEach((doll) => doll.classList.remove("strained", "maze-step", "maze-winner", "maze-loser", "maze-caught", "pictionary-turn"));
  mazeBoard.innerHTML = "";
  mazeBoard.setAttribute("aria-hidden", "true");
  mazeRoundLocked = false;
}

function getMazeGrid() {
  return mazeLevels[currentMazeIndex];
}

function findMazeCell(symbol) {
  const grid = getMazeGrid();
  for (let row = 0; row < grid.length; row += 1) {
    const col = grid[row].indexOf(symbol);
    if (col !== -1) return { col, row, done: false };
  }
  return { col: 1, row: 1, done: false };
}

function buildMaze() {
  const grid = getMazeGrid();
  mazeBoard.innerHTML = "";
  mazeBoard.setAttribute("aria-hidden", "false");
  mazeStatus.textContent = `Nivel ${currentMazeIndex + 1}`;
  mazeBoard.style.setProperty("--maze-cols", grid[0].length);
  mazeBoard.style.setProperty("--maze-rows", grid.length);
  grid.forEach((row, rowIndex) => {
    [...row].forEach((cell, colIndex) => {
      const tile = document.createElement("span");
      tile.className = "maze-cell";
      if (cell === "#") tile.classList.add("wall");
      if (cell === "E") tile.classList.add("exit");
      if (cell === "A") tile.classList.add("start", "alba");
      if (cell === "L") tile.classList.add("start", "laino");
      if (cell === "N") tile.classList.add("start", "niya");
      tile.style.gridColumn = colIndex + 1;
      tile.style.gridRow = rowIndex + 1;
      mazeBoard.appendChild(tile);
    });
  });
}

function placeMazePlayers() {
  mazeRoundLocked = false;
  dolls.forEach((doll) => doll.classList.remove("maze-step", "maze-winner", "maze-loser", "maze-caught"));
  mazePlayers.blonde = findMazeCell("A");
  mazePlayers.brunette = findMazeCell("L");
  mazePlayers.niya = findMazeCell("N");
  updateMazeDoll("blonde");
  updateMazeDoll("brunette");
  updateMazeDoll("niya");
}

function resetMazeAfterCatch() {
  mazeRoundLocked = true;
  mazePlayers.blonde = findMazeCell("A");
  mazePlayers.brunette = findMazeCell("L");
  mazePlayers.niya = findMazeCell("N");
  updateMazeDoll("blonde");
  updateMazeDoll("brunette");
  updateMazeDoll("niya");
  dolls.forEach((doll) => {
    doll.classList.remove("maze-step");
    doll.classList.add("maze-caught");
  });
  sayText(dolls.find((item) => item.dataset.person === "blonde"), "Odio la tecnologia", 3600);
  sayText(dolls.find((item) => item.dataset.person === "brunette"), "Laguntza", 3600);
  sayText(dolls.find((item) => item.dataset.person === "niya"), "Pomognete", 3600);
  setTimeout(() => {
    if (activeGame !== "flags") return;
    dolls.forEach((doll) => doll.classList.remove("maze-caught"));
    mazeRoundLocked = false;
  }, 900);
}

function updateMazeDoll(person, step = false, dc = 0) {
  const doll = dolls.find((item) => item.dataset.person === person);
  const player = mazePlayers[person];
  const grid = getMazeGrid();
  const board = mazeBoard.getBoundingClientRect();
  const cellW = board.width / grid[0].length;
  const cellH = board.height / grid.length;
  const scale = Number.parseFloat(getComputedStyle(doll).getPropertyValue("--scale")) || 1;
  const footOffset = doll.offsetHeight * scale * 0.45;
  const x = board.left + (player.col + 0.5) * cellW - innerWidth / 2;
  const y = board.top + (player.row + 0.5) * cellH - innerHeight / 2 - footOffset;
  const item = state.get(doll);
  item.x = x;
  item.y = y;
  item.vx = 0;
  item.vy = 0;
  item.vr = 0;
  item.r = dc === 0 ? (person === "blonde" ? -4 : person === "brunette" ? 4 : 0) : dc * 7;
  updateDoll(doll);
  if (!step) return;
  doll.classList.remove("maze-step");
  void doll.offsetWidth;
  doll.classList.add("maze-step");
  clearTimeout(doll._stepTimer);
  doll._stepTimer = setTimeout(() => doll.classList.remove("maze-step"), 260);
}

function moveMazePlayer(person, dc, dr) {
  if (activeGame !== "flags" || mazeRoundLocked) return;
  const player = mazePlayers[person];
  if (player.done) return;
  const nextCol = player.col + dc;
  const nextRow = player.row + dr;
  const cell = getMazeGrid()[nextRow]?.[nextCol];
  if (!cell || cell === "#") return;

  player.col = nextCol;
  player.row = nextRow;
  updateMazeDoll(person, true, dc);

  const caught = Object.entries(mazePlayers).some(([otherPerson, otherPlayer]) => (
    otherPerson !== person && !otherPlayer.done && player.col === otherPlayer.col && player.row === otherPlayer.row
  ));
  if (caught) {
    resetMazeAfterCatch();
    return;
  }

  if (cell === "E") {
    mazeRoundLocked = true;
    player.done = true;
    flagCounts[person] += 1;
    flagCountNodes[person].textContent = flagCounts[person];
    const doll = dolls.find((item) => item.dataset.person === person);
    const losers = dolls.filter((item) => item.dataset.person !== person);
    const rect = doll.getBoundingClientRect();
    doll.classList.add("maze-winner");
    losers.forEach((loser) => loser.classList.add("maze-loser"));
    sayText(doll, "Yupi", 1300);
    losers.forEach((loser) => sayText(loser, "Me cago", 1300));
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, person, 18);
    showVictoryJumpscare(person);
    setTimeout(() => {
      if (activeGame !== "flags") return;
      currentMazeIndex = (currentMazeIndex + 1) % mazeLevels.length;
      buildMaze();
      requestAnimationFrame(placeMazePlayers);
    }, 3000);
  }
}

function handleMazeKey(event) {
  if (activeGame !== "flags") return;
  const key = event.key.toLowerCase();
  const moves = {
    w: ["blonde", 0, -1],
    a: ["blonde", -1, 0],
    s: ["blonde", 0, 1],
    d: ["blonde", 1, 0],
    arrowup: ["brunette", 0, -1],
    arrowleft: ["brunette", -1, 0],
    arrowdown: ["brunette", 0, 1],
    arrowright: ["brunette", 1, 0],
    i: ["niya", 0, -1],
    j: ["niya", -1, 0],
    k: ["niya", 0, 1],
    l: ["niya", 1, 0],
  };
  const move = moves[key];
  if (!move) return;
  event.preventDefault();
  moveMazePlayer(move[0], move[1], move[2]);
}

function setGame(nextGame) {
  activeGame = activeGame === nextGame ? null : nextGame;
  const isBathroom = activeGame === "bathroom";
  const isFlags = activeGame === "flags";
  const isPictionary = activeGame === "pictionary";

  document.querySelector(".stage").classList.toggle("bathroom-mode", isBathroom);
  document.querySelector(".stage").classList.toggle("flag-mode", isFlags);
  document.querySelector(".stage").classList.toggle("pictionary-mode", isPictionary);
  poopToggle.classList.toggle("active", isBathroom);
  flagToggle.classList.toggle("active", isFlags);
  pictionaryToggle.classList.toggle("active", isPictionary);
  poopToggle.setAttribute("aria-pressed", String(isBathroom));
  flagToggle.setAttribute("aria-pressed", String(isFlags));
  pictionaryToggle.setAttribute("aria-pressed", String(isPictionary));
  pictionaryPanel.hidden = !isPictionary;
  poopToggle.textContent = isBathroom ? "Baño activo" : "Baño";
  flagToggle.textContent = isFlags ? "Laberinto activo" : "Laberinto";
  pictionaryToggle.textContent = isPictionary ? "Mimica activa" : "Mimica";

  clearTimeout(poopTimer);
  clearInterval(mazeHoldTimer);
  clearMimeTimer();
  clearGameObjects();

  if (isBathroom) schedulePoop();
  if (isFlags) {
    buildMaze();
    requestAnimationFrame(placeMazePlayers);
  }
  if (isPictionary) {
    updatePictionaryTurn();
    requestAnimationFrame(placeCafePlayers);
  }
}

function placeCafePlayers() {
  const mobile = innerWidth < 520;
  const positions = {
    blonde: { x: mobile ? -96 : -176, y: mobile ? 160 : 112, r: -4 },
    brunette: { x: 0, y: mobile ? 142 : 96, r: 2 },
    niya: { x: mobile ? 96 : 176, y: mobile ? 160 : 112, r: 4 },
  };

  dolls.forEach((doll) => {
    const item = state.get(doll);
    const pos = positions[doll.dataset.person];
    item.x = pos.x;
    item.y = pos.y;
    item.r = pos.r;
    item.vx = 0;
    item.vy = 0;
    item.vr = 0;
    updateDoll(doll);
  });
}

function updatePictionaryTurn() {
  const player = pictionaryPeople[currentTurnIndex % pictionaryPeople.length];
  const prompt = pictionaryPrompts[currentTurnIndex % pictionaryPrompts.length];
  turnName.textContent = `Turno de ${player.name}`;
  turnPrompt.textContent = prompt.es;
  turnSubtitle.textContent = prompt.en;
  turnSubtitle.hidden = player.person !== "niya";
  dolls.forEach((doll) => doll.classList.toggle("pictionary-turn", doll.dataset.person === player.person));
  sayText(dolls.find((doll) => doll.dataset.person === player.person), "Me toca", 1400);
}

function nextPictionaryTurn() {
  clearMimeTimer();
  currentTurnIndex += 1;
  updatePictionaryTurn();
}

function awardPictionaryPoint() {
  clearMimeTimer();
  const player = pictionaryPeople[currentTurnIndex % pictionaryPeople.length];
  pictionaryScores[player.person] += 1;
  pictionaryScoreNodes[player.person].textContent = pictionaryScores[player.person];
  const doll = dolls.find((item) => item.dataset.person === player.person);
  const rect = doll.getBoundingClientRect();
  sayText(doll, "Yupi", 1200);
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2, player.person, 12);
  nextPictionaryTurn();
}

function updateTimerButton() {
  const minutes = Math.floor(mimeTimeLeft / 60);
  const seconds = String(mimeTimeLeft % 60).padStart(2, "0");
  timerButton.textContent = `${minutes}:${seconds}`;
  timerButton.classList.toggle("running", Boolean(mimeTimer));
}

function clearMimeTimer() {
  clearInterval(mimeTimer);
  mimeTimer = null;
  mimeTimeLeft = 60;
  updateTimerButton();
}

function startMimeTimer() {
  if (activeGame !== "pictionary" || mimeTimer) return;
  mimeTimeLeft = 60;
  updateTimerButton();
  mimeTimer = setInterval(() => {
    mimeTimeLeft -= 1;
    updateTimerButton();
    if (mimeTimeLeft > 0) return;

    const player = pictionaryPeople[currentTurnIndex % pictionaryPeople.length];
    const doll = dolls.find((item) => item.dataset.person === player.person);
    pictionaryScores[player.person] -= 1;
    pictionaryScoreNodes[player.person].textContent = pictionaryScores[player.person];
    sayText(doll, "Me cago", 1200);
    nextPictionaryTurn();
  }, 1000);
  updateTimerButton();
}

function showHintPopup() {
  if (hintCount >= 5) {
    clearInterval(hintInterval);
    return;
  }

  hintCount += 1;
  caption.classList.add("visible");
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => caption.classList.remove("visible"), 5200);

  if (hintCount >= 5) clearInterval(hintInterval);
}

function startHintPopups() {
  hintInterval = setInterval(showHintPopup, 60000);
}

function schedulePoop() {
  if (activeGame !== "bathroom") return;
  const delay = 2400 + Math.random() * 2600;
  poopTimer = setTimeout(() => {
    dropPoop();
    schedulePoop();
  }, delay);
}

function dropPoop() {
  const doll = dolls[Math.floor(Math.random() * dolls.length)];
  const rect = doll.getBoundingClientRect();
  const poop = document.createElement("button");
  const person = doll.dataset.person;
  poop.type = "button";
  poop.className = "poop";
  poop.setAttribute("aria-label", "Caca");
  poop.style.left = `${rect.left + rect.width / 2}px`;
  poop.style.top = `${rect.top + rect.height * 0.9}px`;

  doll.classList.add("strained");
  clearTimeout(doll._strainTimer);
  doll._strainTimer = setTimeout(() => doll.classList.remove("strained"), 1600);

  poop.addEventListener("pointerdown", (event) => event.stopPropagation());
  poop.addEventListener("click", () => {
    if (poop.classList.contains("collected")) return;
    poop.classList.add("collected");
    poopCounts[person] += 1;
    poopCountNodes[person].textContent = poopCounts[person];
    setTimeout(() => poop.remove(), 280);
  });

  scene.appendChild(poop);
  setTimeout(() => {
    if (!poop.classList.contains("collected")) poop.remove();
  }, 5200);
}


function setOutfit(person, outfit) {
  const doll = dolls.find((item) => item.dataset.person === person);
  if (!doll) return;

  doll.classList.toggle("outfit-normal", outfit === "normal");
  doll.classList.toggle("outfit-traditional", outfit === "traditional");
  doll.classList.toggle("outfit-clown", outfit === "clown");

  outfitButtons
    .filter((button) => button.dataset.person === person)
    .forEach((button) => {
      const isActive = button.dataset.outfit === outfit;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

  const center = doll.getBoundingClientRect();
  burst(center.left + center.width / 2, center.top + center.height / 2, person, 10);
}

function beginDrag(event, doll) {
  activeDoll = doll;
  pointer = {
    id: event.pointerId,
    offsetX: event.clientX - state.get(doll).x,
    offsetY: event.clientY - state.get(doll).y,
  };
  const item = state.get(doll);
  item.lastX = event.clientX;
  item.lastY = event.clientY;
  item.lastT = performance.now();
  item.vx = 0;
  item.vy = 0;
  doll.classList.add("dragging");
  doll.setPointerCapture(event.pointerId);
  speak(doll);
  placeAnimation(doll.dataset.person);
}

function moveDrag(event) {
  if (!activeDoll || event.pointerId !== pointer.id) return;
  const item = state.get(activeDoll);
  const now = performance.now();
  const dt = Math.max(16, now - item.lastT);
  item.x = event.clientX - pointer.offsetX;
  item.y = event.clientY - pointer.offsetY;
  item.vx = (event.clientX - item.lastX) / dt;
  item.vy = (event.clientY - item.lastY) / dt;
  item.r += item.vx * 2.4;
  item.lastX = event.clientX;
  item.lastY = event.clientY;
  item.lastT = now;
  updateDoll(activeDoll);
}

function endDrag(event) {
  if (!activeDoll || event.pointerId !== pointer.id) return;
  const item = state.get(activeDoll);
  item.vx *= 32;
  item.vy *= 32;
  item.vr += item.vx * 0.13;
  activeDoll.classList.remove("dragging");
  burst(event.clientX, event.clientY, activeDoll.dataset.person, 8);
  activeDoll = null;
  pointer = null;
}

function keepInBounds(item, doll) {
  const rect = doll.getBoundingClientRect();
  const limitX = innerWidth / 2 - rect.width / 2;
  const limitTop = -innerHeight / 2 + rect.height * 0.25;
  const limitBottom = innerHeight / 2 - rect.height / 2 - 20;

  if (item.x < -limitX) {
    item.x = -limitX;
    item.vx *= -0.42;
  }
  if (item.x > limitX) {
    item.x = limitX;
    item.vx *= -0.42;
  }
  if (item.y < limitTop) {
    item.y = limitTop;
    item.vy *= -0.35;
  }
  if (item.y > limitBottom) {
    item.y = limitBottom;
    item.vy *= -0.52;
    item.vx *= 0.92;
  }
}

function animate(time = 0) {
  const dt = Math.min(32, time - lastTime || 16) / 16.67;
  lastTime = time;

  dolls.forEach((doll) => {
    if (activeGame === "flags" || activeGame === "pictionary" || doll === activeDoll) return;
    const item = state.get(doll);
    item.vy += 0.28 * dt;
    item.x += item.vx * dt;
    item.y += item.vy * dt;
    item.r += item.vr * dt;
    item.vx *= 0.986;
    item.vy *= 0.986;
    item.vr *= 0.965;
    item.r += Math.sin(time / 720 + item.x) * 0.015;
    keepInBounds(item, doll);
    updateDoll(doll);
  });

  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles = particles.filter((p) => p.y < innerHeight + 30);
  particles.forEach((p) => {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 0.06 * dt;
    p.spin += 0.16 * dt;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.spin);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.62);
    ctx.restore();
  });

  requestAnimationFrame(animate);
}

dolls.forEach((doll) => {
  doll.addEventListener("pointerdown", (event) => {
    if (activeGame === "flags" || activeGame === "pictionary") return;
    event.preventDefault();
    beginDrag(event, doll);
  });

  doll.addEventListener("click", (event) => {
    burst(event.clientX, event.clientY, doll.dataset.person, 10);
  });

  doll.addEventListener("keydown", (event) => {
    const item = state.get(doll);
    if (event.key === "ArrowLeft") item.vx -= 6;
    if (event.key === "ArrowRight") item.vx += 6;
    if (event.key === "ArrowUp") item.vy -= 8;
    if (event.key === "ArrowDown") item.vy += 4;
    if (event.key === " ") speak(doll);
  });
});

outfitButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  button.addEventListener("pointerdown", (event) => event.stopPropagation());
  button.addEventListener("click", () => setOutfit(button.dataset.person, button.dataset.outfit));
});

mazeButtons.forEach((button) => {
  const moveFromButton = () => {
    moveMazePlayer(button.dataset.person, Number.parseInt(button.dataset.dc, 10), Number.parseInt(button.dataset.dr, 10));
  };
  button.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    event.preventDefault();
    moveFromButton();
    clearInterval(mazeHoldTimer);
    mazeHoldTimer = setInterval(moveFromButton, 170);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    button.addEventListener(eventName, () => clearInterval(mazeHoldTimer));
  });
});

[poopToggle, flagToggle, pictionaryToggle].forEach((button) => {
  button.addEventListener("pointerdown", (event) => event.stopPropagation());
});
poopToggle.addEventListener("click", () => setGame("bathroom"));
flagToggle.addEventListener("click", () => setGame("flags"));
pictionaryToggle.addEventListener("click", () => setGame("pictionary"));
skipTurn.addEventListener("click", nextPictionaryTurn);
timerButton.addEventListener("click", startMimeTimer);
correctGuess.addEventListener("click", awardPictionaryPoint);
nextTurn.addEventListener("click", nextPictionaryTurn);

window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);
window.addEventListener("keydown", handleMazeKey);
window.addEventListener("resize", () => {
  resizeCanvas();
  if (activeGame === "flags") requestAnimationFrame(placeMazePlayers);
  if (activeGame === "pictionary") requestAnimationFrame(placeCafePlayers);
});

resizeCanvas();
dolls.forEach(updateDoll);
startHintPopups();
requestAnimationFrame(animate);
