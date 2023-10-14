import * as PIXI from "pixi.js";
import Game from "./classes/Game";
import { CANVAS_HEIGHT, CANVAS_WIDTH, MAX_FPS } from "./utils/constants";

const app = new PIXI.Application<HTMLCanvasElement>({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
});

app.ticker.maxFPS = MAX_FPS;

const appDiv = document.querySelector("#app");
appDiv?.appendChild(app.view);

const game = new Game();
game.run(app);
