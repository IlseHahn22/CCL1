const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.backgroundShift = 0;
global.backgroundMaxShift = -600;
// global.gravityForce = 9.8;
global.gravityForce = 9.8 * 2; //double Gravity force  
global.pixelToMeter = 100; //depends on the game

global.isKeyPressed = false;    //new for pushable objects 

// Audio-related variables and functions
global.backgroundMusic = new Audio("./audio/background_music.mp3");
global.backgroundMusic.loop = true; // Loop the music
global.backgroundMusic.volume = 0.5; // Set volume to 50%

global.playBackgroundMusic = function () {
    global.backgroundMusic.play().catch(error => {
        console.error("Autoplay was prevented. Please interact with the page to start the music.");
    });
};

global.pauseBackgroundMusic = function () {
    global.backgroundMusic.pause();
};

global.resetBackgroundMusic = function () {
    global.pauseBackgroundMusic();
    global.backgroundMusic.currentTime = 0; // Set the audio back to the beginning
};
// Toggle music play/pause
global.toggleBackgroundMusic = function () {
    let toggleBackgroundMusicButton = document.querySelector("#musicToggle");
    let musicText = document.querySelector("#musicText");

    // If the checkbox is checked, pause the music, and update the text to "Music Off"
    if (toggleBackgroundMusicButton.checked) {
        global.pauseBackgroundMusic();
    } else {
        // If the checkbox is unchecked, play the music, and update the text to "Music On"
        global.playBackgroundMusic();
    }
};

global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }
    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = 0; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}

global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}

//New resetGame  function 
global.reloadGame = function () {
    global.deltaTime = 0;
    global.allGameObjects = [];
    global.playerObject = {};
    global.backgroundShift = 0;
    global.isKeyPressed = false;

    //show the start screen and hide the game elements 
    const startScreen = document.querySelector("#startscreen");
    const exitContainer = document.querySelector("#exitContainer");
    startScreen.style.display = "flex";
}

export { global }