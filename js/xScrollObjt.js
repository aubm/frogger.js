function XscrollObjt(speed) {
    /*
    This object models every horizontal scrolling object on the screen.
    Truck, Car and Platforms inherit of XscrollObjt
    */
	this.width = 50;
    this.height = 30;
	this.speed = speed;
    this.x = (this.speed < 0) ? game.width-this.width : 0;
    this.y = 0;
	
    this.move = function() {
        if(this.speed < 0) {
            this.x -= Math.abs(this.speed)/3;
        } else {
            this.x += Math.abs(this.speed)/3;
        }
    }
}