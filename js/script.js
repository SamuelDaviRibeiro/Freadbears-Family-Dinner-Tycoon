// Início das variáveis
let hour = 6;
let phase = "Manhã";
let day = 1;

let stats = {
  attractiveness: 0,
  fun: 0,
  service: 0,
  money: 0,
  paranoia: 0,
};

const timeDisplay = document.getElementById("hud-time");
const phaseDisplay = document.getElementById("hud-phase");
const advanceBtn = document.getElementById("advance-time");

advanceBtn.addEventListener("click", advanceTime);

function advanceTime() {
  hour += 1;

  if (hour >= 6 && hour < 12) {
    phase = "Manhã";
  } else if (hour >= 12 && hour < 22) {
    phase = "Tarde–Noite";
  } else if (hour >= 22 && hour < 24) {
    phase = "Noite Total";
  } else if (hour >= 24) {
    hour = 6;
    phase = "Manhã";
    day += 1;
    showNews();
  }

  updateHUD();
  triggerEvent();
}

function updateHUD() {
  timeDisplay.textContent = `${hour}:00`;
  phaseDisplay.textContent = phase;

  document.getElementById("hud-attractiveness").textContent = stats.attractiveness;
  document.getElementById("hud-fun").textContent = stats.fun;
  document.getElementById("hud-service").textContent = stats.service;
  document.getElementById("hud-money").textContent = stats.money;
  document.getElementById("hud-paranoia").textContent = stats.paranoia;
}

// Evento simples de jornal
function showNews() {
  const newspaper = document.getElementById("newspaper");
  const text = document.getElementById("news-text");

  const goodNews = ["Pizzaria elogiada por pais locais!", "Animações impressionam visitantes."];
  const badNews = ["Relatos de barulhos estranhos à noite...", "Problemas técnicos assustam clientes."];

  let chance = Math.random();
  if (stats.paranoia > 5 && chance > 0.4) {
    stats.paranoia += 1;
    text.textContent = badNews[Math.floor(Math.random() * badNews.length)];
  } else {
    stats.attractiveness += 1;
    text.textContent = goodNews[Math.floor(Math.random() * goodNews.length)];
  }

  newspaper.classList.remove("hidden");
  updateHUD();
}

function closeNewspaper() {
  document.getElementById("newspaper").classList.add("hidden");
}

function triggerEvent() {
  const title = document.getElementById("event-title");
  const desc = document.getElementById("event-description");

  if (phase === "Manhã") {
    title.textContent = "Construção e Limpeza";
    desc.innerHTML = "<p>Hora de arrumar e organizar a pizzaria.</p>";
  } else if (phase === "Tarde–Noite") {
    title.textContent = "Atendimento ao Público";
    desc.innerHTML = "<p>Clientes chegando! Prepare os animatrônicos e sirva pedidos.</p>";
  } else if (phase === "Noite Total") {
    title.textContent = "Manutenção";
    desc.innerHTML = "<p>Faça a limpeza e guarde os animatrônicos com cuidado.</p>";
  }
}
