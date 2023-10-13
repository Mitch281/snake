import * as PIXI from "pixi.js";
import { Position, SnakeDirection } from "../types";
import {
    CANVAS_WIDTH,
    MAX_FPS,
    SNAKE_BODYPART_HEIGHT,
    SNAKE_BODYPART_WIDTH,
} from "../utils/constants";
import randomIntFromInterval from "../utils/random-int-from-interval";
import roundNumberToNearestTen from "../utils/round-number-to-nearest-ten";
import { CANVAS_HEIGHT } from "./../utils/constants";
import Food from "./Food";
import Snake from "./Snake";

export default class Game {
    gameStarted = false;
    gameOver = true;
    app = new PIXI.Application<HTMLCanvasElement>({
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    });
    snake = new Snake();
    food: Food;
    snakeDirection: SnakeDirection = "right";

    public run() {
        this.setupCanvas();
        this.addStartGameListener();
        this.app.ticker.maxFPS = MAX_FPS;
        this.app.ticker.add(() => {
            this.gameOver = this.detectGameOver();
            if (!this.gameStarted || this.gameOver) {
                return;
            }

            this.snake.move(this.app, this.snakeDirection);
            if (this.snake.hasHeadCollidedWithFood(this.food)) {
                this.snake.incrementSnakeLength(this.app, this.snakeDirection);
                this.changeFoodPosition();
            }
        });
    }

    private setupCanvas() {
        const appDiv = document.querySelector("#app");
        appDiv?.appendChild(this.app.view);
        this.snake.render(this.app);
        this.generateFood();
        this.food.render(this.app);
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

        if (this.snake.hasSnakeHitItself()) {
            return true;
        }

        return false;
    }

    private generateRandomFoodPosition(): Position {
        const randomXPosition = roundNumberToNearestTen(
            randomIntFromInterval(0, CANVAS_WIDTH - SNAKE_BODYPART_WIDTH)
        );
        const randomYPosition = roundNumberToNearestTen(
            randomIntFromInterval(0, CANVAS_HEIGHT - SNAKE_BODYPART_HEIGHT)
        );
        return {
            x: randomXPosition,
            y: randomYPosition,
        };
    }

    private generateFood() {
        const foodPosition = this.generateRandomFoodPosition();
        this.food = new Food(foodPosition);
    }

    private changeFoodPosition() {
        const foodPosition = this.generateRandomFoodPosition();
        this.food.sprite.position.x = foodPosition.x;
        this.food.sprite.position.y = foodPosition.y;
    }
}
