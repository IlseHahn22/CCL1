import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Player extends BaseGameObject { 
    name = "Player"
    xVelocity = 0; 
    yVelocity = 0; 
    useGravityForces = true; 
    isPushing = false; // new property to track if the player is pushing an object 
    lives = 3; //new health property 
    //Property to track the last time the player was hit 
    lastHitTime = 0; 
    hitCooldown = 1000;

    losingSound = new Audio("./audio/losing_soundEffect.mp3");
    hitSound = new Audio("./audio/hit_soundEffect.wav"); 


    physicsData = {
        "terminalVelocity": 53,
        "fallVelocity": 0,
        "jumpForce": 0,
        "prevFallingVelocity": 0,
        "jumpForceDecay": 2, 
        "isGrounded": false 
    }

    getBoxBounds = function() {
        let bounds = {
            left: this.x + 18, 
            right: this.x + this.width - 22,
            top: this.y + 14, 
            bottom: this.y + this.height - 11
        }
        return bounds;
    }

    reactToCollision = function(collidingObject) {
        if (collidingObject.name == "Kaktus") {
            const currentTime = Date.now();

            //Check if enough time has passsed since the last hit
            if (currentTime - this.lastHitTime >= this.hitCooldown) {
                this.lives -= 1; 
                this.lastHitTime = currentTime; //Update the last hit time 
                this.updateHealthDisplay(); //Update the health display
                this.hitSound.play();


                if( this.lives <= 0) {
                    this.showGameOverScreen();
                }
            }
        }
    }

    updateHealthDisplay = function() {
        const livesDisplay = document.querySelector("#healthDisplay img")

        switch (this.lives) {
            case 3: 
                livesDisplay.src = "./images/3hearts.png";
                break;
            case 2:
                livesDisplay.src = "./images/2hearts.png";
                break;
            case 1:
                livesDisplay.src = "./images/1heart.png";
                break; 
            case 0: 
                livesDisplay.src = "./images/0hearts.png";
                break;
            default: 
                livesDisplay.src = "./images/3hearts.png";

        }
    }

    update = function() {
        this.x += this.xVelocity * global.deltaTime; 
        this.y += this.yVelocity * global.deltaTime;

        //new - Check bounds and stop the player if they exceed the canvas bounds
        let bounds = global.getCanvasBounds(); 
        switch (true) {
            case (this.x < bounds.left): 
                this.x = bounds.left; 
                this.xVelocity = 0; 
                break;
            case (this.x + this.width > bounds.right): 
                this.x = bounds.right - this.width;
                this.xVelocity = 0;
                break; 
            case (this.y < bounds.top): 
                this.y = bounds.top; 
                this.yVelocity = 0; 
                break; 
            case (this.y + this.height > bounds.bottom): 
                this.y = bounds.bottom - this.height; 
                this.yVelocity = 0;
                break;
        }

        //Stop animation if the player is not moving
        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }
    }

    showGameOverScreen = function () {
        global.resetBackgroundMusic();   // Stop the background music
        this.losingSound.play(); // Play winning sound effect

        const gameOverScreen = document.querySelector("#gameOverScreen");
        gameOverScreen.classList.add("show");
    }

    constructor (x, y, width, height) {
        super(x, y, width, height); 
        this.loadImagesFromSpritesheet("./images/everyCharacterSprite.png", 40, 1);
    }
}

export { Player }