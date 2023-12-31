import * as PIXI from "pixi.js";
import { Position, SnakeDirection } from "../types";
import BodySegment from "./BodySegment";
import Food from "./Food";

export default class Snake {
    bodySegments: BodySegment[];
    bodySegmentPositions: Position[] = [];

    constructor() {
        for (let i = 10; i >= 0; i--) {
            this.bodySegmentPositions.push({
                x: 50 + i * 10,
                y: 50,
            });
        }
        this.bodySegments = this.bodySegmentPositions.map(
            (position) => new BodySegment(position)
        );
    }

    public getHeadSprite(): PIXI.Sprite {
        return this.bodySegments[0].sprite;
    }

    public render(app: PIXI.Application<HTMLCanvasElement>) {
        this.bodySegments = this.bodySegmentPositions.map(
            (position) => new BodySegment(position)
        );
        for (const bodySegment of this.bodySegments) {
            app.stage.addChild(bodySegment.sprite);
        }
    }

    public move(
        app: PIXI.Application<HTMLCanvasElement>,
        snakeDirection: SnakeDirection
    ) {
        const currentHeadPosition = this.bodySegmentPositions[0];
        const newHeadPosition: Position = { x: 0, y: 0 };
        switch (snakeDirection) {
            case "up":
                newHeadPosition.x = currentHeadPosition.x;
                newHeadPosition.y = currentHeadPosition.y - 10;
                break;
            case "down":
                newHeadPosition.x = currentHeadPosition.x;
                newHeadPosition.y = currentHeadPosition.y + 10;
                break;
            case "left":
                newHeadPosition.x = currentHeadPosition.x - 10;
                newHeadPosition.y = currentHeadPosition.y;
                break;
            case "right":
                newHeadPosition.x = currentHeadPosition.x + 10;
                newHeadPosition.y = currentHeadPosition.y;
                break;
        }
        this.bodySegmentPositions.unshift(newHeadPosition);
        this.bodySegmentPositions.pop();
        this.bodySegments.forEach((bodySegment) =>
            bodySegment.sprite.destroy()
        );
        this.render(app);
    }

    public incrementSnakeLength(
        app: PIXI.Application<HTMLCanvasElement>,
        snakeDirection: SnakeDirection
    ) {
        const currentHeadPosition = this.bodySegmentPositions[0];
        const newHeadPosition: Position = { x: 0, y: 0 };
        switch (snakeDirection) {
            case "up":
                newHeadPosition.x = currentHeadPosition.x;
                newHeadPosition.y = currentHeadPosition.y - 10;
                break;
            case "down":
                newHeadPosition.x = currentHeadPosition.x;
                newHeadPosition.y = currentHeadPosition.y + 10;
                break;
            case "left":
                newHeadPosition.x = currentHeadPosition.x - 10;
                newHeadPosition.y = currentHeadPosition.y;
                break;
            case "right":
                newHeadPosition.x = currentHeadPosition.x + 10;
                newHeadPosition.y = currentHeadPosition.y;
                break;
        }
        this.bodySegmentPositions.unshift(newHeadPosition);
        this.bodySegments.forEach((bodySegment) =>
            bodySegment.sprite.destroy()
        );
        this.render(app);
    }

    public hasHeadCollidedWithFood(food: Food) {
        const headPosition = this.bodySegmentPositions[0];
        return (
            headPosition.x === food.sprite.position.x &&
            headPosition.y === food.sprite.position.y
        );
    }

    public hasSnakeHitItself(): boolean {
        let hasSnakeHitItself = false;
        this.bodySegmentPositions.forEach((position) => {
            const duplicatePositions = this.bodySegmentPositions.filter(
                (innerPosition) =>
                    innerPosition.x === position.x &&
                    innerPosition.y === position.y
            );
            if (duplicatePositions.length > 1) {
                hasSnakeHitItself = true;
            }
        });

        return hasSnakeHitItself;
    }
}
