import Component from "../Engine/Component.js";
import Time from "../Engine/Time.js";
import Game from "../Engine/Game.js";
import Input from "../Engine/Input.js";
import Constants from "./Constants.js";
import IsaacGameObject from "./IsaacGameObject.js";
import TearGameObject from "./TearGameObject.js";

class TearUpdateComponent extends Component{
    constructor(parent){
        super(parent);
    }

    update(){
        let tear = this.parent.getComponent("Circle");

        let velX = this.parent.velX;
        let velY = this.parent.velY;

        let proposedX = tear.x;
        let proposedY = tear.y;

        proposedX += velX * Time.secondsBetweenFrame;
        proposedY += velY * Time.secondsBetweenFrame;

        // If Tear hits a Monster then the Monster takes damage and the tear is destroyed.
        let monsterGameObjects = Game.FindByType("MonsterGameObject");
        for(let i = 0; i < monsterGameObjects.length; i++){
            let monster = monsterGameObjects[i].getComponent("Rectangle");

            if(proposedX < monster.x + monster.w + tear.r && proposedX > monster.x - tear.r && proposedY < monster.y + monster.h + tear.r && proposedY > monster.y - tear.r){
                monsterGameObjects[i].health -= Game.damage;
                this.parent.markForDelete = true;
            }
        }

        let bossGameObjects = Game.FindByType("BossGameObject");
        for(let i = 0; i < bossGameObjects.length; i++){
            let boss = bossGameObjects[i].getComponent("Rectangle");

            if(proposedX < boss.x + boss.w + tear.r && proposedX > boss.x - tear.r && proposedY < boss.y + boss.h + tear.r && proposedY > boss.y - tear.r){
                bossGameObjects[i].health -= Game.damage;
                this.parent.markForDelete = true;
            }
        }

        // Tear and Rock Collision.
        let rockGameObjects = Game.FindByType("RockGameObject");
        for(let i = 0; i < rockGameObjects.length; i++){
            let rock = rockGameObjects[i].getComponent("Rectangle");

            if(proposedX < rock.x + rock.w + tear.r && proposedX > rock.x - tear.r && proposedY < rock.y + rock.h + tear.r && proposedY > rock.y - tear.r){
                this.parent.markForDelete = true;
            }
        }

        // Tear and Wall Collision.
        if(!this.inDoor(proposedX, proposedY)){
            if(proposedX < window.innerWidth - tear.r - Constants.wallWidth && proposedX > tear.r + Constants.wallWidth && proposedY < window.innerHeight - tear.r - Constants.wallWidth && proposedY > tear.r + Constants.wallWidth){
                tear.x = proposedX;
                tear.y = proposedY;
            }
            else{
                this.parent.markForDelete = true;
            }
        }
        else{
            if(proposedX > 0 + tear.r && proposedX < window.innerWidth - tear.r && proposedY > 0 + tear.r && proposedY < window.innerHeight - tear.r){
                tear.x = proposedX;
                tear.y = proposedY;
            }
            else{
                this.parent.markForDelete = true;
            }
        }
    }

    // Checks if the tear is in a door frame.
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
}

export default TearUpdateComponent;