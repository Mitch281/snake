import BodySegment from "./BodySegment";

export default class Snake {
    bodySegments: BodySegment[];

    constructor() {
        this.bodySegments = [new BodySegment({ x: 50, y: 50 })];
    }

    public getHeadSprite() {
        return this.bodySegments[0].sprite;
    }
}
