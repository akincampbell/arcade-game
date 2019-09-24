//level
var level = 1;
//Display level Value
document.querySelector('.level span').innerHTML = level;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Set initial (random) location
    const maxX = 404; //Max width of the screen minus 101
    this.x = Math.floor(Math.random() * Math.floor(maxX)); //Set x position
    this.yValues = [42, 125, 208]; //Array of potential y yValues
    this.y = this.yValues[Math.floor(Math.random()* this.yValues.length)]; //Randomly select item from ^ potential y from yValues
    //Set speed
    this.speed = Math.floor((Math.random() * 50) + 10) * level; //Speed set to a random integer between 10 and 50. then multiply by current level to increase difficulty
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt); //^
    //Update enemy location and speed
    if (this.x >= 505){ //Reaches far right-side (end) of game area

      //Set enemy locattion
      this.x = -100; //Update enemy x position
      this.y = this.yValues[Math.floor(Math.random() * this.yValues.length)]; //Update enemy y position
      //Set enemy speed
      this.speed = Math.floor((Math.random() * 50) + 10) * level; //Update enemy speed
    }

    //Handle collision with the player
    if (this.x < player.x + 64  && this.x + 64  > player.x &&
		this.y < player.y + 64 && this.y + 64 > player.y){ //If these conditions met, then there was a collision. Referenced from http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/#d-collision-detection
      //Place player in initial position
      player.x = 200;
      player.y = 370;

      //Place enemies in random positions
      allEnemies.forEach(function(enemy){
        enemy.x = Math.floor(Math.random() * Math.floor(enemy.maxX));
        enemy.y = enemy.yValues[Math.floor(Math.random() * enemy.yValues.length)];
      });
      //alert("Hey");




      //Regress to level 1
      level = 1;

      //Display level Value
      document.querySelector('.level span').innerHTML = level;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Player class
var Player = function() {
  //Set player image
  this.sprite = 'images/char-boy.png';
  //Set initial player location
  this.x = 200; //Set x position
  this.y = 370; //Set y position

};

// Player update()
Player.prototype.update = function(dt){
  /*Empty*/
};

// Player render()
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player handleInput() method
Player.prototype.handleInput = function(keyClick) {
  //Direction switch by input keyClick
  switch (keyClick) {
    case 'up':
      this.y = this.y - 83;
      if (this.y < 0){
        this.x = 200;
        this.y = 370;
        level++; //Increment level when player reaches water (end)
        document.querySelector('.level span').innerHTML = level; //Increment in DOM
      }
    break;
    case 'down':
      if (this.y < 370) {
        this.y = this.y + 83;
      }
    break;
    case 'left':
      if (this.x > 0) {
        this.x = this.x - 101;
      }
    break;
    case 'right':
      if (this.x < 404) {
        this.x = this.x + 101;
      }
    break;
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()]; //Create 3 new enemy objects
// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
