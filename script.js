document.addEventListener('DOMContentLoaded', () => {
  const playGameBtn = document.getElementById('playGameBtn');
  const menuBtn = document.getElementById('menuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const menu = document.getElementById('menu');
  const game = document.getElementById('game');
  const scoreDisplay = document.getElementById('score');
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const upBtn = document.getElementById('upBtn');
  const downBtn = document.getElementById('downBtn');
  const leftBtn = document.getElementById('leftBtn');
  const rightBtn = document.getElementById('rightBtn');

  let score = 0;
  const snake = [{ x: 10, y: 10 }];
  let food = { x: 5, y: 5 };
  const gridSize = 20;
  let dx = 1, dy = 0;

  const setCanvasSize = () => {
    if (window.innerWidth <= 768) {
      canvas.width = window.innerWidth * 0.9;
      canvas.height = canvas.width;
    } else {
      canvas.width = 400;
      canvas.height = 400;
    }
  };

  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  const drawSquare = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
  };

  const placeFood = () => {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize));
    food.y = Math.floor(Math.random() * (canvas.height / gridSize));
  };

  const updateGame = () => {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      placeFood();
      scoreDisplay.textContent = `Score: ${score}`;
    } else {
      snake.pop();
    }

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= canvas.width / gridSize ||
      head.y >= canvas.height / gridSize ||
      snake.slice(1).some(s => s.x === head.x && s.y === head.y)
    ) {
      alert('Game Over');
      document.location.reload();
    }
  };

  const drawGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(segment => drawSquare(segment.x, segment.y, '#7ad347'));
    drawSquare(food.x, food.y, '#e90003');
  };

  const gameLoop = () => {
    updateGame();
    drawGame();
  };

  upBtn.addEventListener('click', () => { if (dy === 0) { dx = 0; dy = -1; } });
  downBtn.addEventListener('click', () => { if (dy === 0) { dx = 0; dy = 1; } });
  leftBtn.addEventListener('click', () => { if (dx === 0) { dx = -1; dy = 0; } });
  rightBtn.addEventListener('click', () => { if (dx === 0) { dx = 1; dy = 0; } });

  playGameBtn.addEventListener('click', () => {
    menu.classList.add('hidden');
    game.classList.remove('hidden');
    setInterval(gameLoop, 200);
  });

  menuBtn.addEventListener('click', () => {
    game.classList.add('hidden');
    menu.classList.remove('hidden');
  });

  closeMenuBtn.addEventListener('click', () => {
    menu.classList.add('hidden');
  });
});
