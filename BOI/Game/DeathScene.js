import Scene from "../Engine/Scene.js";
import Constants from "./Constants.js";
import YoudDiedGameObject from "./YouDiedGameObject.js";

class DeathScene extends Scene{
    constructor(){
        super("Death Scene");
    }

    start(){
        this.gameObjects.push(new YoudDiedGameObject(Constants.maxX / 2 - 125, Constants.maxY / 2));
    }
}

export default DeathScene;