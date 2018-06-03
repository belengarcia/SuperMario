function Mario(ctx) {
    this.ctx = ctx;
    
    this.x0 = ctx.canvas.width/20;
    this.x = this.x0;
    
    this.width = 65;
    this.height = this.width*3/4;
    
    this.y0 = ctx.canvas.height - this.height - 60;
    this.y = this.y0;

    
    
    this.vx = 0;
    this.vy = 0;
    this.v = 10;

    this.g = 0.5;

    this.img = new Image();
    this.img.src = 'img/mario.png'

    this.img.frames = 3;
    this.img.frameIndex = 0;
    this.img.animateEvery = 10;

    this.countFrames = 0;
}

Mario.prototype.draw = function() {
    console.log('Mario: ', this.x);
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * this.img.width / this.img.frames, 
        0,
        this.img.width/this.img.frames,
        this.img.height,

        Math.min(this.x, this.ctx.canvas.width/2),
        this.y,
        this.width,
        this.height
    )

    this.countFrames++;
};

Mario.prototype.animate = function (){
    if (this.isJumping()) return; // para que cuando salte deje de animar el sprite

    if (this.vx != 0 || this.x > this.ctx.canvas.width/2){
        this.img.frameIndex++;
  
        if (this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
        } 
     } else {
        this.img.frameIndex = 0;
    }
};

Mario.prototype.move = function (){

    //para que parezca que anda
    if (this.countFrames % this.img.animateEvery === 0) {
        this.animate();
        this.countFrames = 0;
      } 

    // movimiento en los ejes
    this.x += this.vx;
    this.y += this.vy;

    if(this.isJumping()){
        this.vy += this.g;
    } else {
        this.vy = 0;
    }

    //para que Mario no se escape
    if (this.x <= 0){
        this.x = 0;
    }

    if (this.y <= 0){
        this.y = 0;
    }

    //gravedad
    if (this.isJumping()){
         this.y - this.g;
    }
};

Mario.prototype.isJumping = function () {
    return this.y < this.y0; 
};

Mario.prototype.jump = function() {
    if (!this.isJumping()){
      this.vy += this.v;
    }
};


Mario.prototype.collide = function(obstacles) {
    var collisions = obstacles.filter(function(obstacle) {
        return obstacle.collide(this);
    }.bind(this));

    collisions.forEach(function(obstacle) {
        if (obstacle instanceof Obstacle){
            this.collideWithBrick(obstacle);
            debugger;
        }
    }.bind(this))
} 

Mario.prototype.collideWithBrick = function(brick) {
    // Pizarra
}

Mario.prototype.RIGHT = 39;
Mario.prototype.LEFT = 37;
Mario.prototype.TOP = 38;
Mario.prototype.DOWN = 40;

Mario.prototype.onKeyDown = function (code){
    switch (code){
        case this.RIGHT:
            this.vx = 10;
            break;
        case this.LEFT:
            this.vx = -10;
            break;
        case this.TOP:
            if (!this.isJumping()){
            this.vy = -15;
            }
            break;
    }
};

Mario.prototype.onKeyUp = function (code){
    switch (code){
        case this.RIGHT:
        case this.LEFT:
            this.vx = 0;
            break;
    }
};