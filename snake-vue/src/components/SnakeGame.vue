<template>
  <div>
    <h1>Vue Snake Game</h1>
    <canvas ref="canvas" @keydown="keyPressed"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      gridSize: 20,
      snake: [{ x: 5, y: 5 }],
      food: { x: 15, y: 15 },
      direction: 'RIGHT',
    };
  },
  methods: {
    setup() {
      this.canvas = this.$refs.canvas;
      createCanvas(this.canvas, this.gridSize);
    },
    draw() {
      clearCanvas(this.canvas);
      drawSnake(this.snake, this.gridSize, this.canvas);
      drawFood(this.food, this.gridSize, this.canvas);
    },
    update() {
      moveSnake(this.snake, this.direction, this.gridSize);
      if (checkCollision(this.snake, this.gridSize)) {
        // Game over logic
        alert('Game Over!');
        this.resetGame();
      }

      if (checkFoodEaten(this.snake[0], this.food)) {
        this.growSnake();
        this.generateFood();
      }
    },
    keyPressed(event) {
      switch (event.key) {
        case 'ArrowUp':
          this.direction = 'UP';
          break;
        case 'ArrowDown':
          this.direction = 'DOWN';
          break;
        case 'ArrowLeft':
          this.direction = 'LEFT';
          break;
        case 'ArrowRight':
          this.direction = 'RIGHT';
          break;
      }
    },
    resetGame() {
      this.snake = [{ x: 5, y: 5 }];
      this.direction = 'RIGHT';
      this.food = { x: 15, y: 15 };
    },
    growSnake() {
      const tail = { ...this.snake[this.snake.length - 1] };
      this.snake.push(tail);
    },
    generateFood() {
      this.food = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize),
      };
    },
  },
  mounted() {
    this.setup();
    setInterval(() => {
      this.update();
      this.draw();
    }, 100);
    window.addEventListener('keydown', this.keyPressed);
  },
};

// Helper functions for drawing on the canvas
function createCanvas(canvas, gridSize) {
  canvas.width = gridSize * 20;
  canvas.height = gridSize * 20;
  canvas.style.border = '1px solid #ccc';
}

function clearCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(snake, gridSize, canvas) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#00f'; // Snake color
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

function drawFood(food, gridSize, canvas) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f00'; // Food color
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// More helper functions for game logic
function moveSnake(snake, direction, gridSize) {
  const head = { ...snake[0] };
  switch (direction) {
    case 'UP':
      head.y = (head.y - 1 + gridSize) % gridSize;
      break;
    case 'DOWN':
      head.y = (head.y + 1) % gridSize;
      break;
    case 'LEFT':
      head.x = (head.x - 1 + gridSize) % gridSize;
      break;
    case 'RIGHT':
      head.x = (head.x + 1) % gridSize;
      break;
  }
  snake.unshift(head);
  snake.pop();
}

function checkCollision(snake, gridSize) {
  const head = snake[0];
  // Check if the snake collides with itself or hits the wall
  return (
      snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y) ||
      head.x < 0 ||
      head.x >= gridSize ||
      head.y < 0 ||
      head.y >= gridSize
  );
}

function checkFoodEaten(head, food) {
  return head.x === food.x && head.y === food.y;
}
</script>

<style scoped>
/* Add your styles here */
</style>
