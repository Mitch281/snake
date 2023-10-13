import * as PIXI from "pixi.js";
import { SnakeDirection } from "../types";
import BodySegment from "./BodySegment";

export default class Snake {
    bodySegments: BodySegment[];

    constructor() {
        this.bodySegments = [
            new BodySegment({ x: 50, y: 50 }),
            new BodySegment({ x: 60, y: 50 }),
            new BodySegment({ x: 70, y: 50 }),
        ];
    }

    public getHeadSprite() {
        return this.bodySegments[0].sprite;
    }

    public render(app: PIXI.Application<HTMLCanvasElement>) {
        for (const bodySegment of this.bodySegments) {
            app.stage.addChild(bodySegment.sprite);
        }
    }

    public move(snakeDirection: SnakeDirection) {
        for (const bodySegment of this.bodySegments) {
            bodySegment.move(snakeDirection);
        }
    }
}
