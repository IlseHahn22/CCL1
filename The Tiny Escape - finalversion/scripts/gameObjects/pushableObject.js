import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class PushableObject extends BaseGameObject {
    name = "PushableObject";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 4,
            right: this.x + this.width - 10,
            top: this.y,
            bottom: this.y + this.height - 3,
        };
        return bounds;
    };

    update = function () {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;

        this.applyGravity();
    };

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player") {
            // Determine the collision direction
            const playerBounds = collidingObject.getBoxBounds();
            const pushableBounds = this.getBoxBounds();

            const playerBottom = playerBounds.bottom;
            const playerTop = playerBounds.top;
            const pushableBottom = pushableBounds.bottom;
            const pushableTop = pushableBounds.top;

            const playerRight = playerBounds.right;
            const playerLeft = playerBounds.left;
            const pushableRight = pushableBounds.right;
            const pushableLeft = pushableBounds.left;

            // Check if the player is landing on top of the pushable object
            if (
                playerBottom > pushableTop &&
                playerTop < pushableTop &&
                playerRight > pushableLeft &&
                playerLeft < pushableRight
            ) {
                // Player is landing on top of the pushable object
                const overlap = playerBottom - pushableTop; // Calculate overlap
                collidingObject.y -= overlap; // Move the player up by the overlap amount
                collidingObject.physicsData.fallVelocity = 0; // Stop falling
                collidingObject.physicsData.isGrounded = true; // Set player as grounded - otherwise cant jump
            } else if (global.isKeyPressed) {
                // Player is pushing the object
                if (collidingObject.xVelocity > 0) {
                    this.x += 10; // Push object to the right
                } else if (collidingObject.xVelocity < 0) {
                    this.x -= 10; // Push object to the left
                }
            } else {
                // Prevent player from overlapping with the pushable object
                collidingObject.x = collidingObject.previousX;
                collidingObject.y = collidingObject.previousY;
            }
        }
    };

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Books.png"]);
    }
}

export { PushableObject };