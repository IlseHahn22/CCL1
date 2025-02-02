import { global } from "./global.js";

const keyPressed = {}; 

function move(event) {
    keyPressed[event.key] = true;
    switch(event.key) {
    case "d":
        if (global.playerObject.xVelocity == 0)
        global.playerObject.switchCurrentSprites(18, 28); 
        global.playerObject.xVelocity = 200;
        global.playerObject.yVelocity = 0;
        break;
    case "a":
        if (global.playerObject.xVelocity == 0)
            global.playerObject.switchCurrentSprites(29, 39); 
        global.playerObject.xVelocity = -200;
        global.playerObject.yVelocity = 0;
        break;
    case "w":
        global.playerObject.setJumpForce(10.0);
        
        if (global.playerObject.xVelocity > 0) {
            global.playerObject.switchCurrentSprites(12, 17); // Right jump animation
        } else if (global.playerObject.xVelocity < 0) {
            global.playerObject.switchCurrentSprites(6, 11); // Left jump animation
        } else {
            global.playerObject.switchCurrentSprites(0, 5); // jump straight up animation
        }
        break;        
    case "e": 
        global.isKeyPressed = true;
        break;
    }
}

function stop(event) {
    keyPressed[event.key] = false;
    switch(event.key) {
        case "d":
            global.playerObject.xVelocity = 0;
            break;
        case "a": 
            global.playerObject.xVelocity = 0;
            break; 
        case "e": 
            global.isKeyPressed = false;
            break;
    }   
}

document.addEventListener("keypress", move);

//move as long as the player presses a key:
document.addEventListener("keyup", stop);

