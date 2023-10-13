import { Position } from "../types";
import Sprite from "./Sprite";

export default class Food extends Sprite {
    constructor(position: Position, imageUrl: string) {
        super(position, imageUrl);
    }
}
