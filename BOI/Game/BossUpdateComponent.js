import Component from "../Engine/Component.js";
import Time from "../Engine/Time.js";
import Game from "../Engine/Game.js";
import Input from "../Engine/Input.js";
import Constants from "./Constants.js";
import ScoreGameObject from "./ScoreGameObject.js";

class BossUpdateComponent extends Component{
    constructor(parent){
        super(parent);
        this.velX = 200;
        this.velY = 200;
        this.maxVel = this.velX;
        this.iTime = 750;
    }

    update(){
        let boss = this.parent.getComponent("Rectangle");
        let isaacGameObject = Game.FindByType("IsaacGameObject")[0];
        let isaac = isaacGameObject.getComponent("Circle");
        let healthGameObjects = Game.FindByType("HealthGameObject");

        // If Boss health reaches zero, then the score is updated and the Boss is deleted.
        if(this.parent.health <= 0){
            Game.score += 500;
            let score = Game.FindByType("ScoreGameObject")[0];
            score.markForDelete = true;
            Game.scene().gameObjects.push(new ScoreGameObject(33, 140));
            this.parent.markForDelete = true;
        }

        let bossX = boss.x + boss.w / 2;
        let bossY = boss.y + boss.h / 2;
        let distToIsaacX = isaac.x - bossX;
        let distToIsaacY = isaac.y - bossY;

        let repelX = 0;
        let repelY = 0;
        let proposedX = boss.x;
        let proposedY = boss.y;
        let canMoveX = true;
        let canMoveY = true;

        // Repel Boss from the rocks.
        let rockGameObjects = Game.FindByType("RockGameObject");
        for(let i = 0; i < rockGameObjects.length; i++){
            let rock = rockGameObjects[i].getComponent("Rectangle");

            let rockX = rock.x + rock.w / 2;
            let rockY = rock.y + rock.h / 2;

            let distTobossX = rockX - bossX;
            let distTobossY = rockY - bossY;
            let distToboss = Math.pow(Math.pow(distTobossX, 2) + Math.pow(distTobossY, 2), .5);
            let percentRepel = 10 / distToboss;
            let repelStrength = 550;

            if(bossX < rockX && bossY < rockY){
                repelX -= percentRepel * repelStrength * (Math.atan(distTobossX / distTobossY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY -= percentRepel * repelStrength * (Math.atan(distTobossX / distTobossY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(bossX > rockX && bossY < rockY){
                repelX -= percentRepel * repelStrength * (Math.atan(distTobossX / distTobossY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY += percentRepel * repelStrength * (Math.atan(distTobossX / distTobossY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(bossX > rockX && bossY > rockY){
                repelX += percentRepel * repelStrength * (Math.atan(distTobossX / distTobossY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY += percentRepel * repelStrength * (Math.atan(distTobossX / distTobossY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
            else if(bossX < rockX && bossY > rockY){
                repelX += percentRepel * repelStrength * (Math.atan(distTobossX / distTobossY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
                repelY -= percentRepel * repelStrength * (Math.atan(distTobossX / distTobossY) / (Math.PI / 2)) * Time.secondsBetweenFrame;
            }
        }

        // Move bosss toward Isaac.
        if(bossX < isaac.x && bossY < isaac.y){
            if(canMoveX)
            proposedX += this.velX * (Math.atan(distToIsaacX / distToIsaacY) / (Math.PI / 2)) * Time.secondsBetweenFrame + repelX;
            if(canMoveY)
            proposedY += this.velY * (Math.atan(distToIsaacY / distToIsaacX) / (Math.PI / 2)) * Time.secondsBetweenFrame + repelY;
        }
        else if(bossX > isaac.x && bossY < isaac.y){
            if(canMoveX)
            proposedX += this.velX * (Math.atan(distToIsaacX / distToIsaacY) / (Math.PI / 2)) * Time.secondsBetweenFrame + repelX;
            if(canMoveY)
            proposedY -= this.velY * (Math.atan(distToIsaacY / distToIsaacX) / (Math.PI / 2)) * Time.secondsBetweenFrame - repelY;
        }
        else if(bossX > isaac.x && bossY > isaac.y){
            if(canMoveX)
            proposedX -= this.velX * (Math.atan(distToIsaacX / distToIsaacY) / (Math.PI / 2)) * Time.secondsBetweenFrame - repelX;
            if(canMoveY)
            proposedY -= this.velY * (Math.atan(distToIsaacY / distToIsaacX) / (Math.PI / 2)) * Time.secondsBetweenFrame - repelY;
        }
        else if(bossX < isaac.x && bossY > isaac.y){
            if(canMoveX)
            proposedX -= this.velX * (Math.atan(distToIsaacX / distToIsaacY) / (Math.PI / 2)) * Time.secondsBetweenFrame - repelX;
            if(canMoveY)
            proposedY += this.velY * (Math.atan(distToIsaacY / distToIsaacX) / (Math.PI / 2)) * Time.secondsBetweenFrame + repelY;
        }

        if(proposedX < window.innerWidth - boss.w - Constants.wallWidth && proposedX > Constants.wallWidth){
            if(canMoveX)
            boss.x = proposedX;
        }
        if(proposedY < window.innerHeight - boss.h - Constants.wallWidth && proposedY > Constants.wallWidth){
            if(canMoveY)
            boss.y = proposedY;
        }

        this.iFrames();

        // If a boss touches Isaac, then his health goes down.
        if(isaac.x > boss.x && isaac.x < boss.x + boss.w && isaac.y > boss.y && isaac.y < boss.y + boss.h && this.iFrames()){
            Game.health -= 2;
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

export default BossUpdateComponent;