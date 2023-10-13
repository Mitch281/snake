import * as PIXI from "pixi.js";
import { Position } from "../types";
import Sprite from "./Sprite";

export default class Food extends Sprite {
    constructor(position: Position) {
        super(position, "/assets/food.png");
    }

    public render(app: PIXI.Application<HTMLCanvasElement>) {
        app.stage.addChild(this.sprite);
    }
}
