function Platform(speed,width) {
    XscrollObjt.call(this,speed);
    /*
    Widths are : 50 - 85 - 125 
    Here we use the same sprite for all widths
    */
    this.width = width;
		
    this.display = function() {
		game.context.drawImage(game.xScrollSprites,0,150,125,30,this.x,this.y,this.width,this.height);
    }
}