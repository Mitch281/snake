import * as PIXI from "pixi.js";
import { PivotPoint, Position, SnakeDirection } from "../types";
import BodySegment from "./BodySegment";

export default class Snake {
    bodySegments: BodySegment[];
    bodySegmentPositions: Position[] = [];
    pivotPoints: PivotPoint[] = [];

    constructor() {
        for (let i = 2; i >= 0; i--) {
            this.bodySegmentPositions.push({
                x: 50 + i * 10,
                y: 50,
            });
        }
        this.bodySegments = this.bodySegmentPositions.map(
            (position) => new BodySegment(position)
        );
        this.addMovementListener();
    }

    private addMovementListener() {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            const headPosition = this.getHeadSprite().position;
            switch (e.key) {
                case "ArrowUp":
                    this.pivotPoints.push({
                        direction: "up",
                        position: headPosition,
                    });
                    break;
                case "ArrowDown":
                    this.pivotPoints.push({
                        direction: "down",
                        position: headPosition,
                    });
                    break;
                case "ArrowRight":
                    this.pivotPoints.push({
                        direction: "right",
                        position: headPosition,
                    });
                    break;
                case "ArrowLeft":
                    this.pivotPoints.push({
                        direction: "left",
                        position: headPosition,
                    });
                    break;
            }
        });
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
}
