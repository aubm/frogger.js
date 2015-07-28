function Game() {
	this.width = 650;
	this.height = 450;
	this.stepSize = 30;
	this.objDistance = 50;
	this.objMaxSpeed = 4;
	this.objMinSpeed = 2;
	this.animationSpeed = 30;
	this.leftArrow = 37;
	this.upArrow = 38;
	this.rightArrow = 39;
	this.downArrow = 40;
	this.context;
	this.frogger;
	this.contextBackground = new Image();
	this.froggerSprite = new Image();
	this.xScrollSprites = new Image();
	/*
		XscrollObjt is a 2 dimensions array which contains a
		list of all horizontal scrolling objects on the screen.
		The first dimension are index corresponding to zones numbers
		(see schema in functions.js)
		Here is a graphic representation of XscrollObjtList :
		* : car / truck
		# : platform
		----------------------------------------------------------------
	   | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | <--- Index
		----------------------------------------------------------------
	   |   |   | # | # | # | # | # |   |   | * | *  | *  | *  | *  |    |
		----------------------------------------------------------------
	   |   |   | # | # | # | # | # |   |   | * | *  | *  | *  | *  |    |
		----------------------------------------------------------------
	   |   |   | # | # | # | # | # |   |   | * | *  | *  | *  | *  |    |
		----------------------------------------------------------------
	*/
	this.xScrollObjtList = new Array();
	/*
		XscrollSpeed is an array which contains a
		list of different speed values which index corresponds to XscrollObjtList's index.
		For exemple, speed value at index 3 will be assigned to objects in the array at index 3
		of XscrollObjt.
		Each speed value is randomly calculted at game initialisation.
	*/
	this.xScrollSpeedList = new Array();
	this.waterLiliesList = new Array();
	this.refreshContextInterval;
	this.timerInterval = null;
	this.remainingTime = 61;
}