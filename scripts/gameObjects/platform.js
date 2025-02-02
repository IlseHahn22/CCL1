import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Platform extends BaseGameObject {
    blockGravityForces = true; 

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
    constructor(x, y, width, height, imageSrc) {
        super(x, y, width, height);
        this.image = new Image();
        this.image.src = imageSrc;
    }
}
export { Platform };