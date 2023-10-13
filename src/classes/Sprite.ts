import * as PIXI from "pixi.js";
import { Position } from "../types";

export default class Sprite {
    position: Position;
    imageUrl: string;
    sprite: PIXI.Sprite;
    constructor(position: Position, imageUrl: string) {
        this.position = position;
        this.imageUrl = imageUrl;
        this.loadSprite();
        this.setSpritePosition(position);
    }

    private loadSprite() {
        this.sprite = PIXI.Sprite.from(this.imageUrl);
    }

    private setSpritePosition(position: Position) {
        this.sprite.position = position;
    }
}
