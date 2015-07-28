function Car(speed,color) {
    XscrollObjt.call(this,speed);
    this.color = color;
	
    /*
        As for Truck, the display method will first check speed value to determine the direction.
        If speed > 0, then Car moves right, if speed < 0, then Car moves left.
        Ones the direction is determined, the sprite that will be displayed depends of Car's color
    */
    this.display = function() {
        if(this.speed > 0) {
            switch(this.color) {
                case 'red':
					game.context.drawImage(game.xScrollSprites,0,90,this.width,this.height,this.x,this.y,this.width,this.height);
                    break;
                case 'yellow':
                    game.context.drawImage(game.xScrollSprites,0,60,this.width,this.height,this.x,this.y,this.width,this.height);
                    break;
                case 'white':
                    game.context.drawImage(game.xScrollSprites,0,30,this.width,this.height,this.x,this.y,this.width,this.height);
                    break;
                case 'black':
                    game.context.drawImage(game.xScrollSprites,0,120,this.width,this.height,this.x,this.y,this.width,this.height);
                    break;
                default:
                    game.context.drawImage(game.xScrollSprites,0,90,this.width,this.height,this.x,this.y,this.width,this.height);
                    break;
            }
        } else {
            switch(this.color) {
                case 'red':
					game.context.drawImage(game.xScrollSprites,50,90,this.width,this.height,this.x,this.y,this.width,this.height);
                    break;
                case 'yellow':
                    game.context.drawImage(game.xScrollSprites,50,60,this.width,this.height,this.x,this.y,this.width,this.height);
                    break;
                case 'white':
                    game.context.drawImage(game.xScrollSprites,50,30,this.width,this.height,this.x,this.y,this.width,this.height);
                    break;
                case 'black':
                    game.context.drawImage(game.xScrollSprites,50,120,this.width,this.height,this.x,this.y,this.width,this.height);
                    break;
                default:
                    game.context.drawImage(game.xScrollSprites,50,90,this.width,this.height,this.x,this.y,this.width,this.height);
                    break;
            }
        }
    }
}