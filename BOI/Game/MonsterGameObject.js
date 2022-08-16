import GameObject from "../Engine/GameObject.js";
import Rectangle from "../Engine/Rectangle.js";
import RectangleDraw from "../Engine/RectangleDraw.js";
import MonsterUpdateComponent from "./MonsterUpdateComponent.js";
import Game from "../Engine/Game.js";

class MonsterGameObject extends GameObject{
    constructor(x, y){
        super();
        this.w = 40;
        this.h = 60;
        this.health = Game.monsterHealth;
        this.components.push(new Rectangle(this, x, y, this.w, this.h));
        this.components.push(new RectangleDraw(this, "rgb(74, 88, 67)", "black"));
        this.components.push(new MonsterUpdateComponent(this));
    }
}

export default MonsterGameObject;