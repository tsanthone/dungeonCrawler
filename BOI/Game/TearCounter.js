import Game from "../Engine/Game.js";
import GameObject from "../Engine/GameObject.js";
import Text from "../Engine/Text.js";
import TextDraw from "../Engine/TextDraw.js";
import Constants from "./Constants.js";

class TearCounter extends GameObject{
    constructor(x, y){
        super();
        this.components.push(new Text(this, x, y, "Tear Rate: " + Game.tearRate, "25px sans"));
        this.components.push(new TextDraw(this, "black", "transparent"));
    }
}

export default TearCounter;