import GameObject from "../Engine/GameObject.js";
import Circle from "../Engine/Circle.js";
import CircleDraw from "../Engine/CircleDraw.js";
import IsaacUpdateComponent from "./IsaacUpdateComponent.js";

class IsaacGameObject extends GameObject{
    constructor(x, y){
        super();
        this.r = 20;
        this.components.push(new Circle(this, x, y, this.r));
        this.components.push(new CircleDraw(this, "rgb(228, 198, 199)", "black"));
        this.components.push(new IsaacUpdateComponent(this));
    }
}

export default IsaacGameObject;