const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações
const TILE_SIZE = 32;
const MAP_ROWS = 16;
const MAP_COLS = 16;
const SPEED = 2; // pixels por frame

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
  x: TILE_SIZE * 1,
  y: TILE_SIZE * 1,
  width: 24,
  height: 24,
  color: "deepskyblue",
  dx: 0,
  dy: 0
};

// Input
const keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Desenhar mapa
function drawMap() {
  for (let row = 0; row < MAP_ROWS; row++) {
    for (let col = 0; col < MAP_COLS; col++) {
      ctx.fillStyle = map[row][col] === 1 ? "#880000" : "#444";
      ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

// Colisão
function isWall(x, y) {
  const tileX = Math.floor(x / TILE_SIZE);
  const tileY = Math.floor(y / TILE_SIZE);
  return map[tileY]?.[tileX] === 1;
}

// Atualizar jogador
function updatePlayer() {
  player.dx = 0;
  player.dy = 0;

  if (keys["w"]) player.dy = -SPEED;
  if (keys["s"]) player.dy = SPEED;
  if (keys["a"]) player.dx = -SPEED;
  if (keys["d"]) player.dx = SPEED;

  const nextX = player.x + player.dx;
  const nextY = player.y + player.dy;

  // Colisão: checa os cantos do personagem
  const left = nextX;
  const right = nextX + player.width;
  const top = nextY;
  const bottom = nextY + player.height;

  if (!isWall(left, top) && !isWall(right, top) &&
      !isWall(left, bottom) && !isWall(right, bottom)) {
    player.x = nextX;
    player.y = nextY;
  }
}

// Desenhar jogador
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Loop do jogo
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  updatePlayer();
  drawPlayer();
  requestAnimationFrame(loop);
}

loop();
