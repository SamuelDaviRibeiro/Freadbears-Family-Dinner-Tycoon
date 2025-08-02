// Configuração básica
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE = 32;
const COLS = canvas.width / TILE;
const ROWS = canvas.height / TILE;

// Carregar imagens
const sprites = {};
['player', 'chair', 'table', 'floor-black', 'floor-white'].forEach(name => {
  const img = new Image();
  img.src = `assets/${name.includes('floor') ? 'tiles' : 'sprites'}/${name}.png`;
  sprites[name] = img;
});

// Player
const player = { x: 5, y: 5, size: TILE };
const keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function update() {
  if (keys['ArrowUp']) player.y -= 1;
  if (keys['ArrowDown']) player.y += 1;
  if (keys['ArrowLeft']) player.x -= 1;
  if (keys['ArrowRight']) player.x += 1;
  player.x = Math.max(0, Math.min(COLS-1, player.x));
  player.y = Math.max(0, Math.min(ROWS-1, player.y));
}

function drawFloor() {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const tile = (i + j) % 2 === 0 ? 'floor-white' : 'floor-black';
      ctx.drawImage(sprites[tile], i * TILE, j * TILE, TILE, TILE);
    }
  }
}

function drawObjects() {
  // Exemplo de cadeiras e mesas fixas
  ctx.drawImage(sprites['chair'], 8 * TILE, 5 * TILE, TILE, TILE);
  ctx.drawImage(sprites['table'], 9 * TILE, 5 * TILE, TILE, TILE);
}

function drawPlayer() {
  ctx.drawImage(sprites['player'], player.x * TILE, player.y * TILE, TILE, TILE);
}

function loop() {
  update();
  drawFloor();
  drawObjects();
  drawPlayer();
  requestAnimationFrame(loop);
}

// Esperar carregamento das sprites
window.onload = () => loop();
