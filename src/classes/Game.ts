import * as PIXI from "pixi.js";
import { SnakeDirection } from "../types";
import {
    CANVAS_WIDTH,
    SNAKE_BODYPART_HEIGHT,
    SNAKE_BODYPART_WIDTH,
} from "../utils/constants";
import { CANVAS_HEIGHT } from "./../utils/constants";
import Food from "./Food";
import Snake from "./Snake";

export default class Game {
    gameStarted = false;
    gameOver = true;
    snake = new Snake();
    food: Food;
    snakeDirection: SnakeDirection = "right";

    public run(app: PIXI.Application<HTMLCanvasElement>) {
        this.initialiseSnakeAndFoodRendering(app);
        this.addStartGameListener();
        app.ticker.add(() => {
            this.gameOver = this.detectGameOver();
            if (!this.gameStarted || this.gameOver) {
                return;
            }

            this.snake.move(app, this.snakeDirection);
            if (this.snake.hasHeadCollidedWithFood(this.food)) {
                this.snake.incrementSnakeLength(app, this.snakeDirection);
                this.changeFoodPosition();
            }
        });
    }

    private initialiseSnakeAndFoodRendering(
        app: PIXI.Application<HTMLCanvasElement>
    ) {
        this.snake.render(app);
        const randomFoodPosition = Food.generateRandomFoodPosition();
        this.food = new Food(randomFoodPosition);
        this.food.render(app);
    }

    private addStartGameListener() {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            this.gameStarted = true;
            switch (e.key) {
                case "ArrowUp":
                    if (this.snakeDirection === "down") {
                        return;
                    }
                    this.snakeDirection = "up";
                    break;
                case "ArrowDown":
                    if (this.snakeDirection === "up") {
                        return;
                    }
                    this.snakeDirection = "down";
                    break;
                case "ArrowRight":
                    if (this.snakeDirection === "left") {
                        return;
                    }
                    this.snakeDirection = "right";
                    break;
                case "ArrowLeft":
                    if (this.snakeDirection === "right") {
                        return;
                    }
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

    private changeFoodPosition() {
        const foodPosition = Food.generateRandomFoodPosition();
        this.food.sprite.position.x = foodPosition.x;
        this.food.sprite.position.y = foodPosition.y;
    }
}
