var refreshContext = function() {
	/*
	This function :
		- clear the context
		- check collisions
		- foreach objt in XscrollObjtList:
			- update Objt coordonates
			- check if Objt is fully out of the screen
			- if so, reset Objt position
			- if not, just display Objt
		- display water lily
		- display frogger by calling display method of Frogger
		while reading XscrollObjtList loop in order to display
		it after tree logs and before cars.
		So that frogger appears over logs but under cars (*1).
	*/
    game.context.drawImage(game.contextBackground,0,0,game.width,game.height);
    checkFroggerPosition(checkCollisions);
	for(var i = 0 ; i < game.xScrollObjtList.length ; i++) {
		if(i == 7) game.frogger.display(); // (*1)
		if(game.xScrollObjtList[i]) {
			for(var j = 0 ; j < game.xScrollObjtList[i].length ; j++) {
				var Objt = game.xScrollObjtList[i][j];
				Objt.move();
				if(Objt.speed < 0) { // if Objt moves from right to left
					if((Objt.x + Objt.width) < 0) {
						game.xScrollObjtList[i][j].x = game.width;
					} else {
						Objt.display();
					}
				} else { // if Objt moves from left to right
					if(Objt.x > game.width) {
						game.xScrollObjtList[i][j].x = -game.xScrollObjtList[i][j].width;
					} else {
						Objt.display();
					}
				}
			}
		}
	}
	for(var i = 0 ; i < game.waterLiliesList.length ; i++) {
		game.waterLiliesList[i].display();
	}
}

var checkFroggerPosition = function(callback) {
    /*
    This function :
        - check Frogger y position
        - depending of y position, check for eventual collisions (the function does nothing if 
        Frogger is in a safe zone, the point is that the program won't check collisions with 
        bottom positioned objects if Frogger is on the top of the screen).
		
        Report the following schema to see which condition corresponds to which zone

               ----------------------------------------------------------------
            0 |   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *    |} game.stepSize
            1 | *   *   *   *   *   * WATER LILIES ZONE *   *   *   *   *   *  |
            2 | ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~  | \
            3 |   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~    |  \
            4 | ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~  |   } WATER ZONES
            5 |   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~    |  /
            6 | ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~  | /
 SAFE ZONE  7 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 SAFE ZONE  8 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
            9 | =    =    =    =    =    =    =    =    =    =    =    =    =  | \
           10 |    =    =    =    =    =    =    =    =    =    =    =    =    |  \
           11 | =    =    =    =    =    =    =    =    =    =    =    =    =  |   } ROAD ZONES
           12 |    =    =    =    =    =    =    =    =    =    =    =    =    |  /
           13 | =    =    =    =    =    =    =    =    =    =    =    =    =  | /
 SAFE ZONE 14 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
               ----------------------------------------------------------------

    */
	
    if(game.frogger.y < 2*game.stepSize) { // ZONE 1
        callback(1);
    } else if((game.frogger.y > 2*game.stepSize) && (game.frogger.y < 3*game.stepSize)) { // 2ONE 2
        callback(2);
    } else if((game.frogger.y > 3*game.stepSize) && (game.frogger.y < 4*game.stepSize)) { // 2ONE 3
        callback(3);
    } else if((game.frogger.y > 4*game.stepSize) && (game.frogger.y < 5*game.stepSize)) { // 2ONE 4
        callback(4);
    } else if((game.frogger.y > 5*game.stepSize) && (game.frogger.y < 6*game.stepSize)) { // 2ONE 5
        callback(5);
    } else if((game.frogger.y > 6*game.stepSize) && (game.frogger.y < 7*game.stepSize)) { // 2ONE 6
        callback(6);
    } else if((game.frogger.y > 9*game.stepSize) && (game.frogger.y < 10*game.stepSize)) { // ZONE 9
        callback(9);
    } else if((game.frogger.y > 10*game.stepSize) && (game.frogger.y < 11*game.stepSize)) { // ZONE 10
        callback(10);
    } else if((game.frogger.y > 11*game.stepSize) && (game.frogger.y < 12*game.stepSize)) { // ZONE 11
        callback(11);
    } else if((game.frogger.y > 12*game.stepSize) && (game.frogger.y < 13*game.stepSize)) { // ZONE 12
        callback(12);
    } else if((game.frogger.y > 13*game.stepSize) && (game.frogger.y < 14*game.stepSize)) { // ZONE 13
        callback(13);
    }/* else {
        // --- do nothing ---
    }	
    */
}

var checkCollisions = function(index) {
	if(index == 1) { // WATER LILIES ZONE
		for(var i = 0, count = 0 ; i < game.waterLiliesList.length ; i++) {
			if(((game.frogger.x + game.frogger.dim - game.stepSize/2) > game.waterLiliesList[i].x) && (game.frogger.x < (game.waterLiliesList[i].x + game.waterLiliesList[i].dim - game.stepSize/2))) {
				if(game.waterLiliesList[i].taken != 0) {
					if(game.frogger.animation <= 0) {
						game.frogger.looseLife();
						game.frogger.animation = 3;
					}
				} else {
					game.frogger.isArrived();
					if(game.frogger.animation <= 0) game.frogger.animation = 5;
					game.waterLiliesList[i].taken = 1;
				}		
			} else {
				count++;
			}
			/*
			count increments if frogger is not on a water lily
			just before we get out of the loop we check count value
			if count = the number of times the loop was executed
			that means frogger is on none water lily, so he dies
			*/
			if((i == (game.waterLiliesList.length - 1)) && (count == game.waterLiliesList.length)) {
				if(game.frogger.animation <= 0) {
					game.frogger.looseLife();
					game.frogger.animation = 2;
				}
			}
		}
		resetTimer();
	} else if((index >= 2) && (index <= 6)) { // WATER ZONES
		for(var i = 0, count = 0 ; i < game.xScrollObjtList[index].length ; i++) {
			if(((game.frogger.x + game.frogger.dim - game.stepSize/2) > game.xScrollObjtList[index][i].x) && (game.frogger.x < (game.xScrollObjtList[index][i].x + game.xScrollObjtList[index][i].width - game.stepSize/2))) {
				if((game.frogger.x > 0) && ((game.frogger.x + game.frogger.dim) < game.width) && (game.frogger.animation <= 0)) {
					game.frogger.x += game.xScrollSpeedList[index]/3;
				}
			} else {
				count++;
			}
			/*
			count behavior is the same as for condition index == 1
			*/
			if((i == (game.xScrollObjtList[index].length - 1)) && (count == game.xScrollObjtList[index].length)) {
				if(game.frogger.animation <= 0) {
					game.frogger.looseLife();
					game.frogger.animation = 2;
				}
				resetTimer();
			}
		}
	} else { // ROAD ZONES
		for(var i = 0 ; i < game.xScrollObjtList[index].length ; i++) {
			if(((game.frogger.x + game.frogger.dim) > game.xScrollObjtList[index][i].x) && (game.frogger.x < (game.xScrollObjtList[index][i].x + game.xScrollObjtList[index][i].width))) {
				if(game.frogger.animation <= 0) {
					game.frogger.looseLife();
					game.frogger.animation = 1;
				}
				resetTimer();
			}
		}
	}
}

var displayLifeBar = function() {
	document.getElementById('life_bar').innerHTML = null;
	for(var i = 0 ; i < game.frogger.lives ; i++) { document.getElementById('life_bar').innerHTML += '<img src="img/frogger_life.png" alt="" />'; }
}

var displayTimer = function() {
	game.remainingTime--;
	if(game.remainingTime < 1) {
		game.remainingTime = 0;
		if(game.frogger.animation <= 0) {
			game.frogger.looseLife();
			game.frogger.animation = 4;
		}
		resetTimer();
	}
	document.getElementById('timer').innerHTML = (game.remainingTime > 9) ? game.remainingTime : '0' + game.remainingTime;
}

var resetTimer = function() {
	clearInterval(game.timerInterval);
	game.timerInterval = null;
	game.remainingTime = 61;
	displayTimer();
}

var displayMessage = function(message) {
    game.context.font = "20pt Arial";
    game.context.fillStyle = "#fff";
    game.context.fillText(message, 250, 250);
}