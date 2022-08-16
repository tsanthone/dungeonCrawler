import GameObject from "../Engine/GameObject.js";
import Rectangle from "../Engine/Rectangle.js";
import RectangleDraw from "../Engine/RectangleDraw.js";

class FloorGameObject extends GameObject{
    constructor(x, y, w, h){
        super();
        this.components.push(new Rectangle(this, x, y, w, h));
        this.components.push(new RectangleDraw(this, "rgb(89, 61, 50)", "transparent"));
    }
}

export default FloorGameObject;