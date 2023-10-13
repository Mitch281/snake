import { Position } from "../types";
import Sprite from "./Sprite";

export default class BodySegment extends Sprite {
    constructor(position: Position) {
        super(position, "/assets/body-segment.png");
    }
}
