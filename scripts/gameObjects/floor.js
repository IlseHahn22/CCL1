import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Floor extends BaseGameObject {
    name = "Floor"; 
    blockGravityForces = true;

    draw = function () {
        // //To visualize the floor box - remove afterwards 
        // global.ctx.fillStyle = 'brown'; // Color of the floor
        // global.ctx.fillRect(this.x, this.y, this.width, this.height);

        // // Draw a border around the floor
        // global.ctx.strokeStyle = 'red'; // Color of the border
        // global.ctx.lineWidth = 2; // Width of the border
        // global.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    constructor (x,y, width, height) {
        super (x,y,width,height); 
    }
}

export { Floor};