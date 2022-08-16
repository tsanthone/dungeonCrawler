import Scene from "../Engine/Scene.js";
import IsaacGameObject from "./IsaacGameObject.js";
import WallGameObject from "./WallGameObject.js"
import Constants from "./Constants.js";
import FloorGameObject from "./FloorGameObject.js";
import TearGameObject from "./TearGameObject.js";
import MonsterGameObject from "./MonsterGameObject.js";
import RockGameObject from "./RockGameObject.js";
import HealthGameObject from "./HealthGameObject.js";
import Game from "../Engine/Game.js";
import ScoreGameObject from "./ScoreGameObject.js";
import DamageCounter from "./DamageCounter.js";
import TearCounter from "./TearCounter.js";
import SpeedCounter from "./SpeedCounter.js";

class startScene extends Scene{
    constructor(){
        super("Start Scene");
    }

    start(){
        //Add Floor
        this.gameObjects.push(new FloorGameObject(0, 0, window.innerWidth, window.innerHeight));

        //Add Isaac
        this.gameObjects.push(new IsaacGameObject(Constants.maxX / 2, Constants.maxY / 2));

        //Add Health
        for(let i = 0; i < Game.health; i++){
            this.gameObjects.push(new HealthGameObject(Constants.wallWidth + 20 + (80 * i), Constants.wallWidth + 20));
        }

        //Add Walls
        //Top Left
        this.gameObjects.push(new WallGameObject(0, 0, Constants.longWallLength, Constants.wallWidth));
        this.gameObjects.push(new WallGameObject(0, 0, Constants.wallWidth, Constants.shortWallLength));
        //Top Right
        this.gameObjects.push(new WallGameObject(Constants.maxX/2 + Constants.doorWidth/2, 0, Constants.longWallLength, Constants.wallWidth));
        this.gameObjects.push(new WallGameObject(Constants.maxX - Constants.wallWidth, 0, Constants.wallWidth, Constants.shortWallLength));
        //Bottom Left
        this.gameObjects.push(new WallGameObject(0, Constants.maxY/2 + Constants.doorWidth/2, Constants.wallWidth, Constants.shortWallLength));
        this.gameObjects.push(new WallGameObject(0, Constants.maxY - Constants.wallWidth, Constants.longWallLength, Constants.wallWidth));
        //Bottom Right
        this.gameObjects.push(new WallGameObject(Constants.maxX - Constants.wallWidth, Constants.maxY/2 + Constants.doorWidth/2, Constants.wallWidth, Constants.shortWallLength));
        this.gameObjects.push(new WallGameObject(Constants.maxX/2 + Constants.doorWidth/2, Constants.maxY - Constants.wallWidth, Constants.longWallLength, Constants.wallWidth));
    
        //Add Score
        this.gameObjects.push(new ScoreGameObject(33, 140));

        //Add Damage
        this.gameObjects.push(new DamageCounter(33, Constants.maxY - 35));

        //Add Tear Rate
        this.gameObjects.push(new TearCounter(33, Constants.maxY - 65));

        //Add Speed
        this.gameObjects.push(new SpeedCounter(33, Constants.maxY - 95));
    }
}

export default startScene;