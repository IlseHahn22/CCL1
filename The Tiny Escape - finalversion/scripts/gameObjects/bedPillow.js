import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class BedPillow extends BaseGameObject {
    blockGravityForces = true; 

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 10,
            right: this.x + this.width,
            top: this.y  + 30,
            bottom: this.y + this.height 
        }
        return bounds;
    };
    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player") {
            //Check if the player is above the block 
            if (collidingObject.previousY + collidingObject.height <= this.y)  {
                //Prevent vertical movement 
                collidingObject.y = this.y - collidingObject.height;
                collidingObject.previousY = 0; //Stop downward velocity 
            } 
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height); 
        this.loadImages(["./images/bettPillow.png"]);
    }
}

export {BedPillow};