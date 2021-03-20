import {
    update as UpdateSnake, draw as drawSnake, SNAKE_SPEED,
    getSnakeHead, snakeIntersection
} from './snake.js'
import { update as UpdateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
const gameboard = document.getElementById('gameboard')
let gameOver = false



function main(currentTime) {
    if (gameOver) {
        if (confirm('You Lost. Press OK to Restart.')) {
            window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    console.log('Render')
    lastRenderTime = currentTime

    Update()
    draw()
}
window.requestAnimationFrame(main)

function Update() {
    UpdateSnake()
    UpdateFood()
    checkDeath()
}
function draw() {
    gameboard.innerHTML = ''
    drawSnake(gameboard)
    drawFood(gameboard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}