import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Chair extends BaseGameObject {
    blockGravityForces = true; 

    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y + 100,
            bottom: this.y + this.height
        }
        return bounds;
    };

    constructor (x, y, width, height) {
        super(x, y, width, height); 
        this.loadImages(["./images/chair2.png"]);
    }
}

export {Chair};