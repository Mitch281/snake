import * as PIXI from "pixi.js";
import Snake from "./classes/Snake";
import { SnakeDirection } from "./types";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    SNAKE_BODYPART_HEIGHT,
    SNAKE_BODYPART_WIDTH,
} from "./utils/constants";

let gameStarted = false;
let gameOver = false;

const app = new PIXI.Application<HTMLCanvasElement>({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
});
const appDiv = document.querySelector("#app");
appDiv?.appendChild(app.view);

const snake = new Snake();
snake.render(app);

let snakeDirection: SnakeDirection = "right";

document.addEventListener("keydown", (e: KeyboardEvent) => {
    gameStarted = true;
    switch (e.key) {
        case "ArrowUp":
            snakeDirection = "up";
            break;
        case "ArrowDown":
            snakeDirection = "down";
            break;
        case "ArrowRight":
            snakeDirection = "right";
            break;
        case "ArrowLeft":
            snakeDirection = "left";
            break;
    }
});

function detectGameOver() {
    const headSprite = snake.getHeadSprite();
    if (
        headSprite.x === 0 ||
        headSprite.x == CANVAS_WIDTH - SNAKE_BODYPART_WIDTH
    ) {
        return true;
    }
    if (
        headSprite.y === 0 ||
        headSprite.y === CANVAS_HEIGHT - SNAKE_BODYPART_HEIGHT
    ) {
        return true;
    }

    return false;
}

app.ticker.add(() => {
    gameOver = detectGameOver();
    if (!gameStarted || gameOver) {
        return;
    }

    snake.move(snakeDirection);
});
