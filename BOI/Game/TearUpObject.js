import GameObject from "../Engine/GameObject.js";
import Rectangle from "../Engine/Rectangle.js";
import RectangleDraw from "../Engine/RectangleDraw.js";

class TearUpObject extends GameObject{
    constructor(x, y){
        super();
        this.w = 40;
        this.h = 40;
        this.components.push(new Rectangle(this, x, y, this.w, this.h));
        this.components.push(new RectangleDraw(this, "blue", "black"));
    }
}

export default TearUpObject;