import * as PIXI from "pixi.js";
import { SnakeDirection } from "../types";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    SNAKE_BODYPART_HEIGHT,
    SNAKE_BODYPART_WIDTH,
} from "../utils/constants";
import Snake from "./Snake";

export default class Game {
    gameStarted = false;
    gameOver = true;
    app = new PIXI.Application<HTMLCanvasElement>({
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    });
    snake = new Snake();
    snakeDirection: SnakeDirection = "right";

    constructor() {
        this.setupCanvas();
    }

    public run() {
        this.addStartGameListener();
        this.app.ticker.add(() => {
            this.gameOver = this.detectGameOver();
            if (!this.gameStarted || this.gameOver) {
                return;
            }

            this.snake.move(this.app, this.snakeDirection);
        });
    }

    private setupCanvas() {
        const appDiv = document.querySelector("#app");
        appDiv?.appendChild(this.app.view);
        this.snake.render(this.app);
    }

    private addStartGameListener() {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            this.gameStarted = true;
            switch (e.key) {
                case "ArrowUp":
                    this.snakeDirection = "up";
                    break;
                case "ArrowDown":
                    this.snakeDirection = "down";
                    break;
                case "ArrowRight":
                    this.snakeDirection = "right";
                    break;
                case "ArrowLeft":
                    this.snakeDirection = "left";
                    break;
            }
        });
    }

    private detectGameOver() {
        const headSprite = this.snake.getHeadSprite();
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
}
