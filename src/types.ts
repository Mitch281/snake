export type SnakeDirection = "up" | "down" | "left" | "right";

export type PivotPoint = {
    direction: SnakeDirection;
    position: Position;
};

export type Position = {
    x: number;
    y: number;
};
