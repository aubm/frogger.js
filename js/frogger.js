function Frogger() {
    this.dead = false;
	this.lives = 3;
	this.arrived = false; // turned true when frogger reach a water lily
    this.direction = 'up';
    this.dim = 20;
    this.x = game.width/2 - this.dim/2;
    this.y = 14*game.stepSize + (game.stepSize - this.dim)/2;
	this.animation = 0;
	this.animationTimer = null;
	this.animationCursor = 0;
	this.cropX = 0;
	this.cropY = 0;
	this.message = null;
	
    this.display = function() {
		if(this.animation <= 0) {
			this.cropX = (this.animation == 0) ? 0 : 20;
			switch(this.direction) {
				case 'up':
					this.cropY = 40;
					break;
				case 'left':
					this.cropY = 20;
					break;
				case 'right':
					this.cropY = 0;
					break;
				case 'down':
					this.cropY = 60;
					break;
				default:
					break;
			}
		} else {
			if(this.animation == 6) {
				this.message = 'GAME OVER';
			} else {
				if(!this.animationTimer) {
					switch(this.animation) {
						case 1:
							/*
							Animation played when frogger gets hitten by a car or an truck
							*/
							this.message = 'YOU LOSE';
							this.cropY = 80;
							this.animationTimer = setInterval(function() {
								if(self.animationCursor < (2000/game.animationSpeed)) {
									self.animationCursor++;
									if(self.animationCursor < ((2000/game.animationSpeed)/8)) {
										self.cropX = 0;
									} else {
										self.cropX = 20;
									}
								} else {
									self.resetPosition();
									self.clearAnimationInterval();
									self.message = null;
									self.checkIfDead();
								}
							},game.animationSpeed);
							break;
						case 2:
							/*
							Animation played when frogger falls in the river
							*/
							this.message = 'YOU LOSE';
							this.cropY = 100;
							this.animationTimer = setInterval(function() {
								if(self.animationCursor < (2000/game.animationSpeed)) {
									self.animationCursor++;
									if(self.animationCursor < ((2000/game.animationSpeed)*0.25)) {
										self.cropX = 0;
									} else {
										if(self.animationCursor < ((2000/game.animationSpeed)*0.5)) {
											self.cropX = 20;
										} else {
											if(self.animationCursor < ((2000/game.animationSpeed)*0.75)) {
												self.cropX = 0;
											} else {
												self.cropX = 20;
											}
										}
									}
								} else {
									self.resetPosition();
									self.clearAnimationInterval();
									self.message = null;
									self.checkIfDead();
								}
							},game.animationSpeed);
							break;
						case 3:
							/*
							Animation played when frogger jumps on occupied water lily
							*/
							this.message = 'YOU LOSE';
							this.cropY = 100;
							this.animationTimer = setInterval(function() {
								if(self.animationCursor < (2000/game.animationSpeed)) {
									self.animationCursor++;
									if(self.animationCursor < ((2000/game.animationSpeed)*0.25)) {
										self.cropX = 0;
									} else {
										if(self.animationCursor < ((2000/game.animationSpeed)*0.5)) {
											self.cropX = 20;
										} else {
											if(self.animationCursor < ((2000/game.animationSpeed)*0.75)) {
												self.cropX = 0;
											} else {
												self.cropX = 20;
											}
										}
									}
								} else {
									self.resetPosition();
									self.clearAnimationInterval();
									self.message = null;
									self.checkIfDead();
								}
							},game.animationSpeed);
							break;
						case 4:
							/*
							Animation played when timer ends
							*/
							this.message = 'YOU LOSE';
							this.cropY = 120;
							this.animationTimer = setInterval(function() {
								if(self.animationCursor < (2000/game.animationSpeed)) {
									self.animationCursor++;
									this.animationTimer = setInterval(function() {
										if(self.animationCursor < ((2000/game.animationSpeed)/2)) {
											self.cropX = 0;
										} else {
											self.cropX = 20;
										}
									});
								} else {
									self.resetPosition();
									self.clearAnimationInterval();
									self.message = null;
									self.checkIfDead();
								}
							},game.animationSpeed);
							break;
						case 5:
							/*
							Animation played when frogger reach a water lily
							*/
							this.message = 'YOU WIN';
							this.animationTimer = setInterval(function() {
								if(self.animationCursor < (2000/game.animationSpeed)) {
									self.animationCursor++;
									if(self.animationCursor < 6) {
										self.animationCursor++;
										self.y -= game.stepSize/4;
									} else {
										if(self.animationCursor < 9) {
											self.cropX = 0;
											self.cropY = 20;
										} else {
											self.cropX = 0;
											self.cropY = 60;
										}
									}
								} else {
									self.resetPosition();
									self.clearAnimationInterval();
									self.message = null;
									for(var i = 0 , count = 0 ; i < game.waterLiliesList.length ; i++) {
										if(game.waterLiliesList[i]) {
											if(game.waterLiliesList[i].taken == 1)  {
												game.waterLiliesList[i].taken = 2;
											}
											if(game.waterLiliesList[i].taken == 2) count++;
										}
										if(count == game.waterLiliesList.length) {
											self.animation = 6;
										}
									}
								}
							},game.animationSpeed);
							break;
						default:
							break;
					}
				}
			}
		}
		if(this.cropX != -1) game.context.drawImage(game.froggerSprite,this.cropX,this.cropY,this.dim,this.dim,this.x,this.y,this.dim,this.dim);
		if(this.message) displayMessage(this.message);
    }
	
	this.looseLife = function() {
		this.clearAnimationInterval();
		this.lives--;
		displayLifeBar();
		if(this.lives <= 0) {
			this.dead = true;
		}
	}
	
	this.isArrived = function() {
		this.arrived = true;
		this.clearAnimationInterval();
	}
	
	this.checkIfDead = function() {
		if(this.dead) {
			this.animation = 6;
			this.cropX = 20;
			this.cropY = 120;
		}
	}
	
	this.clearAnimationInterval = function() {
		/*
		This function clear Animation Interval
		It's called when an event stops frogger in the middle of a moves
		The function prevents frogger to finish his move after his position has been reset
		*/
		if(!this.dim) {
			clearInterval(self.animationTimer);
			self.animationTimer = null;
			self.animation = 0;
			self.animationCursor = 0;
		} else {
			clearInterval(this.animationTimer);
			this.animationTimer = null;
			this.animation = 0;
			this.animationCursor = 0;
		}
	}
	
	this.resetPosition = function() {
		this.arrived = false;
		this.direction = 'up';
		this.x = game.width/2 - this.dim/2;
		this.y = 14*game.stepSize + (game.stepSize - this.dim)/2;
	}
	
    this.moveRight = function() {
		this.animation = -1;
        this.direction = 'right';
		this.animationTimer = setInterval(function() {
			if(self.animationCursor < 4) {
				self.animationCursor++;
				self.x += game.stepSize/4;
			} else {
				self.clearAnimationInterval();
			}
		},game.animationSpeed);
    }
	
    this.moveLeft = function() {
		this.animation = -1;
        this.direction = 'left';
		this.animationTimer = setInterval(function() {
			if(self.animationCursor < 4) {
				self.animationCursor++;
				self.x -= game.stepSize/4;
			} else {
				self.clearAnimationInterval();
			}
		},game.animationSpeed);
    }
	
    this.moveUp = function() {
        this.animation = -1;
        this.direction = 'up';
		this.animationTimer = setInterval(function() {
			if(self.animationCursor < 4) {
				self.animationCursor++;
				self.y -= game.stepSize/4;
			} else {
				self.clearAnimationInterval();
			}
		},game.animationSpeed);
    }
	
    this.moveDown = function() {
        this.animation = -1;
        this.direction = 'down';
		this.animationTimer = setInterval(function() {
			if(self.animationCursor < 4) {
				self.animationCursor++;
				self.y += game.stepSize/4;
			} else {
				self.clearAnimationInterval();
			}
		},game.animationSpeed);
    }
	
	var self = this;
}