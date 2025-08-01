const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 32;
const MAP_ROWS = 16;
const MAP_COLS = 16;

// Mapa: 0 = chão, 1 = parede
const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,0,1,1,1,0,0,1,1,0,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,0,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// Jogador
const player = {
  x: 1,
  y: 1,
  color: "deepskyblue",
};

// Desenhar o mapa
function drawMap() {
  for (let row = 0; row < MAP_ROWS; row++) {
    for (let col = 0; col < MAP_COLS; col++) {
      const tile = map[row][col];
      if (tile === 1) {
        ctx.fillStyle = "#880000"; // parede
      } else {
        ctx.fillStyle = "#444"; // chão
      }
      ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

// Desenhar o jogador
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(
    player.x * TILE_SIZE + 4,
    player.y * TILE_SIZE + 4,
    TILE_SIZE - 8,
    TILE_SIZE - 8
  );
}

// Lógica de movimento com colisão
function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (map[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
  }
}

// Controle via teclado
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      movePlayer(0, -1);
      break;
    case "s":
      movePlayer(0, 1);
      break;
    case "a":
      movePlayer(-1, 0);
      break;
    case "d":
      movePlayer(1, 0);
      break;
  }
  draw(); // redesenha tudo
});

// Redesenhar a tela
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPlayer();
}

draw(); // primeira vez
