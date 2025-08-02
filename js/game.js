// Configuração básica
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const TILE = 32;
  const COLS = canvas.width / TILE;
  const ROWS = canvas.height / TILE;

  // Carregar sprites
  const sprites = {};
  ['william', 'chair', 'table'].forEach(name => {
    const img = new Image();
    img.src = `assets/sprites/${name}.png`;
    sprites[name] = img;
  });

  // Carregar tile de chão
  const floorImg = new Image();
  floorImg.src = 'assets/tiles/floor.png';
  sprites['floor'] = floorImg;

  // Estado do player na grid
  const player = { x: 5, y: 5 };
  const keys = {};
  document.addEventListener('keydown', e => { keys[e.key] = true; });
  document.addEventListener('keyup', e => { keys[e.key] = false; });

  function update() {
    if (keys['ArrowUp'])    player.y -= 1;
    if (keys['ArrowDown'])  player.y += 1;
    if (keys['ArrowLeft'])  player.x -= 1;
    if (keys['ArrowRight']) player.x += 1;
    player.x = Math.max(0, Math.min(COLS - 1, player.x));
    player.y = Math.max(0, Math.min(ROWS - 1, player.y));
  }

  function drawFloor() {
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        ctx.drawImage(sprites['floor'], i * TILE, j * TILE, TILE, TILE);
      }
    }
  }

  function drawObjects() {
    // Coordenadas
    const chairY = 6 * TILE;
    const tableX = 8 * TILE;
    const tableY = chairY - TILE / 2;
    const tableW = TILE * 2;
    const tableH = TILE;

    // 1) Desenha metade superior da mesa
    ctx.drawImage(
      sprites['table'],
      0, 0,
      tableW, tableH / 2,
      tableX, tableY,
      tableW, tableH / 2
    );

    // 2) Desenha cadeiras atrás
    [8, 9].forEach(col => {
      ctx.drawImage(sprites['chair'], col * TILE, chairY, TILE, TILE);
    });

    // 3) Desenha metade inferior da mesa por cima
    ctx.drawImage(
      sprites['table'],
      0, tableH / 2,
      tableW, tableH / 2,
      tableX, tableY + tableH / 2,
      tableW, tableH / 2
    );
  }

  function drawPlayer() {
    ctx.drawImage(
      sprites['william'],
      player.x * TILE,
      player.y * TILE,
      TILE,
      TILE
    );
  }

  // Inicia após carregar todas as imagens
  Promise.all(
    Object.values(sprites).map(img => new Promise(res => {
      if (img.complete && img.naturalWidth) return res();
      img.onload = () => res();
      img.onerror = () => console.error(`Falha ao carregar: ${img.src}`);
    }))
  ).then(() => {
    console.log('Sprites carregadas, iniciando loop');
    requestAnimationFrame(loop);
  });

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawFloor();
    drawObjects();
    drawPlayer();
    requestAnimationFrame(loop);
  }
});
