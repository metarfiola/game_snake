const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;

// Start Game Function
function startGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.innerText = score;
    placeFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 150);
}

// Game Loop
function gameLoop() {
    if (collision()) {
        alert(`Game Over! Your score: ${score}`);
        clearInterval(gameInterval);
        return;
    }

    updateSnake();
    if (eatFood()) {
        score++;
        scoreDisplay.innerText = score;
        placeFood();
    }

    draw();
}

// Collision Detection
function collision() {
    const head = snake[0];
    // Check wall collisions
    if (head.x < 0 || head.x >= 25 || head.y < 0 || head.y >= 25) {
        return true;
    }
    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Update Snake Position
function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (!eatFood()) {
        snake.pop();
    }
}

// Place Food
function placeFood() {
    food.x = Math.floor(Math.random() * 25);
    food.y = Math.floor(Math.random() * 25);
}

// Check if Snake Eats Food
function eatFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

// Draw Game Elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    snake.forEach((segment) => {
        ctx.fillStyle = '#7b1fa2'; // Purple for snake
        ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
    });

    // Draw Food
    ctx.fillStyle = '#e91e63'; // Pink for food
    ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
}

// Keyboard Controls
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Start Button Listener
startButton.addEventListener('click', startGame);
