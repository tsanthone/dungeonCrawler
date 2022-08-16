import Component from "../Engine/Component.js";
import Time from "../Engine/Time.js";
import Game from "../Engine/Game.js";
import Input from "../Engine/Input.js";
import Constants from "./Constants.js";
import ScoreGameObject from "./ScoreGameObject.js";

class MonsterUpdateComponent extends Component{
    constructor(parent){
        super(parent);
        this.velX = 200;
        this.velY = 200;
        this.maxVel = this.velX;
        this.iTime = 750;
    }

    update(){
        let monster = this.parent.getComponent("Rectangle");
        let isaacGameObject = Game.FindByType("IsaacGameObject")[0];
        let isaac = isaacGameObject.getComponent("Circle");
        let healthGameObjects = Game.FindByType("HealthGameObject");

        // If Monster health reaches zero, then the score is updated and the Monster is deleted.
        if(this.parent.health <= 0){
            Game.score += 100;
            let score = Game.FindByType("ScoreGameObject")[0];
            score.markForDelete = true;
            Game.scene().gameObjects.push(new ScoreGameObject(33, 140));
            this.parent.markForDelete = true;
        }

        let monsterX = monster.x + monster.w / 2;
        let monsterY = monster.y + monster.h / 2;
        let distToIsaacX = isaac.x - monsterX;
        let distToIsaacY = isaac.y - monsterY;

        let monsterGameObjects = Game.FindByType("MonsterGameObject");

        let repelX = 0;
        let repelY = 0;
        let proposedX = monster.x;
        let proposedY = monster.y;
        let canMoveX = true;
        let canMoveY = true;

        // Repel each of the Monsters away from each other.
        for(let i = 0; i < monsterGameObjects.length; i++){
            let monsterTwo = monsterGameObjects[i].getComponent("Rectangle");
            let monsterTwoX = monsterTwo.x + monsterTwo.w / 2;
            let monsterTwoY = monsterTwo.y + monsterTwo.h / 2;

            let distToMonsterX = monsterTwoX - monsterX;
            let distToMonsterY = monsterTwoY - monsterY;
            let distToMonster = Math.pow(Math.pow(distToMonsterX, 2) + Math.pow(distToMonsterY, 2), .5);
            let percentRepel = 10 / distToMonster;
            let repelStrength = 225;

            if(monsterX < monsterTwoX && monsterY < monsterTwoY){
                repelX -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(monsterX > monsterTwoX && monsterY < monsterTwoY){
                repelX -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(monsterX > monsterTwoX && monsterY > monsterTwoY){
                repelX += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(monsterX < monsterTwoX && monsterY > monsterTwoY){
                repelX += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
        }

        // Repel each of the Monsters from the rocks.
        let rockGameObjects = Game.FindByType("RockGameObject");
        for(let i = 0; i < rockGameObjects.length; i++){
            let rock = rockGameObjects[i].getComponent("Rectangle");

            let rockX = rock.x + rock.w / 2;
            let rockY = rock.y + rock.h / 2;

            let distToMonsterX = rockX - monsterX;
            let distToMonsterY = rockY - monsterY;
            let distToMonster = Math.pow(Math.pow(distToMonsterX, 2) + Math.pow(distToMonsterY, 2), .5);
            let percentRepel = 10 / distToMonster;
            let repelStrength = 550;

            if(monsterX < rockX && monsterY < rockY){
                repelX -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(monsterX > rockX && monsterY < rockY){
                repelX -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(monsterX > rockX && monsterY > rockY){
                repelX += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(monsterX < rockX && monsterY > rockY){
                repelX += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
        }

        // Repel each of the Monsters from the Boss
        let bossGameObjects = Game.FindByType("BossGameObject");
        for(let i = 0; i < bossGameObjects.length; i++){
            let boss = bossGameObjects[i].getComponent("Rectangle");

            let bossX = boss.x + boss.w / 2;
            let bossY = boss.y + boss.h / 2;

            let distToMonsterX = bossX - monsterX;
            let distToMonsterY = bossY - monsterY;
            let distToMonster = Math.pow(Math.pow(distToMonsterX, 2) + Math.pow(distToMonsterY, 2), .5);
            let percentRepel = 10 / distToMonster;
            let repelStrength = 550;

            if(monsterX < bossX && monsterY < bossY){
                repelX -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(monsterX > bossX && monsterY < bossY){
                repelX -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(monsterX > bossX && monsterY > bossY){
                repelX += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(monsterX < bossX && monsterY > bossY){
                repelX += percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY -= percentRepel * repelStrength * (Math.atan(distToMonsterX / distToMonsterY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
        }

        // Move Monsters toward Isaac.
        if(monsterX < isaac.x && monsterY < isaac.y){
            if(canMoveX)
            proposedX += this.velX * (Math.atan(distToIsaacX / distToIsaacY) / (Math.PI / 2)) * Time.secondsBetweenFrame + repelX;
            if(canMoveY)
            proposedY += this.velY * (Math.atan(distToIsaacY / distToIsaacX) / (Math.PI / 2)) * Time.secondsBetweenFrame + repelY;
        }
        else if(monsterX > isaac.x && monsterY < isaac.y){
            if(canMoveX)
            proposedX += this.velX * (Math.atan(distToIsaacX / distToIsaacY) / (Math.PI / 2)) * Time.secondsBetweenFrame + repelX;
            if(canMoveY)
            proposedY -= this.velY * (Math.atan(distToIsaacY / distToIsaacX) / (Math.PI / 2)) * Time.secondsBetweenFrame - repelY;
        }
        else if(monsterX > isaac.x && monsterY > isaac.y){
            if(canMoveX)
            proposedX -= this.velX * (Math.atan(distToIsaacX / distToIsaacY) / (Math.PI / 2)) * Time.secondsBetweenFrame - repelX;
            if(canMoveY)
            proposedY -= this.velY * (Math.atan(distToIsaacY / distToIsaacX) / (Math.PI / 2)) * Time.secondsBetweenFrame - repelY;
        }
        else if(monsterX < isaac.x && monsterY > isaac.y){
            if(canMoveX)
            proposedX -= this.velX * (Math.atan(distToIsaacX / distToIsaacY) / (Math.PI / 2)) * Time.secondsBetweenFrame - repelX;
            if(canMoveY)
            proposedY += this.velY * (Math.atan(distToIsaacY / distToIsaacX) / (Math.PI / 2)) * Time.secondsBetweenFrame + repelY;
        }

        if(proposedX < window.innerWidth - monster.w - Constants.wallWidth && proposedX > Constants.wallWidth){
            if(canMoveX)
            monster.x = proposedX;
        }
        if(proposedY < window.innerHeight - monster.h - Constants.wallWidth && proposedY > Constants.wallWidth){
            if(canMoveY)
            monster.y = proposedY;
        }

        this.iFrames();

        // If a Monster touches Isaac, then his health goes down.
        if(isaac.x > monster.x && isaac.x < monster.x + monster.w && isaac.y > monster.y && isaac.y < monster.y + monster.h && this.iFrames()){
            Game.health--;
            healthGameObjects[healthGameObjects.length - 1].markForDelete = true;
            this.iTime = 0;
        }
    }

    // I Frame Counter.
    iFrames(){
        if(this.iTime == 750){
            return true;
        }
        else{
            this.iTime++;
        }
    }
}

export default MonsterUpdateComponent;