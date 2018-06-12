function Game (canvasElement){
    this.ctx = canvasElement.getContext("2d");
    this.bk = new Background(this.ctx);
    this.mario = new Mario(this.ctx);
    this.guide = new Guide(this.ctx, 600, 0, 1, 600)
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
    //this.guide.draw();
    //this.drawObstacles();
}

Game.prototype.moveAll = function (){
    this.mario.move();
    this.bk.move(this.mario.x);
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
        this.onKeyDown(event);
      }.bind(this);
    
      document.onkeyup = function(event) {
        this.onKeyUp(event);
      }.bind(this);
}


Game.prototype.checkCollisions = function () {
    var crashPipe = this.mario.checkCollisions(this.obstacles, this.bk);

    if(crashPipe.length > 0 && this.mario.isBloqued) {
        this.bk.isBloqued = true;
    } else {
        this.bk.isBloqued = false;
        this.mario.isBloqued = false;
    }
};

Game.prototype.RIGHT = 39;
Game.prototype.LEFT = 37;
Game.prototype.TOP = 38;
Game.prototype.DOWN = 40;

Game.prototype.onKeyDown = function (event){
    this.mario.onKeyEvent(event);
    this.bk.onKeyEvent(event);
};

Game.prototype.onKeyUp = function (event){
    this.mario.onKeyEvent(event);
    this.bk.onKeyEvent(event);
};


Game.prototype.createObstacles = function () {
    this.obstacles.push(
    // tubos piso 0
    new Obstacle (this.ctx, 1205, 450, 90, 90),
    new Obstacle(this.ctx, 1635, 407, 90, 132),
    new Obstacle(this.ctx, 1979, 365, 90, 175),
    new Obstacle(this.ctx, 2453, 365, 90, 175),
    new Obstacle(this.ctx, 7015, 450, 90, 90),
    new Obstacle(this.ctx, 7705, 450, 90, 90),

    // ladrillos piso 1

    new Obstacle(this.ctx, 689, 365, 46, 46),
    new Obstacle(this.ctx, 860, 365, 46, 46),
    new Obstacle(this.ctx, 904, 365, 46, 46),
    new Obstacle(this.ctx, 945, 365, 46, 46),
    new Obstacle(this.ctx, 990, 365, 46, 46),
    new Obstacle(this.ctx, 1032, 365, 46, 46),
    new Obstacle(this.ctx, 3314, 365, 46, 46),
    new Obstacle(this.ctx, 3358, 365, 46, 46),
    new Obstacle(this.ctx, 3400, 365, 46, 46),
    new Obstacle(this.ctx, 4046, 365, 46, 46),
    new Obstacle(this.ctx, 4303, 365, 92, 46),
    new Obstacle(this.ctx, 4562, 365, 46, 46),
    new Obstacle(this.ctx, 4692, 365, 46, 46),
    new Obstacle(this.ctx, 4820, 365, 46, 46),
    new Obstacle(this.ctx, 5080, 365, 46, 46),
    new Obstacle(this.ctx, 5550, 365, 92, 46),
    new Obstacle(this.ctx, 7230, 365, 92, 46),
    new Obstacle(this.ctx, 7319, 365, 46, 46),
    new Obstacle(this.ctx, 7361, 365, 46, 46),

    // ladrillo piso 2
    new Obstacle(this.ctx, 946, 194, 46, 46),
    new Obstacle (this.ctx, 3443, 194, 368, 46),
    new Obstacle (this.ctx, 3917, 194, 184, 46),
    new Obstacle (this.ctx, 4691, 194, 46, 46),
    new Obstacle (this.ctx, 5208, 194, 138, 46),
    new Obstacle (this.ctx, 5509, 194, 184, 46),

    // escaleras
    new Obstacle (this.ctx, 5767, 494, 46, 46),
    new Obstacle (this.ctx, 5810, 450, 46, 46),
    new Obstacle (this.ctx, 5853, 408, 46, 46),
    new Obstacle (this.ctx, 5896, 365, 46, 184),
    new Obstacle (this.ctx, 6025, 365, 46, 184),
    new Obstacle (this.ctx, 6071, 408, 46, 138),
    new Obstacle (this.ctx, 6114, 450, 46, 92),
    new Obstacle (this.ctx, 6157, 494, 46, 46),

    new Obstacle (this.ctx, 6370, 494, 46, 46),
    new Obstacle (this.ctx, 6413, 450, 46, 46),
    new Obstacle (this.ctx, 6456, 408, 46, 46),
    new Obstacle (this.ctx, 6500, 365, 46, 46),
    new Obstacle (this.ctx, 6543, 365, 46, 184),

    new Obstacle (this.ctx, 6671, 365, 46, 184),
    new Obstacle (this.ctx, 6716, 408, 46, 138),
    new Obstacle (this.ctx, 6760, 450, 46, 92),
    new Obstacle (this.ctx, 6802, 494, 46, 46),

    )
};