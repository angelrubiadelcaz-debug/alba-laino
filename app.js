const scene = document.querySelector(".scene");
const dolls = [...document.querySelectorAll(".doll")];
const outfitButtons = [...document.querySelectorAll(".outfit-button")];
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
};

let activeDoll = null;
let pointer = null;
let particles = [];
let lastTime = 0;

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
  bubble.textContent = options[Math.floor(Math.random() * options.length)];
  doll.classList.add("talking", "popped");
  clearTimeout(doll._popTimer);
  doll._popTimer = setTimeout(() => doll.classList.remove("popped"), 520);
}

function burst(x, y, person, amount = 12) {
  const words =
    person === "blonde"
      ? ["Palencia", "Cristo", "FOMO", "Etruscos", "zzz", "♥"]
      : ["Aupa", "Kaixo", "Donosti", "Arte", "Pintxo", "♥"];
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

function placeAnimation(person) {
  const card = document.createElement("div");
  const isBlonde = person === "blonde";
  const options = references[person];
  const ref = options[Math.floor(Math.random() * options.length)];
  card.className = `place-flyby ${isBlonde ? "palencia" : "donosti"}`;
  card.innerHTML = `
    <span class="place-title">${ref.title}</span>
    <span class="place-icon ${ref.icon}" aria-hidden="true"></span>
    <span class="place-note">${ref.note}</span>
  `;
  scene.appendChild(card);
  setTimeout(() => card.remove(), 3200);
}

function setOutfit(person, outfit) {
  const doll = dolls.find((item) => item.dataset.person === person);
  if (!doll) return;

  doll.classList.toggle("outfit-normal", outfit === "normal");
  doll.classList.toggle("outfit-traditional", outfit === "traditional");

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
    if (doll === activeDoll) return;
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

window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);
window.addEventListener("resize", resizeCanvas);

resizeCanvas();
dolls.forEach(updateDoll);
requestAnimationFrame(animate);
