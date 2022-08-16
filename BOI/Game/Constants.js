class Constants{
    static wallWidth = 15;
    static maxX = window.innerWidth;
    static maxY = window.innerHeight;
    static doorWidth = 125;
    static longWallLength = this.maxX/2 - this.doorWidth/2
    static shortWallLength = this.maxY/2 - this.doorWidth/2
}

export default Constants;