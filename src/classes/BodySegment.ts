import { Position, SnakeDirection } from "../types";
import { SNAKE_SPEED } from "../utils/constants";
import Sprite from "./Sprite";

export default class BodySegment extends Sprite {
    constructor(position: Position) {
        super(position, "/assets/body-segment.png");
    }

    public move(direction: SnakeDirection) {
        switch (direction) {
            case "up":
                this.sprite.y -= SNAKE_SPEED;
                break;
            case "down":
                this.sprite.y += SNAKE_SPEED;
                break;
            case "right":
                this.sprite.x += SNAKE_SPEED;
                break;
            case "left":
                this.sprite.x -= SNAKE_SPEED;
                break;
        }
    }
}
