import * as PIXI from "pixi.js";
import { SnakeDirection } from "./types";
import { CANVAS_HEIGHT, CANVAS_WIDTH, SNAKE_SPEED } from "./utils/constants";

const app = new PIXI.Application<HTMLCanvasElement>({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
});
const appDiv = document.querySelector("#app");
appDiv?.appendChild(app.view);

const bodySegment = PIXI.Sprite.from("/assets/body-segment.png");
bodySegment.x = 50;
bodySegment.y = 50;

app.stage.addChild(bodySegment);

let snakeDirection: SnakeDirection = "right";

document.addEventListener("keydown", (e: KeyboardEvent) => {
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

app.ticker.add((delta) => {
    switch (snakeDirection) {
        case "up":
            bodySegment.y -= SNAKE_SPEED;
            break;
        case "down":
            bodySegment.y += SNAKE_SPEED;
            break;
        case "right":
            bodySegment.x += SNAKE_SPEED;
            break;
        case "left":
            bodySegment.x -= SNAKE_SPEED;
            break;
    }
});
