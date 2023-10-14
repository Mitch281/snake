import * as PIXI from "pixi.js";
import { Position } from "../types";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    SNAKE_BODYPART_HEIGHT,
    SNAKE_BODYPART_WIDTH,
} from "../utils/constants";
import randomIntFromInterval from "../utils/random-int-from-interval";
import roundNumberToNearestTen from "../utils/round-number-to-nearest-ten";
import Sprite from "./Sprite";

export default class Food extends Sprite {
    constructor(position: Position) {
        super(position, "/assets/food.png");
    }

    public render(app: PIXI.Application<HTMLCanvasElement>) {
        app.stage.addChild(this.sprite);
    }

    public static generateRandomFoodPosition(): Position {
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
}
