import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class PaperSnippet extends BaseGameObject {
    name = "PaperSnippet";
    blockGravityForces = true;
    winningSound = new Audio("./audio/winning_soundEffect.mp3");

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.10,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    reactToCollision = function (collidingObject) {
        if (collidingObject.name === "Player") {
            this.endGameWithWin();
        }
    }

    endGameWithWin = function () {
        // Stop the background music
        global.resetBackgroundMusic(); 

        // Play winning sound effect
        this.winningSound.play();
        //Display the game over screen
       const winningScreen = document.querySelector("#winningScreen");
       winningScreen.classList.add("show");

       //Remove the PaperSnippet from the game 
       const index = global.allGameObjects.indexOf(this);
       global.allGameObjects.splice(index, 1);
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/paperRoll_sprites.png", 4, 1); 
        this.switchCurrentSprites(0,3); 
    }
}

export { PaperSnippet }