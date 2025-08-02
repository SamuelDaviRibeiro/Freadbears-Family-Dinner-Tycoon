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

  // Carregar tile único de chão
  const floorImg = new Image();
  floorImg.src = 'assets/tiles/floor.png';
  sprites['floor'] = floorImg;

  // Estado do player na grid
  const player = { x: 5, y: 5 };
  const keys = {};
  document.addEventListener('keydown', e => keys[e.key] = true);
  document.addEventListener('keyup', e => keys[e.key] = false);

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
  // Coordenadas e dimensões
  const chairY = 6 * TILE;
  const tableX = 8 * TILE;
  const tableY = chairY - TILE / 2;
  const tableW = TILE * 2;
  const tableH = TILE;

  // 1) Desenha top half (superior) da mesa
  ctx.drawImage(
    sprites['table'],
    0, 0,                 // sx, sy da imagem
    tableW, tableH / 2,   // sw, sh para top half
    tableX, tableY,       // dx, dy
    tableW, tableH / 2    // dw, dh
  );

  // 2) Desenha cadeiras atrás (fill gap)
  [8, 9].forEach(col => {
    ctx.drawImage(sprites['chair'], col * TILE, chairY, TILE, TILE);
  });

  // 3) Desenha bottom half (inferior) da mesa sobrepondo cadeiras
  ctx.drawImage(
    sprites['table'],
    0, tableH / 2,        // sx, sy: começo do bottom half
    tableW, tableH / 2,   // sw, sh
    tableX, tableY + tableH / 2, // dx, dy para bottom half
    tableW, tableH / 2    // dw, dh
  );
};
    
    // Mesa 2x1 tiles, sobrepondo metade das cadeiras
    const tableX = 8 * TILE;           // começa na coluna 8
    const tableY = chairY - TILE / 2;  // meio tile acima
    const tableW = TILE * 2;
    const tableH = TILE;
    ctx.drawImage(sprites['table'], tableX, tableY, tableW, tableH);
  }

  function drawPlayer() {
    ctx.drawImage(sprites['william'], player.x * TILE, player.y * TILE, TILE, TILE);
  }

  // Aguarda carregamento de todas as imagens
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
