import GameObject from "../Engine/GameObject.js";
import Rectangle from "../Engine/Rectangle.js";
import RectangleDraw from "../Engine/RectangleDraw.js";

class HealthGameObject extends GameObject{
    constructor(x, y){
        super();
        this.w = 60;
        this.h = 60;
        this.components.push(new Rectangle(this, x, y, this.w, this.h));
        this.components.push(new RectangleDraw(this, "rgb(145, 40, 55)", "black"));
    }
}

export default HealthGameObject;