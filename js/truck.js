function Truck(speed) {
    XscrollObjt.call(this,speed);
    this.width = 75;
	
    this.display = function() {
        if(this.speed > 0) {
            game.context.drawImage(game.xScrollSprites,0,0,this.width,this.height,this.x,this.y,this.width,this.height);
        } else {
            game.context.drawImage(game.xScrollSprites,75,0,this.width,this.height,this.x,this.y,this.width,this.height);
        }
    }
}