import GameObject from "../Engine/GameObject.js";
import Rectangle from "../Engine/Rectangle.js";
import RectangleDraw from "../Engine/RectangleDraw.js";
import BossUpdateComponent from "./BossUpdateComponent.js";
import Game from "../Engine/Game.js";

class BossGameObject extends GameObject{
    constructor(x, y){
        super();
        this.w = 80;
        this.h = 80;
        this.health = Game.monsterHealth * 10;
        this.components.push(new Rectangle(this, x, y, this.w, this.h));
        this.components.push(new RectangleDraw(this, "rgb(49, 63, 42)", "black"));
        this.components.push(new BossUpdateComponent(this));
    }
}

export default BossGameObject;