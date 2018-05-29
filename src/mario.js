/*

Constructor de Mario (posición e imágen de frames)

Prototipos: 

draw() para que se dibuje
animation() para que parezca que anda
jump() para que salte
move() (
    animation()
    jump()
    controles de alante y atrás
    agacharse
)

shoot()

bullets


*Para más adelante: pensar en otras posibilidades de Mario

*/

function Mario(ctx) {
    this.ctx = ctx;
    this.x = ctx.canvas.width/20;
    this.width = 100;
    this.height = this.width*3/4;
    this.y = ctx.canvas.height - this.height - 60;

    this.vx = 0;
    this.vy = 0;

    this.g = 0;
    //en un futuro: this.vy, this.v, this.g

    this.img = new Image();
    this.img.src = 'img/mario.png'

    this.img.frames = 3;
    this.img.frameIndex = 0;
    this.img.animateEvery = 10;

    this.countFrames = 0;
    }

Mario.prototype.draw = function() {
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * this.img.width / this.img.frames, 
        0,
        this.img.width/this.img.frames,
        this.img.height,
        this.x,
        this.y,
        this.width,
        this.height
    )

    this.countFrames++;
}

Mario.prototype.animate = function (){

    this.img.frameIndex++;
  
    if (this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
    }

}

Mario.prototype.move = function (){

    if (this.countFrames % this.img.animateEvery === 0) {
        this.animate();
        this.countFrames = 0;
      } 

    this.x += this.vx;
    this.y += this.vy;
}

Mario.prototype.isJumping = function () {
    
}

Mario.prototype.RIGHT = 39;
Mario.prototype.LEFT = 37;
Mario.prototype.TOP = 38;

Mario.prototype.onKeyDown = function (code){
    switch (code){
        case this.RIGHT:
            this.vx = 10;
            break;
        case this.LEFT:
            this.vx = -10;
            break;
        case this.TOP:
            this.vy = -5;
            break;
    }
}

Mario.prototype.onKeyUp = function (code){
    switch (code){
        case this.RIGHT:
        case this.LEFT:
            this.vx = 0;
            break;
        case this.TOP:
            this.vy = 0;
    }
}