const scene = document.querySelector(".scene");
const dolls = [...document.querySelectorAll(".doll")];
const outfitButtons = [...document.querySelectorAll(".outfit-button")];
const playerToggles = [...document.querySelectorAll(".player-toggle")];
const mazeButtons = [...document.querySelectorAll(".maze-pad button")];
const poopToggle = document.querySelector("#poopToggle");
const flagToggle = document.querySelector("#flagToggle");
const pictionaryToggle = document.querySelector("#pictionaryToggle");
const tortillaToggle = document.querySelector("#tortillaToggle");
const mazeBoard = document.querySelector("#mazeBoard");
const mazeStatus = document.querySelector("#mazeStatus");
const caption = document.querySelector(".caption");
const pictionaryPanel = document.querySelector(".pictionary-panel");
const tortillaPanel = document.querySelector(".tortilla-panel");
const tortillaRules = document.querySelector(".tortilla-rules");
const tortillaArt = document.querySelector(".tortilla-stage-art");
const admin = document.querySelector(".angel-admin");
const adminBubble = document.querySelector(".admin-bubble");
const adminRules = document.querySelector("#adminRules");
const adminChaos = document.querySelector("#adminChaos");
const adminShine = document.querySelector("#adminShine");
const turnName = document.querySelector("#turnName");
const turnPrompt = document.querySelector("#turnPrompt");
const turnSubtitle = document.querySelector("#turnSubtitle");
const skipTurn = document.querySelector("#skipTurn");
const timerButton = document.querySelector("#timerButton");
const correctGuess = document.querySelector("#correctGuess");
const nextTurn = document.querySelector("#nextTurn");
const tortillaTurn = document.querySelector("#tortillaTurn");
const tortillaClock = document.querySelector("#tortillaClock");
const tortillaTarget = document.querySelector("#tortillaTarget");
const tortillaStatus = document.querySelector("#tortillaStatus");
const tortillaStart = document.querySelector("#tortillaStart");
const tortillaReset = document.querySelector("#tortillaReset");
const poopCountNodes = {
  blonde: document.querySelector("#poopCountAlba"),
  brunette: document.querySelector("#poopCountLaino"),
  niya: document.querySelector("#poopCountNiya"),
  emma: document.querySelector("#poopCountEmma"),
  mila: document.querySelector("#poopCountMila"),
};
const flagCountNodes = {
  blonde: document.querySelector("#flagCountAlba"),
  brunette: document.querySelector("#flagCountLaino"),
  niya: document.querySelector("#flagCountNiya"),
  emma: document.querySelector("#flagCountEmma"),
  mila: document.querySelector("#flagCountMila"),
};
const pictionaryScoreNodes = {
  blonde: document.querySelector("#scoreAlba"),
  brunette: document.querySelector("#scoreLaino"),
  niya: document.querySelector("#scoreNiya"),
  emma: document.querySelector("#scoreEmma"),
  mila: document.querySelector("#scoreMila"),
};
const tortillaScoreNodes = {
  blonde: document.querySelector("#tortillaScoreAlba"),
  brunette: document.querySelector("#tortillaScoreLaino"),
  niya: document.querySelector("#tortillaScoreNiya"),
  emma: document.querySelector("#tortillaScoreEmma"),
  mila: document.querySelector("#tortillaScoreMila"),
};
const tortillaTryNodes = {
  blonde: document.querySelector("#tortillaTryAlba"),
  brunette: document.querySelector("#tortillaTryLaino"),
  niya: document.querySelector("#tortillaTryNiya"),
  emma: document.querySelector("#tortillaTryEmma"),
  mila: document.querySelector("#tortillaTryMila"),
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
  emma: [
    "I love ladybugs",
    "Mimimimimi",
    "Che cute",
  ],
  mila: [
    "Joj, kakav cirkus",
    "Volleyball queen",
    "Theatre kid",
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
  emma: [
    { title: "Brunei", icon: "brunei-icon", note: "pink traditional mode" },
    { title: "Ladybugs", icon: "ladybug-icon", note: "I love ladybugs" },
    { title: "Che cute", icon: "sun-icon", note: "soft chaos" },
  ],
  mila: [
    { title: "Bosnia", icon: "bosnia-icon", note: "joj, kakav cirkus" },
    { title: "Volleyball", icon: "volley-icon", note: "serve, set, drama" },
    { title: "Theatre kid", icon: "frame-icon", note: "stage presence" },
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
  emma: 0,
  mila: 0,
};
const flagCounts = {
  blonde: 0,
  brunette: 0,
  niya: 0,
  emma: 0,
  mila: 0,
};
let poopTimer = 0;
let audioContext = null;
let hintCount = 0;
let hintInterval = null;
let hintTimer = null;
let currentTurnIndex = 0;
let mimeTimer = null;
let mimeTimeLeft = 60;
let tortillaTimer = null;
let tortillaStartTime = 0;
let tortillaElapsed = 0;
let tortillaRunning = false;
let tortillaTurnIndex = 0;
let tortillaRulesTimer = null;
let adminTimer = null;
let adminChaosTimer = null;
const people = [
  { person: "blonde", name: "Alba" },
  { person: "brunette", name: "Laino" },
  { person: "niya", name: "Niya" },
  { person: "emma", name: "Emma" },
  { person: "mila", name: "Mila" },
];
const activePeople = new Set(people.map((person) => person.person));
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
  emma: 0,
  mila: 0,
};
const tortillaScores = {
  blonde: 0,
  brunette: 0,
  niya: 0,
  emma: 0,
  mila: 0,
};
const tortillaAttempts = {};
const adminRulesText = {
  free: "Modo libre: tocad caras, moved muñecos y no rompáis mi sistema.",
  bathroom: "Baño: si cae una caca, se pulsa rápido. Caca no pulsada, caca perdida.",
  flags: "Laberinto: cada una sale por la salida. Si se chocan, vuelta al inicio. Justicia geométrica.",
  pictionary: "Mimica: una actúa sin hablar, las demás adivinan. El temporizador castiga.",
  tortilla: "Tortilla: Start, contar hasta 8.00 y girar. La más cercana gana. Ciencia española.",
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
const mazeStartCells = [
  { col: 1, row: 1 },
  { col: 1, row: 9 },
  { col: 1, row: 5 },
  { col: 3, row: 3 },
  { col: 3, row: 7 },
];

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

function getActivePeople() {
  return people.filter((person) => activePeople.has(person.person));
}

function getActiveDolls() {
  return dolls.filter((doll) => activePeople.has(doll.dataset.person));
}

function getPersonName(person) {
  return people.find((item) => item.person === person)?.name || person;
}

function getDoll(person) {
  return dolls.find((item) => item.dataset.person === person);
}

function refreshActivePlayers() {
  const enabled = getActivePeople();
  if (enabled.length === 0) {
    activePeople.add("blonde");
  }

  dolls.forEach((doll) => {
    const active = activePeople.has(doll.dataset.person);
    doll.classList.toggle("inactive-player", !active);
    doll.setAttribute("aria-hidden", String(!active));
  });

  playerToggles.forEach((button) => {
    const active = activePeople.has(button.dataset.person);
    button.classList.toggle("active", active);
    button.textContent = active ? "ON" : "OFF";
    button.setAttribute("aria-pressed", String(active));
  });

  outfitButtons.forEach((button) => {
    button.disabled = !activePeople.has(button.dataset.person);
  });

  mazeButtons.forEach((button) => {
    button.closest(".maze-pad").classList.toggle("inactive-score", !activePeople.has(button.dataset.person));
  });

  [poopCountNodes, flagCountNodes, pictionaryScoreNodes, tortillaScoreNodes].forEach((group) => {
    Object.entries(group).forEach(([person, node]) => {
      node?.parentElement?.classList.toggle("inactive-score", !activePeople.has(person));
    });
  });

  Object.entries(tortillaTryNodes).forEach(([person, node]) => {
    node?.parentElement?.classList.toggle("inactive-score", !activePeople.has(person));
  });

  if (activeGame === "flags") {
    buildMaze();
    requestAnimationFrame(placeMazePlayers);
  }
  if (activeGame === "pictionary") updatePictionaryTurn();
  if (activeGame === "tortilla") {
    Object.keys(tortillaAttempts).forEach((key) => {
      if (!activePeople.has(key)) delete tortillaAttempts[key];
    });
    updateTortillaTurn();
    requestAnimationFrame(placeTortillaPlayers);
  }
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

function adminSay(text, duration = 3600) {
  adminBubble.textContent = text;
  admin.classList.add("talking");
  clearTimeout(adminTimer);
  adminTimer = setTimeout(() => admin.classList.remove("talking"), duration);
}

function adminExplainGame(game = activeGame) {
  adminSay(adminRulesText[game || "free"], 5200);
}

function adminShineBurst() {
  admin.classList.remove("shining");
  void admin.offsetWidth;
  admin.classList.add("shining");
  const rect = admin.getBoundingClientRect();
  burst(rect.left + rect.width * 0.46, rect.top + rect.height * 0.28, "brunette", 14);
  adminSay("Brillo administrativo activado.", 2800);
}

function adminChaosMode() {
  const stage = document.querySelector(".stage");
  const isActive = stage.classList.contains("admin-party");
  clearTimeout(adminChaosTimer);
  if (isActive) {
    stage.classList.remove("admin-party");
    admin.classList.remove("commanding");
    adminChaos.classList.remove("active");
    adminSay("Fiesta cancelada por orden del Pelón.", 2600);
    return;
  }

  stage.classList.add("admin-party");
  admin.classList.add("commanding");
  adminChaos.classList.add("active");
  adminSay("Fiesta activada. Pulsa Fiesta otra vez para pararla.", 3600);
  getActiveDolls().forEach((doll, index) => {
    setTimeout(() => {
      const outfits = ["normal", "traditional", "clown", "carnival"];
      setOutfit(doll.dataset.person, outfits[Math.floor(Math.random() * outfits.length)]);
      sayText(doll, lines[doll.dataset.person][Math.floor(Math.random() * lines[doll.dataset.person].length)], 1200);
    }, index * 180);
  });
  adminChaosTimer = setTimeout(() => {
    stage.classList.remove("admin-party");
    admin.classList.remove("commanding");
    adminChaos.classList.remove("active");
    adminSay("Fiesta archivada. Vuelve la autoridad.", 2600);
  }, 10000);
}

function burst(x, y, person, amount = 12) {
  const words =
    person === "blonde"
      ? ["Palencia", "Cristo", "FOMO", "Etruscos", "zzz", "♥"]
      : person === "brunette"
        ? ["Aupa", "Kaixo", "Donosti", "Arte", "Pintxo", "♥"]
        : person === "niya"
          ? ["Niya", "Bulgaria", "Sofia", "Rila", "Banitsa", "♥"]
          : person === "emma"
            ? ["Emma", "Brunei", "Ladybugs", "Cute", "Pink", "♥"]
            : ["Mila", "Bosnia", "Volley", "Theatre", "Cirkus", "♥"];
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
  const melodies = {
    blonde: [523.25, 659.25, 783.99, 1046.5, 880, 1046.5],
    brunette: [392, 493.88, 587.33, 783.99, 659.25, 783.99],
    niya: [440, 554.37, 659.25, 830.61, 739.99, 987.77],
    emma: [493.88, 587.33, 739.99, 880, 987.77, 880],
    mila: [349.23, 440, 523.25, 698.46, 659.25, 783.99],
  };
  const bassNotes = {
    blonde: [130.81, 196],
    brunette: [98, 146.83],
    niya: [116.54, 174.61],
    emma: [123.47, 185],
    mila: [110, 164.81],
  };
  const notes = melodies[person] || melodies.blonde;

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
  bass.frequency.setValueAtTime(bassNotes[person]?.[0] || 130.81, now);
  bass.frequency.exponentialRampToValueAtTime(bassNotes[person]?.[1] || 196, now + 0.8);
  bassGain.gain.setValueAtTime(0.055, now);
  bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);
  bass.connect(bassGain).connect(audioContext.destination);
  bass.start(now);
  bass.stop(now + 1.18);
}

function showVictoryJumpscare(person) {
  const winner = getDoll(person);
  const overlay = document.createElement("div");
  const clone = winner.cloneNode(true);
  const wordMap = {
    blonde: ["YUPI", "PALENCIA", "ETRUSCOS", "FOMO", "ALBA"],
    brunette: ["YUPI", "DONOSTI", "ARTE", "KAIXO", "LAINO"],
    niya: ["YUPI", "NIYA", "BULGARIA", "SOFIA", "BANITSA"],
    emma: ["YUPI", "EMMA", "BRUNEI", "LADYBUGS", "CHE CUTE"],
    mila: ["YUPI", "MILA", "BOSNIA", "VOLLEY", "THEATRE"],
  };
  const words = wordMap[person] || wordMap.blonde;

  overlay.className = `victory-jumpscare ${person}`;
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
  card.className = `place-flyby ${isBlonde ? "palencia" : person === "brunette" ? "donosti" : person}`;
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
  dolls.forEach((doll) => doll.classList.remove("strained", "maze-step", "maze-winner", "maze-loser", "maze-caught", "pictionary-turn", "tortilla-turn"));
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
  const active = getActivePeople();
  mazeBoard.innerHTML = "";
  mazeBoard.setAttribute("aria-hidden", "false");
  mazeStatus.textContent = `Nivel ${currentMazeIndex + 1} · ${active.length} jugador${active.length === 1 ? "" : "as"}`;
  mazeBoard.style.setProperty("--maze-cols", grid[0].length);
  mazeBoard.style.setProperty("--maze-rows", grid.length);
  grid.forEach((row, rowIndex) => {
    [...row].forEach((cell, colIndex) => {
      const tile = document.createElement("span");
      tile.className = "maze-cell";
      if (cell === "#") tile.classList.add("wall");
      if (cell === "E") tile.classList.add("exit");
      active.forEach((player, index) => {
        const start = mazeStartCells[index % mazeStartCells.length];
        if (start.col === colIndex && start.row === rowIndex) tile.classList.add("start", player.person);
      });
      tile.style.gridColumn = colIndex + 1;
      tile.style.gridRow = rowIndex + 1;
      mazeBoard.appendChild(tile);
    });
  });
}

function placeMazePlayers() {
  mazeRoundLocked = false;
  dolls.forEach((doll) => doll.classList.remove("maze-step", "maze-winner", "maze-loser", "maze-caught"));
  Object.keys(mazePlayers).forEach((person) => delete mazePlayers[person]);
  getActivePeople().forEach((person, index) => {
    const start = mazeStartCells[index % mazeStartCells.length];
    mazePlayers[person.person] = { col: start.col, row: start.row, done: false };
    updateMazeDoll(person.person);
  });
}

function resetMazeAfterCatch() {
  mazeRoundLocked = true;
  getActivePeople().forEach((person, index) => {
    const start = mazeStartCells[index % mazeStartCells.length];
    mazePlayers[person.person] = { col: start.col, row: start.row, done: false };
    updateMazeDoll(person.person);
  });
  getActiveDolls().forEach((doll) => {
    doll.classList.remove("maze-step");
    doll.classList.add("maze-caught");
  });
  const catchLines = {
    blonde: "Odio la tecnologia",
    brunette: "Laguntza",
    niya: "Pomognete",
    emma: "Mimimimimi",
    mila: "Joj, kakav cirkus",
  };
  getActiveDolls().forEach((doll) => sayText(doll, catchLines[doll.dataset.person] || "Me cago", 3600));
  setTimeout(() => {
    if (activeGame !== "flags") return;
    dolls.forEach((doll) => doll.classList.remove("maze-caught"));
    mazeRoundLocked = false;
  }, 900);
}

function updateMazeDoll(person, step = false, dc = 0) {
  const doll = getDoll(person);
  const player = mazePlayers[person];
  if (!doll || !player) return;
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
  const idleRotation = { blonde: -4, brunette: 4, niya: 0, emma: -2, mila: 3 };
  item.r = dc === 0 ? (idleRotation[person] || 0) : dc * 7;
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
  if (!player || player.done || !activePeople.has(person)) return;
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
    adminSay(`${getPersonName(person)} sale del laberinto. Fuga legal.`, 3600);
    const doll = getDoll(person);
    const losers = getActiveDolls().filter((item) => item.dataset.person !== person);
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
    t: ["emma", 0, -1],
    f: ["emma", -1, 0],
    g: ["emma", 0, 1],
    h: ["emma", 1, 0],
    y: ["mila", 0, -1],
    b: ["mila", -1, 0],
    n: ["mila", 0, 1],
    m: ["mila", 1, 0],
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
  const isTortilla = activeGame === "tortilla";

  document.querySelector(".stage").classList.toggle("bathroom-mode", isBathroom);
  document.querySelector(".stage").classList.toggle("flag-mode", isFlags);
  document.querySelector(".stage").classList.toggle("pictionary-mode", isPictionary);
  document.querySelector(".stage").classList.toggle("tortilla-mode", isTortilla);
  poopToggle.classList.toggle("active", isBathroom);
  flagToggle.classList.toggle("active", isFlags);
  pictionaryToggle.classList.toggle("active", isPictionary);
  tortillaToggle.classList.toggle("active", isTortilla);
  poopToggle.setAttribute("aria-pressed", String(isBathroom));
  flagToggle.setAttribute("aria-pressed", String(isFlags));
  pictionaryToggle.setAttribute("aria-pressed", String(isPictionary));
  tortillaToggle.setAttribute("aria-pressed", String(isTortilla));
  pictionaryPanel.hidden = !isPictionary;
  tortillaPanel.hidden = !isTortilla;
  poopToggle.textContent = isBathroom ? "Baño activo" : "Baño";
  flagToggle.textContent = isFlags ? "Laberinto activo" : "Laberinto";
  pictionaryToggle.textContent = isPictionary ? "Mimica activa" : "Mimica";
  tortillaToggle.textContent = isTortilla ? "Tortilla activa" : "Tortilla";

  clearTimeout(poopTimer);
  clearInterval(mazeHoldTimer);
  clearMimeTimer();
  clearTortillaTimer();
  clearTimeout(tortillaRulesTimer);
  clearGameObjects();
  clearTimeout(adminChaosTimer);
  document.querySelector(".stage").classList.remove("admin-party");
  admin.classList.remove("commanding");
  adminChaos.classList.remove("active");

  if (isBathroom) {
    schedulePoop();
    adminExplainGame("bathroom");
  }
  if (isFlags) {
    buildMaze();
    requestAnimationFrame(placeMazePlayers);
    adminExplainGame("flags");
  }
  if (isPictionary) {
    updatePictionaryTurn();
    requestAnimationFrame(placeCafePlayers);
    adminExplainGame("pictionary");
  }
  if (isTortilla) {
    tortillaRules.open = true;
    tortillaRulesTimer = setTimeout(() => {
      if (activeGame === "tortilla") tortillaRules.open = false;
    }, 15000);
    updateTortillaTurn();
    requestAnimationFrame(placeTortillaPlayers);
    adminExplainGame("tortilla");
  }
  if (!activeGame) adminExplainGame("free");
}

function getLinePositions(active, mobile, baseY, spread) {
  const count = active.length;
  const gap = mobile ? Math.min(72, 260 / Math.max(1, count - 1)) : spread;
  return active.reduce((positions, player, index) => {
    const x = (index - (count - 1) / 2) * gap;
    positions[player.person] = {
      x,
      y: baseY + (index % 2 ? -10 : 8),
      r: (index - (count - 1) / 2) * 2.5,
    };
    return positions;
  }, {});
}

function placeCafePlayers() {
  const mobile = innerWidth < 520;
  const positions = getLinePositions(getActivePeople(), mobile, mobile ? 154 : 106, mobile ? 78 : 132);

  getActiveDolls().forEach((doll) => {
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

function placeTortillaPlayers() {
  const mobile = innerWidth < 520;
  const positions = getLinePositions(getActivePeople(), mobile, mobile ? 150 : 106, mobile ? 76 : 128);

  getActiveDolls().forEach((doll) => {
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
  const active = getActivePeople();
  const player = active[currentTurnIndex % active.length];
  const prompt = pictionaryPrompts[currentTurnIndex % pictionaryPrompts.length];
  turnName.textContent = `Turno de ${player.name}`;
  turnPrompt.textContent = prompt.es;
  turnSubtitle.textContent = prompt.en;
  turnSubtitle.hidden = !["niya", "emma", "mila"].includes(player.person);
  dolls.forEach((doll) => doll.classList.toggle("pictionary-turn", doll.dataset.person === player.person));
  sayText(getDoll(player.person), "Me toca", 1400);
}

function nextPictionaryTurn() {
  clearMimeTimer();
  currentTurnIndex += 1;
  updatePictionaryTurn();
}

function awardPictionaryPoint() {
  clearMimeTimer();
  const active = getActivePeople();
  const player = active[currentTurnIndex % active.length];
  pictionaryScores[player.person] += 1;
  pictionaryScoreNodes[player.person].textContent = pictionaryScores[player.person];
  const doll = getDoll(player.person);
  const rect = doll.getBoundingClientRect();
  sayText(doll, "Yupi", 1200);
  adminSay(`Punto para ${player.name}. Interpretación aceptada por la administración.`, 3400);
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

    const active = getActivePeople();
    const player = active[currentTurnIndex % active.length];
    const doll = getDoll(player.person);
  pictionaryScores[player.person] -= 1;
  pictionaryScoreNodes[player.person].textContent = pictionaryScores[player.person];
  adminSay(`${player.name} pierde un punto. El reloj no perdona.`, 3200);
  sayText(doll, "Me cago", 1200);
    nextPictionaryTurn();
  }, 1000);
  updateTimerButton();
}

function updateTortillaTurn() {
  const active = getActivePeople();
  const player = active[tortillaTurnIndex % active.length];
  tortillaTurn.textContent = `Turno de ${player.name}`;
  tortillaClock.textContent = tortillaElapsed.toFixed(2);
  tortillaStatus.textContent = `Le toca a ${player.name}. Pulsa Start y espera al 8.00.`;
  tortillaArt.classList.remove("cooking", "almost", "flipped", "perfect", "missed");
  dolls.forEach((doll) => doll.classList.toggle("tortilla-turn", doll.dataset.person === player.person));
}

function clearTortillaTimer() {
  clearInterval(tortillaTimer);
  tortillaTimer = null;
  tortillaRunning = false;
  tortillaStart.classList.remove("running");
  tortillaArt.classList.remove("cooking", "almost");
}

function startTortillaTurn() {
  if (activeGame !== "tortilla" || tortillaRunning) return;
  tortillaElapsed = 0;
  tortillaClock.textContent = "0.00";
  tortillaStatus.textContent = "Ahora: toca la tortilla o Espacio justo en 8.00.";
  tortillaRunning = true;
  tortillaStart.classList.add("running");
  tortillaStartTime = performance.now();
  tortillaTarget.classList.remove("flipped");
  tortillaArt.classList.remove("flipped", "perfect", "missed");
  tortillaArt.classList.add("cooking");
  tortillaTimer = setInterval(() => {
    tortillaElapsed = (performance.now() - tortillaStartTime) / 1000;
    tortillaClock.textContent = tortillaElapsed.toFixed(2);
    tortillaArt.classList.toggle("almost", tortillaElapsed >= 6.75 && tortillaElapsed <= 8.35);
  }, 24);
}

function stopTortillaTurn() {
  if (activeGame !== "tortilla" || !tortillaRunning) return;
  clearTortillaTimer();
  tortillaElapsed = (performance.now() - tortillaStartTime) / 1000;
  const active = getActivePeople();
  const player = active[tortillaTurnIndex % active.length];
  const diff = Math.abs(tortillaElapsed - 8);
  tortillaAttempts[player.person] = diff;
  tortillaTryNodes[player.person].textContent = `${diff.toFixed(2)}s`;
  tortillaClock.textContent = tortillaElapsed.toFixed(2);
  tortillaStatus.textContent = `${player.name}: ${diff.toFixed(2)}s de diferencia. Cuanto mas cerca de 0, mejor.`;
  tortillaTarget.classList.add("flipped");
  tortillaArt.classList.remove("cooking", "almost", "perfect", "missed");
  tortillaArt.classList.add("flipped", diff < 0.25 ? "perfect" : "missed");
  setTimeout(() => tortillaArt.classList.remove("flipped", "perfect", "missed"), 1200);
  sayText(getDoll(player.person), diff < 0.25 ? "Yupi" : "Me cago", 1100);

  tortillaTurnIndex += 1;
  if (Object.keys(tortillaAttempts).filter((person) => activePeople.has(person)).length >= active.length) {
    finishTortillaRound();
    return;
  }
  setTimeout(updateTortillaTurn, 650);
}

function finishTortillaRound() {
  const [winnerPerson, bestDiff] = Object.entries(tortillaAttempts)
    .filter(([person]) => activePeople.has(person))
    .sort((a, b) => a[1] - b[1])[0];
  const winner = people.find((item) => item.person === winnerPerson);
  tortillaScores[winnerPerson] += 1;
  tortillaScoreNodes[winnerPerson].textContent = tortillaScores[winnerPerson];
  tortillaStatus.textContent = `Gana ${winner.name}: ${bestDiff.toFixed(2)}s de diferencia`;
  adminSay(`${winner.name} gana la tortilla. La calva arbitral lo confirma.`, 3800);
  sayText(getDoll(winnerPerson), "Yupi", 1300);
  setTimeout(() => {
    Object.keys(tortillaAttempts).forEach((key) => delete tortillaAttempts[key]);
    Object.values(tortillaTryNodes).forEach((node) => { node.textContent = "-"; });
    tortillaElapsed = 0;
    tortillaClock.textContent = "0.00";
    tortillaTurnIndex %= getActivePeople().length;
    updateTortillaTurn();
  }, 2600);
}

function resetTortillaGame() {
  clearTortillaTimer();
  tortillaTurnIndex = 0;
  tortillaElapsed = 0;
  Object.keys(tortillaAttempts).forEach((key) => delete tortillaAttempts[key]);
  Object.keys(tortillaScores).forEach((person) => {
    tortillaScores[person] = 0;
    tortillaScoreNodes[person].textContent = "0";
    tortillaTryNodes[person].textContent = "-";
  });
  tortillaClock.textContent = "0.00";
  tortillaStatus.textContent = "Pulsa Start para calentar la sartén.";
  tortillaArt.classList.remove("cooking", "almost", "flipped", "perfect", "missed");
  updateTortillaTurn();
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
  const activeDolls = getActiveDolls();
  const doll = activeDolls[Math.floor(Math.random() * activeDolls.length)];
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
    if (poopCounts[person] % 3 === 0) adminSay(`${getPersonName(person)} lleva ${poopCounts[person]} cacas. Dato administrativo.`, 3000);
    setTimeout(() => poop.remove(), 280);
  });

  scene.appendChild(poop);
  setTimeout(() => {
    if (!poop.classList.contains("collected")) poop.remove();
  }, 5200);
}


function setOutfit(person, outfit) {
  const doll = getDoll(person);
  if (!doll) return;

  doll.classList.toggle("outfit-normal", outfit === "normal");
  doll.classList.toggle("outfit-traditional", outfit === "traditional");
  doll.classList.toggle("outfit-clown", outfit === "clown");
  doll.classList.toggle("outfit-carnival", outfit === "carnival");

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
  if (!activePeople.has(doll.dataset.person)) return;
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
    if (!activePeople.has(doll.dataset.person) || activeGame === "flags" || activeGame === "pictionary" || activeGame === "tortilla" || doll === activeDoll) return;
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
    if (!activePeople.has(doll.dataset.person) || activeGame === "flags" || activeGame === "pictionary" || activeGame === "tortilla") return;
    event.preventDefault();
    beginDrag(event, doll);
  });

  doll.addEventListener("click", (event) => {
    if (!activePeople.has(doll.dataset.person)) return;
    burst(event.clientX, event.clientY, doll.dataset.person, 10);
  });

  doll.addEventListener("keydown", (event) => {
    if (!activePeople.has(doll.dataset.person)) return;
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

playerToggles.forEach((button) => {
  button.addEventListener("pointerdown", (event) => event.stopPropagation());
  button.addEventListener("click", () => {
    const person = button.dataset.person;
    if (activePeople.has(person) && activePeople.size === 1) {
      sayText(getDoll(person), "Tiene que jugar alguien", 1200);
      return;
    }
    if (activePeople.has(person)) activePeople.delete(person);
    else activePeople.add(person);
    refreshActivePlayers();
  });
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

[poopToggle, flagToggle, pictionaryToggle, tortillaToggle].forEach((button) => {
  button.addEventListener("pointerdown", (event) => event.stopPropagation());
});
adminRules.addEventListener("pointerdown", (event) => event.stopPropagation());
adminChaos.addEventListener("pointerdown", (event) => event.stopPropagation());
adminShine.addEventListener("pointerdown", (event) => event.stopPropagation());
poopToggle.addEventListener("click", () => setGame("bathroom"));
flagToggle.addEventListener("click", () => setGame("flags"));
pictionaryToggle.addEventListener("click", () => setGame("pictionary"));
tortillaToggle.addEventListener("click", () => setGame("tortilla"));
adminRules.addEventListener("click", () => adminExplainGame());
adminChaos.addEventListener("click", adminChaosMode);
adminShine.addEventListener("click", adminShineBurst);
skipTurn.addEventListener("click", nextPictionaryTurn);
timerButton.addEventListener("click", startMimeTimer);
correctGuess.addEventListener("click", awardPictionaryPoint);
nextTurn.addEventListener("click", nextPictionaryTurn);
tortillaStart.addEventListener("click", startTortillaTurn);
tortillaReset.addEventListener("click", resetTortillaGame);
tortillaTarget.addEventListener("click", stopTortillaTurn);

window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);
window.addEventListener("keydown", handleMazeKey);
window.addEventListener("keydown", (event) => {
  if (activeGame !== "tortilla" || event.code !== "Space") return;
  event.preventDefault();
  stopTortillaTurn();
});
window.addEventListener("resize", () => {
  resizeCanvas();
  if (activeGame === "flags") requestAnimationFrame(placeMazePlayers);
  if (activeGame === "pictionary") requestAnimationFrame(placeCafePlayers);
  if (activeGame === "tortilla") requestAnimationFrame(placeTortillaPlayers);
});

resizeCanvas();
dolls.forEach(updateDoll);
refreshActivePlayers();
adminSay("Ángel Pelón preparado. Nadie toca producción sin supervisión.", 3600);
startHintPopups();
requestAnimationFrame(animate);
