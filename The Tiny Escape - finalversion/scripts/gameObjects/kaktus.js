import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Kaktus extends BaseGameObject {
    name = "Kaktus"; 
    blockGravityForces = true;

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/kaktus.png"]);
    }
}

export { Kaktus };