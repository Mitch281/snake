import * as PIXI from "pixi.js";
import Snake from "./classes/Snake";
import { SnakeDirection } from "./types";
import { CANVAS_HEIGHT, CANVAS_WIDTH, SNAKE_SPEED } from "./utils/constants";

const app = new PIXI.Application<HTMLCanvasElement>({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
});
const appDiv = document.querySelector("#app");
appDiv?.appendChild(app.view);

const snake = new Snake();

app.stage.addChild(snake.bodySegments[0].sprite);

let snakeDirection: SnakeDirection = "right";

document.addEventListener("keydown", (e: KeyboardEvent) => {
    // TODO: Only allow movement if snake head is on a multiple of 10.
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

app.ticker.add(() => {
    switch (snakeDirection) {
        case "up":
            snake.bodySegments[0].sprite.y -= SNAKE_SPEED;
            break;
        case "down":
            snake.bodySegments[0].sprite.y += SNAKE_SPEED;
            break;
        case "right":
            snake.bodySegments[0].sprite.x += SNAKE_SPEED;
            break;
        case "left":
            snake.bodySegments[0].sprite.x -= SNAKE_SPEED;
            break;
    }
});
