import GameObject from "../Engine/GameObject.js";
import Rectangle from "../Engine/Rectangle.js";
import RectangleDraw from "../Engine/RectangleDraw.js";

class WallGameObject extends GameObject{
    constructor(x, y, w, h){
        super();
        this.components.push(new Rectangle(this, x, y, w, h));
        this.components.push(new RectangleDraw(this, "rgb(64, 35, 31)", "transparent"));
    }
}

export default WallGameObject;