import GameObject from "../Engine/GameObject.js";
import Text from "../Engine/Text.js";
import TextDraw from "../Engine/TextDraw.js";
import Constants from "./Constants.js";

class YouDiedGameObject extends GameObject{
    constructor(x, y){
        super();
        this.components.push(new Text(this, x, y, "YOU DIED", "50px sans"));
        this.components.push(new TextDraw(this, "white", "transparent"));
    }
}

export default YouDiedGameObject;