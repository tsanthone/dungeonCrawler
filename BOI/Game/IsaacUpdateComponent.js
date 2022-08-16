import Component from "../Engine/Component.js";
import Time from "../Engine/Time.js";
import Game from "../Engine/Game.js";
import Input from "../Engine/Input.js";
import Constants from "./Constants.js";
import TearGameObject from "./TearGameObject.js";
import SceneOne from "./SceneOne.js";
import ItemRoomScene from "./ItemRoomScene.js";
import HealthUpObject from "./HealthUpObject.js";

class IsaacUpdateComponent extends Component{
    constructor(parent){
        super(parent);
        this.speed = Game.moveSpeed;
        this.tearTimer = Game.tearRate;
        this.tearSpeed = 250;
    }

    update(){
        let isaac = this.parent.getComponent("Circle");

        // If health goes to zero then change scenes to death screen.
        if(Game.health <= 0){
            Game.changeScene(1);
        }

        let proposedX = isaac.x;
        let proposedY = isaac.y;
        let canMoveX = true;
        let canMoveY = true;

        // Movement inputs.
        if(Input.keys["w"] == true){
            proposedY -= this.speed * Time.secondsBetweenFrame;
        }
        if(Input.keys["s"] == true){
            proposedY += this.speed * Time.secondsBetweenFrame;
        }
        if(Input.keys["a"] == true){
            proposedX -= this.speed * Time.secondsBetweenFrame;
        }
        if(Input.keys["d"] == true){
            proposedX += this.speed * Time.secondsBetweenFrame;
        }

        // Rock Collisions.
        let rockGameObjects = Game.FindByType("RockGameObject");
        for(let i = 0; i < rockGameObjects.length; i++){
            let rock = rockGameObjects[i].getComponent("Rectangle");

            let distX = this.clamp(rock.x, rock.x + rock.w, proposedX) - proposedX;
            let distY = this.clamp(rock.y, rock.y + rock.h, proposedY) - proposedY;

            let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))

            if((isaac.x > rock.x + rock.w + 15 || isaac.x < rock.x - 15) && dist < isaac.r){
                canMoveX = false;
            }
            if((isaac.y > rock.y + rock.h + 15 || isaac.y < rock.y - 15) && dist < isaac.r){
                canMoveY = false;
            }
        }

        // Health Up pickup.
        let healthUpObjects = Game.FindByType("HealthUpObject");
        if(healthUpObjects != []){
            for(let i = 0; i < healthUpObjects.length; i++){
                let healthUp = healthUpObjects[i].getComponent("Rectangle");
    
                let distX = this.clamp(healthUp.x, healthUp.x + healthUp.w, proposedX) - proposedX;
                let distY = this.clamp(healthUp.y, healthUp.y + healthUp.h, proposedY) - proposedY;
    
                let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
    
                if((isaac.x > healthUp.x + healthUp.w + 15 || isaac.x < healthUp.x - 15) && dist < isaac.r){
                    healthUpObjects[i].markForDelete = true;
                    Game.health++;
                    canMoveX = false;
                }
                if((isaac.y > healthUp.y + healthUp.h + 15 || isaac.y < healthUp.y - 15) && dist < isaac.r){
                    healthUpObjects[i].markForDelete = true;
                    Game.health++;
                    canMoveY = false;
                }
            }
        }

        // Damage Up pickup.
        let damageUpObjects = Game.FindByType("DamageUpObject");
        if(damageUpObjects != []){
            for(let i = 0; i < damageUpObjects.length; i++){
                let damageUp = damageUpObjects[i].getComponent("Rectangle");
    
                let distX = this.clamp(damageUp.x, damageUp.x + damageUp.w, proposedX) - proposedX;
                let distY = this.clamp(damageUp.y, damageUp.y + damageUp.h, proposedY) - proposedY;
    
                let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
    
                if((isaac.x > damageUp.x + damageUp.w + 15 || isaac.x < damageUp.x - 15) && dist < isaac.r){
                    damageUpObjects[i].markForDelete = true;
                    Game.damage++;
                    canMoveX = false;
                }
                if((isaac.y > damageUp.y + damageUp.h + 15 || isaac.y < damageUp.y - 15) && dist < isaac.r){
                    damageUpObjects[i].markForDelete = true;
                    Game.damage++;
                    canMoveY = false;
                }
            }
        }

        // Tears Up pickup.
        let tearUpObjects = Game.FindByType("TearUpObject");
        if(tearUpObjects != []){
            for(let i = 0; i < tearUpObjects.length; i++){
                let tearUp = tearUpObjects[i].getComponent("Rectangle");
    
                let distX = this.clamp(tearUp.x, tearUp.x + tearUp.w, proposedX) - proposedX;
                let distY = this.clamp(tearUp.y, tearUp.y + tearUp.h, proposedY) - proposedY;
    
                let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
    
                if((isaac.x > tearUp.x + tearUp.w + 15 || isaac.x < tearUp.x - 15) && dist < isaac.r){
                    tearUpObjects[i].markForDelete = true;
                    if(Game.tearRate > 16){
                        Game.tearRate -= 4;
                    }
                    canMoveX = false;
                }
                if((isaac.y > tearUp.y + tearUp.h + 15 || isaac.y < tearUp.y - 15) && dist < isaac.r){
                    tearUpObjects[i].markForDelete = true;
                    if(Game.tearRate > 16){
                        Game.tearRate -= 4;
                    }
                    canMoveY = false;
                }
            }
        }

        // Speed Up pickup.
        let speedUpObjects = Game.FindByType("SpeedUpObject");
        if(speedUpObjects != []){
            for(let i = 0; i < speedUpObjects.length; i++){
                let speedUp = speedUpObjects[i].getComponent("Rectangle");
    
                let distX = this.clamp(speedUp.x, speedUp.x + speedUp.w, proposedX) - proposedX;
                let distY = this.clamp(speedUp.y, speedUp.y + speedUp.h, proposedY) - proposedY;
    
                let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
    
                if((isaac.x > speedUp.x + speedUp.w + 15 || isaac.x < speedUp.x - 15) && dist < isaac.r){
                    speedUpObjects[i].markForDelete = true;
                    Game.moveSpeed += 20;
                    canMoveX = false;
                }
                if((isaac.y > speedUp.y + speedUp.h + 15 || isaac.y < speedUp.y - 15) && dist < isaac.r){
                    speedUpObjects[i].markForDelete = true;
                    Game.moveSpeed += 20;
                    canMoveY = false;
                }
            }
        }
        

        // Wall Collisions.
        if(!this.inDoor(proposedX, proposedY)){
            if(proposedX < window.innerWidth - isaac.r - Constants.wallWidth && proposedX > isaac.r + Constants.wallWidth){
                if(canMoveX)
                isaac.x = proposedX;
            }
            if(proposedY < window.innerHeight - isaac.r - Constants.wallWidth && proposedY > isaac.r + Constants.wallWidth){
                if(canMoveY)
                isaac.y = proposedY;
            }
        }
        else{
            if(proposedX > 0 + isaac.r && proposedX < window.innerWidth - isaac.r){
                if(canMoveX)
                isaac.x = proposedX;
            }
            if(proposedY > 0 + isaac.r && proposedY < window.innerHeight - isaac.r){
                if(canMoveY)
                isaac.y = proposedY;
            }
        }

        // Changing enter position.
        if(isaac.y - isaac.r < Constants.wallWidth){
            Game.enterPosition = "south";
        }
        if(isaac.x + isaac.r > Constants.maxX - Constants.wallWidth){
            Game.enterPosition = "west";
        }
        if(isaac.y + isaac.r > Constants.maxY - Constants.wallWidth){
            Game.enterPosition = "north";
        }
        if(isaac.x - isaac.r < Constants.wallWidth){
            Game.enterPosition = "east";
        }

        // Creating the next room with a chance for it to be an item room.
        if(isaac.x - isaac.r < 5 || isaac.y + isaac.r > Constants.maxY - 5 || isaac.x + isaac.r > Constants.maxX - 5 || isaac.y - isaac.r < 5){
            let itemRoom = Math.random() * 100;
            if(itemRoom <= 15){
                let itemScene = new ItemRoomScene();
                Game.scenes.push(itemScene);
                Game.changeScene(Game.scenes.length - 1);
            }
            else{
                let mainScene = new SceneOne();
                Game.scenes.push(mainScene);
                Game.changeScene(Game.scenes.length - 1);
            }
        }

        // Tear input.
        if(Input.keys["i"] == true && this.tearRate()){
            let newTear = new TearGameObject(isaac.x, isaac.y, 0, -this.tearSpeed);
            Game.scene().gameObjects.push(newTear);
        }
        else if(Input.keys["k"] == true && this.tearRate()){
            let newTear = new TearGameObject(isaac.x, isaac.y, 0, this.tearSpeed);
            Game.scene().gameObjects.push(newTear);
        }
        else if(Input.keys["j"] == true && this.tearRate()){
            let newTear = new TearGameObject(isaac.x, isaac.y, -this.tearSpeed, 0);
            Game.scene().gameObjects.push(newTear);
        }
        else if(Input.keys["l"] == true && this.tearRate()){
            let newTear = new TearGameObject(isaac.x, isaac.y, this.tearSpeed, 0);
            Game.scene().gameObjects.push(newTear);
        }
    }

    // Checks if Isaac is in a door frame.
    inDoor(x, y){
        if(x - 20 > Constants.longWallLength && x + 20 < Constants.longWallLength + Constants.doorWidth){
            return true;
        }
        else if(y - 20 > Constants.shortWallLength && y + 20 < Constants.shortWallLength + Constants.doorWidth){
            return true;
        }
        else{
            return false;
        }
    }

    // Checks if a tear can be fired.
    tearRate(){
        if(this.tearTimer == Game.tearRate){
            this.tearTimer = 0;
            return true;
        }
        else{
            this.tearTimer++;
        }
    }

    // Clamp algorithm for nearest point.
    clamp(min, max, value){
        if(value < min){
            return min;
        }
        else if(value > max){
            return max;
        }
        else{
            return value;
        }
    }
}

export default IsaacUpdateComponent;