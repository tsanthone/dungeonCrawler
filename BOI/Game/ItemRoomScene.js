import Scene from "../Engine/Scene.js";
import IsaacGameObject from "./IsaacGameObject.js";
import WallGameObject from "./WallGameObject.js"
import Constants from "./Constants.js";
import FloorGameObject from "./FloorGameObject.js";
import Game from "../Engine/Game.js";
import HealthGameObject from "./HealthGameObject.js";
import HealthUpObject from "./HealthUpObject.js";
import DamageUpObject from "./DamageUpObject.js";
import SpeedUpObject from "./SpeedUpObject.js";
import TearUpObject from "./TearUpObject.js";
import ScoreGameObject from "./ScoreGameObject.js";
import DamageCounter from "./DamageCounter.js";
import SpeedCounter from "./SpeedCounter.js";
import TearCounter from "./TearCounter.js";

class ItemRoomScene extends Scene{
    constructor(){
        super("Item Room");
    }

    start(){
        //Add Floor
        this.gameObjects.push(new FloorGameObject(0, 0, window.innerWidth, window.innerHeight));

        //Add Isaac
        if(Game.enterPosition == "north"){
            this.gameObjects.push(new IsaacGameObject(Constants.maxX / 2, 20 + Constants.wallWidth));
        }
        else if(Game.enterPosition == "east"){
            this.gameObjects.push(new IsaacGameObject(Constants.maxX - 20 - Constants.wallWidth, Constants.maxY / 2));
        }
        else if(Game.enterPosition == "south"){
            this.gameObjects.push(new IsaacGameObject(Constants.maxX / 2, Constants.maxY - 20 - Constants.wallWidth));
        }
        else if(Game.enterPosition == "west"){
            this.gameObjects.push(new IsaacGameObject(20 + Constants.wallWidth, Constants.maxY / 2));
        }

        //Add Item
        let item = Math.random() * 100;
        if(item <= 22){
            this.gameObjects.push(new HealthUpObject(Constants.maxX / 2 - 20, Constants.maxY / 2 - 20));
        }
        else if(item <= 44 && item > 22){
            this.gameObjects.push(new SpeedUpObject(Constants.maxX / 2 - 20, Constants.maxY / 2 - 20));
        }
        else if(item <= 66 && item > 44){
            this.gameObjects.push(new TearUpObject(Constants.maxX / 2 - 20, Constants.maxY / 2 - 20));
        }
        else if(item <= 100 && item > 66){
            this.gameObjects.push(new DamageUpObject(Constants.maxX / 2 - 20, Constants.maxY / 2 - 20))
        }

        //Add Health
        for(let i = 0; i < Game.health; i++){
            this.gameObjects.push(new HealthGameObject(Constants.wallWidth + 20 + (80 * i), Constants.wallWidth + 20));
        }

        //Add Score
        this.gameObjects.push(new ScoreGameObject(33, 140));

        //Add Damage
        this.gameObjects.push(new DamageCounter(33, Constants.maxY - 35));

        //Add Tear Rate
        this.gameObjects.push(new TearCounter(33, Constants.maxY - 65));

        //Add Speed
        this.gameObjects.push(new SpeedCounter(33, Constants.maxY - 95));

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
    }
}

export default ItemRoomScene;