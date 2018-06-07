function Mario(ctx) {
    this.ctx = ctx;
    
    this.x0 = ctx.canvas.width/20;
    this.x = this.x0;
    
    this.width = 55;
    this.height = this.width*3/4;
    
    this.y0 = ctx.canvas.height - this.height - 60;
    this.y = this.y0;

    
    
    this.vx = 0;
    this.vy = 0;
    this.v = 15;

    this.g = 0.5;

    this.img = new Image();
    this.img.src = 'img/mario.png'

    this.img.frames = 3;
    this.img.frameIndex = 0;
    this.img.animateEvery = 10;

    this.countFrames = 0;
    this.isBloqued = false;
    
    this.movements = {
        up: false,
        down: false,
        right: false,
        left: false
    }

    this.isJumping = false;
}

Mario.prototype.draw = function() {
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * this.img.width / this.img.frames, 
        0,
        this.img.width/this.img.frames,
        this.img.height,

        Math.min(this.x, this.ctx.canvas.width / 2),
        this.y,
        this.width,
        this.height
    )

    this.countFrames++;

    this.animate();
};

Mario.prototype.isDownsideY = function() {
    return this.y >= this.y0;
}

Mario.prototype.animate = function () {
    this.move();

    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.g;

    if (this.isDownsideY()) {
        this.y = this.y0;
        this.vy = 0;
        this.isJumping = false;
    }
};

Mario.prototype.animateRun = function() {
    if (this.countFrames % this.img.animateEvery === 0) {
        this.img.frameIndex++;
        if (this.img.frameIndex >= this.img.frames) {
            this.img.frameIndex = 0;
        }
    }
}

Mario.prototype.animatStop = function() {
    this.img.frameIndex = 0;
}

Mario.prototype.move = function () {

    if (this.movements.up && !this.isJumping) {
        this.isJumping = true;
        this.vy = -15;
    }
    
    if (this.movements.right) {
        this.vx = 10;
        this.animateRun();
    } else if (this.movements.left) {
        this.vx = -10;
        this.animateRun();
    } else {
        this.vx = 0;
        this.animatStop();
    }
    // this.checkMarioIsInsideScreen();
};

Mario.prototype.checkMarioIsInsideScreen = function(){
    if (this.x <= 0){
        //esto no funciona para el final del background
        this.x = 0;
    }

    if (this.y <= 0){
        this.y = 0;
    }
}

Mario.prototype.checkCollisions = function(obstacles) {
    var collisions = obstacles.filter(function(obstacle) {
        return obstacle.collide(this);
    }.bind(this));

    collisions.forEach(function(obstacle) {
        if (obstacle instanceof Obstacle) {
            this.collideWithBrick(obstacle);
        }
    }.bind(this));

    return collisions;
} 

Mario.prototype.collideWithBrick = function(brick) {
    if (this.x + this.width >= brick.x && this.x < brick.x + brick.width) {
        this.vx = 0;
        this.x = brick.x - this.width;
        this.movements.right = false;
    } else if (brick.x + brick.width >= this.x && brick.x < this.x + this.width) {
        this.vx = 0;
        this.x = brick.x - brick.width;
        this.movements.left = false;
    }
}

Mario.prototype.isMoving = function() {
    return this.movements.right || this.movements.left;
}

Mario.prototype.RIGHT = 39;
Mario.prototype.LEFT = 37;
Mario.prototype.TOP = 38;
Mario.prototype.DOWN = 40;

Mario.prototype.onKeyEvent = function (event) {
    var state = event.type === 'keydown' ? true : false;
    switch (event.keyCode) {
        case this.RIGHT:
            this.movements.right = state;
            break;
        case this.LEFT:
            this.movements.left = state;
            break;
        case this.DOWN:
            this.movements.down = state;
            break;
        case this.TOP:
            this.movements.up = state;
            break;
    }
};