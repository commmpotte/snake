import {
    update as updSnake,
    draw as drawSnake,
    SNAKE_SPEED,
    getSnakeHead,
    snakeIntersection
} from "./snake.js"
import {
    update as updFood,
    draw as drawFood
} from './food.js'
import {
    outsideGrid
} from "./grid.js"

let lastRenderTime = 0
const game = document.querySelector('.game')
let gameOver = false

function main(currTime) {
    if (gameOver) {
        if (confirm('You lose! -> Press OK for restart')) {
            window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currTime
    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updSnake()
    updFood()
    checkDeath()
}

function draw() {
    game.innerHTML = ''
    drawSnake(game)
    drawFood(game)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}