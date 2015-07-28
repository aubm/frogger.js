var game = null;

window.addEventListener('load',function() {
	game = new Game();
    var elem = document.getElementById('canvas');
    if(!elem || !elem.getContext) {
        return;
    }
    game.context = elem.getContext('2d');
    if(!game.context) {
        return;
    }

    game.froggerSprite.src = 'img/frogger.png';
	game.xScrollSprites.src = 'img/x_scroll_sprites.png';
    game.contextBackground.src = 'img/canvas.png';
    
    game.frogger = new Frogger();
	
	/* 
	Now calculating random speed values.
	One on two speed value is negative in order to change vehicle direction
	(see comment in class Car for explanations)
	*/
	for(var i = 0 ; i < 15 ; i++) {
		if((i != 0) && (i != 1) && (i != 7) && (i != 8) && (i != 14)) {
			game.xScrollSpeedList[i] = (i%2 == 0) ? Math.floor(Math.random()*(game.objMaxSpeed+1-game.objMinSpeed))+game.objMinSpeed : (Math.floor(Math.random()*(game.objMaxSpeed+1-game.objMinSpeed))+game.objMinSpeed)*(-1);
		} else {
			game.xScrollSpeedList[i] = null;
		}
	}
	
	/*
	Now completing XscrollObjtList array.
	index i refers to the zone number
	(see XscrollObjtList description in vars.js for explanations)
	*/
    for(var i = 0 ; i < 15 ; i++) {
        if((i != 0) && (i != 1) && (i != 7) && (i != 8) && (i != 14)) {
			switch(i) {
				case 2: // 3 long tronks
					game.xScrollObjtList[i] = new Array(3);
					game.xScrollObjtList[i][0] = new Platform(game.xScrollSpeedList[i],125);
					game.xScrollObjtList[i][1] = new Platform(game.xScrollSpeedList[i],125);
					game.xScrollObjtList[i][2] = new Platform(game.xScrollSpeedList[i],125);
					break;
				case 3: // 3 middle size tronks
					game.xScrollObjtList[i] = new Array(3);
					game.xScrollObjtList[i][0] = new Platform(game.xScrollSpeedList[i],85);
					game.xScrollObjtList[i][1] = new Platform(game.xScrollSpeedList[i],85);
					game.xScrollObjtList[i][2] = new Platform(game.xScrollSpeedList[i],85);
					break;
				case 4: // 3 short tronks
					game.xScrollObjtList[i] = new Array(3);
					game.xScrollObjtList[i][0] = new Platform(game.xScrollSpeedList[i],50);
					game.xScrollObjtList[i][1] = new Platform(game.xScrollSpeedList[i],50);
					game.xScrollObjtList[i][2] = new Platform(game.xScrollSpeedList[i],50);
					game.xScrollObjtList[i][2].width = 50;
					break;
				case 5: // 3 middle size tronks
					game.xScrollObjtList[i] = new Array(3);
					game.xScrollObjtList[i][0] = new Platform(game.xScrollSpeedList[i],85);
					game.xScrollObjtList[i][1] = new Platform(game.xScrollSpeedList[i],85);
					game.xScrollObjtList[i][2] = new Platform(game.xScrollSpeedList[i],85);
					break;
				case 6: // 3 long tronks
					game.xScrollObjtList[i] = new Array(3);
					game.xScrollObjtList[i][0] = new Platform(game.xScrollSpeedList[i],125);
					game.xScrollObjtList[i][1] = new Platform(game.xScrollSpeedList[i],125);
					game.xScrollObjtList[i][2] = new Platform(game.xScrollSpeedList[i],125);
					break;
				case 9: // 3 trucks
					game.xScrollObjtList[i] = new Array(3);
					game.xScrollObjtList[i][0] = new Truck(game.xScrollSpeedList[i]);
					game.xScrollObjtList[i][1] = new Truck(game.xScrollSpeedList[i]);
					game.xScrollObjtList[i][2] = new Truck(game.xScrollSpeedList[i]);
					break;
				case 10: // 3 yellow cars
					game.xScrollObjtList[i] = new Array(3);
					game.xScrollObjtList[i][0] = new Car(game.xScrollSpeedList[i],'yellow');
					game.xScrollObjtList[i][1] = new Car(game.xScrollSpeedList[i],'yellow');
					game.xScrollObjtList[i][2] = new Car(game.xScrollSpeedList[i],'yellow');
					break;
				case 11: // 3 white cars
					game.xScrollObjtList[i] = new Array(3);
					game.xScrollObjtList[i][0] = new Car(game.xScrollSpeedList[i],'white');
					game.xScrollObjtList[i][1] = new Car(game.xScrollSpeedList[i],'white');
					game.xScrollObjtList[i][2] = new Car(game.xScrollSpeedList[i],'white');
					break;
				case 12: // 3 black cars
					game.xScrollObjtList[i] = new Array(3);
					game.xScrollObjtList[i][0] = new Car(game.xScrollSpeedList[i],'black');
					game.xScrollObjtList[i][1] = new Car(game.xScrollSpeedList[i],'black');
					game.xScrollObjtList[i][2] = new Car(game.xScrollSpeedList[i],'black');
					break;
				case 13: // 3 red cars
					game.xScrollObjtList[i] = new Array(3);
					game.xScrollObjtList[i][0] = new Car(game.xScrollSpeedList[i],'red');
					game.xScrollObjtList[i][1] = new Car(game.xScrollSpeedList[i],'red');
					game.xScrollObjtList[i][2] = new Car(game.xScrollSpeedList[i],'red');
					break;
				default:
					break;
			}
			/*
			Now setting y properties for each object in XscrollObjtList
			Then move second and third sprites left or right (depending of direction(speed +/-))
			if we don't, second and thrid sprites will be hidden by the first one because of
			the superposition
			*/
			for(var j = 0 ; j < game.xScrollObjtList[i].length ; j++) {
				game.xScrollObjtList[i][j].y = i*game.stepSize;
				if(game.xScrollSpeedList[i] < 0) {
					game.xScrollObjtList[i][1].x -= game.objDistance;
					game.xScrollObjtList[i][2].x -= 2*game.objDistance;
				} else {
					game.xScrollObjtList[i][1].x += game.objDistance;
					game.xScrollObjtList[i][2].x += 2*game.objDistance;
				}
			}
		/*
		For this particular zone where 5 water lilies will be displayed,
		we'll add 5 WaterLily objects to waterLiliesList array
		*/
		} else if(i == 1) {
			for(j = 0 ; j < 5 ; j++) {
				game.waterLiliesList[j] = new WaterLily();
				game.waterLiliesList[j].x += j*132;
			}
		/*
		If index refers to a safe zone,
		set XscrollObjtList's case to null
		*/
        } else {
            game.xScrollObjtList[i] = null;
        }
    }
	
	/*
	Now displaying others game elements
	(life bar, timer, ...)
	*/
	displayLifeBar();
	displayTimer();
	
    game.refreshContextInterval = setInterval(refreshContext,10);
});

/*	Now programming controls
    key id :
        - game.leftArrow : move left
        - game.upArrow : move up
        - game.rightArrow : move right
        - game.downArrow : move down
*/
window.addEventListener('keydown',function(e) {
	if(!game.frogger.dead && !game.frogger.arrived && (game.frogger.animation == 0)) {
		if((e.keyCode == game.upArrow) || (e.keyCode == game.leftArrow) || (e.keyCode == game.rightArrow) || (e.keyCode == game.downArrow)) {
			if(!game.timerInterval) {
				game.timerInterval = setInterval(displayTimer,1000);
			}
			switch(e.keyCode) {
				case game.upArrow:
					if((game.frogger.y - game.stepSize) > 0) {
						game.frogger.moveUp();
					}
					break;
				case game.leftArrow:
					if((game.frogger.x - game.stepSize) > 0) {
						game.frogger.moveLeft();
					}
					break;
				case game.rightArrow:
					if((game.frogger.x + game.stepSize) < (game.width - game.stepSize)) {
						game.frogger.moveRight();
					}
					break;
				case game.downArrow:
					if((game.frogger.y + game.stepSize) < game.height) {
						game.frogger.moveDown();
					}
					break;
				default:
					break;
			}
		}
	}
	return false;
});