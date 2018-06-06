function Game (canvasElement){
    this.ctx = canvasElement.getContext("2d");
    this.bk = new Background(this.ctx);
    this.mario = new Mario(this.ctx);
    this.obstacles = [];

    this.setKeyboardListeners();
}

Game.prototype.start = function(){
    this.createObstacles();
    this.gameLoop = setInterval(function (){
        this.clearAll();
        this.drawAll();
        this.moveAll();
        this.checkCollisions();
    }.bind(this), 16)
}


Game.prototype.drawAll = function (){
    this.bk.draw();
    this.mario.draw();
    this.drawObstacles();
}

Game.prototype.drawObstacles = function (){
    this.obstacles.forEach(function(obstacle){
        obstacle.draw();
    })

}

Game.prototype.moveAll = function (){
    this.mario.move();
    this.bk.move();
}

Game.prototype.clearAll = function (){
    this.ctx.clearRect(
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
    );
}

Game.prototype.setKeyboardListeners = function (){
    document.onkeydown = function(event) {
        this.onKeyDown(event.keyCode);
      }.bind(this);
    
      document.onkeyup = function(event) {
        this.onKeyUp(event.keyCode);
      }.bind(this);
// esta la he copiado tal cual y no la entiendo!
}

Game.prototype.createObstacles = function () {
    this.obstacles.push(

    // tubos piso 0
    // new Obstacle (this.ctx, 1205, 450, 90, 90),
    // new Obstacle(this.ctx, 1635, 407, 90, 132),
     new Obstacle(this.ctx, 1979, 365, 90, 175),
    // new Obstacle(this.ctx, 2453, 365, 90, 175),
    // new Obstacle(this.ctx, 7015, 450, 90, 90),
    // new Obstacle(this.ctx, 7705, 450, 90, 90),

    // // ladrillos piso 1
    // new Obstacle(this.ctx, 860, 365, 46, 46),
    // new Obstacle(this.ctx, 945, 365, 46, 46),
    // new Obstacle(this.ctx, 1032, 365, 46, 46),
    // new Obstacle(this.ctx, 3314, 365, 46, 46),
    // new Obstacle(this.ctx, 3400, 365, 46, 46),
    // new Obstacle(this.ctx, 4046, 365, 46, 46),
    // new Obstacle(this.ctx, 4303, 365, 92, 46),
    // new Obstacle(this.ctx, 5080, 365, 46, 46),
    // new Obstacle(this.ctx, 5550, 365, 92, 46),
    // new Obstacle(this.ctx, 7230, 365, 92, 46),
    // new Obstacle(this.ctx, 7361, 365, 46, 46)

    )
};

Game.prototype.checkCollisions = function () {
    this.mario.collide(this.obstacles);
    
};

Game.prototype.RIGHT = 39;
Game.prototype.LEFT = 37;
Game.prototype.TOP = 38;
Game.prototype.DOWN = 40;

Game.prototype.onKeyDown = function (code){
    this.mario.onKeyDown(code);
    this.bk.onKeyDown(code, this.mario.x)
};

Game.prototype.onKeyUp = function (code){
    this.mario.onKeyUp(code);
    this.bk.onKeyUp(code);
};