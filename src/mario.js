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
    this.x0 = ctx.canvas.width/20;
    this.x = this.x0;
    this.width = 100;
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
};

Mario.prototype.animate = function (b){
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

Mario.prototype.move = function (b){

    //para que parezca que anda
    if (this.countFrames % this.img.animateEvery === 0) {
        this.animate(b);
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

    //para el movimiento hacia adelante y hacia atrás del bk según la posición de Mario
    if (this.x >= (this.ctx.canvas.width - this.ctx.canvas.width / 2)){
        b.moveForward();
    } else if (this.x < this.x0) {
        if(b.x !== 0) {
            b.moveBackwards();
        }
    }

    //para que Mario no se escape
    if (this.x <= 0){
        this.x = 0;
    }
    if (this.x + this.width >= this.ctx.canvas.width){
        this.x = this.ctx.canvas.width - this.width;
      }
    if (this.y <= 0){
        this.y = 0;
    }
    //if (this.y + this.height >= this.y0){
    //    this.y = this.ctx.canvas.height - this.height;
    //    console.log(this.y0);
    //    console.log(this.y);
    //}
    //por qué no me sale la y?

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
        case this.DOWN:
            this.vy = 5;
            break;
    }
};

Mario.prototype.onKeyUp = function (code){
    switch (code){
        case this.RIGHT:
        case this.LEFT:
            this.vx = 0;
            break;
        //case this.TOP:
        //    this.vy = 0;
        //    break;
        case this.DOWN:
            this.vy = 0;
            break;
    }
};