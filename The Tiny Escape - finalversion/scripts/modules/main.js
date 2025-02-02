import { global } from "./global.js";
import { Player } from "../gameObjects/player.js";
import { Floor } from "../gameObjects/floor.js";
import { PushableObject } from "../gameObjects/pushableObject.js";
import { PaperSnippet } from "../gameObjects/paperSnippet.js";
import { Kaktus } from "../gameObjects/kaktus.js";
import { Chair } from "../gameObjects/chair.js";
import { BedPillow } from "../gameObjects/bedPillow.js";

import { Platform } from "../gameObjects/platform.js";

function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    
    for (var i = 0; i < global.allGameObjects.length; i++) { // loop in the (game)loop -> the gameloop is continuous anyways.. and on every cycle we do now loop through all objects to execute several operations (functions) on each of them
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }
    
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    global.playerObject = new Player(200, 410, 60, 130);
    new Floor(0, 619, 9000, 150); 

    new Platform(100, 170, 100, 30, "./images/brett small.png");
    new Platform(290, 300, 100, 30, "./images/brett small.png");
    new Platform(460, 200, 150, 30, "./images/middle brett.png");
    new Platform(700, 250, 250, 30, "./images/big brett.png");
    new Platform(0, 390, 218, 20, "./images/desk3.png");
    new Platform(1058, 164, 224, 90, "./images/schrank2.png");
    new Platform(778, 454, 93, 48, "./images/nightstand2.png");
    new Platform(290, 487, 80, 27, "./images/bin2.png");
    new Platform(454, 438, 300, 30, "./images/bettTop.png");

    new Chair(35, 291, 77, 126);
    new BedPillow (334, 334, 120, 120);

    new Kaktus(100, 120, 50, 50);
    new Kaktus(790, 200, 50, 50);
    new Kaktus(320, 250, 50, 50);

    new PushableObject(778, 454, 50, 50);
    new PushableObject(530, 200, 50, 50);

    new PaperSnippet(1160, 6, 100, 260);
    
 
}

//new for the start screen - buttons
document.addEventListener("DOMContentLoaded", () => {
     const startScreen = document.querySelector("#startscreen");
     const startButton = document.querySelector("#startButton");
     const exitContainer = document.querySelector("#exitContainer");
     const exitButton = document.querySelector("#exitButton");
     const gameOverScreen = document.querySelector("#gameOverScreen");
     const restartButton = document.querySelector("#restartButton");
     const winningScreen = document.querySelector("#winningScreen");
     const restartButton2 = document.querySelector("#restartButton2");
     const livesDisplay = document.querySelector("#healthDisplay img");
     const toggleBackgroundMusic = document.querySelector("#musicToggle");
     let musicToggle = document.getElementById("musicToggle");
    let musicText = document.getElementById("musicText");
   
    startButton.addEventListener("click", () => {
        startScreen.style.display = "none";
        livesDisplay.src = "./images/3hearts.png";
        global.playBackgroundMusic();
    }); 

    restartButton2.addEventListener("click", () => {
        global.reloadGame();
        global.resetBackgroundMusic();
        setupGame();
        gameOverScreen.classList.remove("show");
    });

    restartButton.addEventListener("click", () => {
        global.reloadGame();
        global.resetBackgroundMusic();
        setupGame();
        winningScreen.classList.remove("show");
    });
    
    exitButton.addEventListener("click", () => {
        global.reloadGame();
        global.resetBackgroundMusic();
        musicToggle.checked = false;// Reset the toggle button (set to unchecked)
        setupGame();
    });

    toggleBackgroundMusic.addEventListener("change", () => {
        global.toggleBackgroundMusic();
    });
});

setupGame();
requestAnimationFrame(gameLoop);



