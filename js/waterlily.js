function WaterLily() {
	this.dim = 30;
	this.x = 42;
	this.y = game.stepSize;
	this.taken = 0;
	/*
	this.taken can have three values:
		- 0 : the water lily has no frogger on it
		- 1 : the water lily just got taken by a frogger
		- 2 : the water lily is occupied
	Making the difference between states 1 and 2 is necessary for frogger animation
	*/
	
	this.display = function() {
		if(this.taken != 0) {
			if(this.taken == 1) {
				if(game.frogger.animation != 5) game.context.drawImage(game.froggerSprite,0,60,20,20,this.x+5,this.y+5,20,20);
			} else {
				game.context.drawImage(game.froggerSprite,0,60,20,20,this.x+5,this.y+5,20,20);
			}
		}
	}
}