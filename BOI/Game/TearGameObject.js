import Circle from "../Engine/Circle.js";
import CircleDraw from "../Engine/CircleDraw.js";
import GameObject from "../Engine/GameObject.js";
import TearUpdateComponent from "./TearUpdateComponent.js";

class TearGameObject extends GameObject{
    constructor(x, y, velX, velY){
        super();
        this.r = 6.5;
        this.velX = velX;
        this.velY = velY;
        this.components.push(new Circle(this, x, y, this.r));
        this.components.push(new CircleDraw(this, "blue", "black"));
        this.components.push(new TearUpdateComponent(this));
    }
}

export default TearGameObject;