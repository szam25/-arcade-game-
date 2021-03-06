// Whole-script strict mode syntax
"use strict";
// Enemies our player must avoid
var X = 0 ;
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    X = x;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var random = (Math.random() * 200);
    this.x += random * 5 * dt;

    if (this.x >= 505) {
        this.x = X;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
};

Player.prototype.update = function() {
    if (this.x < 0) {
      this.reset(); 
    }
    if (this.y < -10){
    alert("Win");
    this.reset(); 
    }
    this.checkCollisions();
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

 Player.prototype.checkCollisions = function() {

        for (var i = 0, len = allEnemies.length; i < len ; i++) {

        if (this.x + 50 >= allEnemies[i].x && this.x < allEnemies[i].x + 50 && this.y < allEnemies[i].y + 50  && this.y + 50>= allEnemies[i].y ) {
            alert("Loose"); 
            this.reset();
        }
    }
};

Player.prototype.handleInput = function(move) {
    if (move == 'left') {

        this.x -= 101;
    }

    if (move == 'right' && this.x < 400) {

        this.x += 101;
    }
    if (move == 'up') {

        this.y -= 83;

    }
    if (move == 'down' && this.y < 400) {

        this.y += 83;

    }
};

Player.prototype.reset = function() {

    this.x = 202;
    this.y = 404;

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(-150, 200), new Enemy(-160, 125), new Enemy(-150, 50)];

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
