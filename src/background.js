function Background(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.width = 9126;
    this.height = this.ctx.canvas.height;

    this.vx = -15;

    this.img = new Image();
    this.img.src = 'img/bk2.png'
    }

Background.prototype.draw = function() {
    console.log('Back: ', this.x);
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
    );
};

Background.prototype.moveForward = function() {
    this.x += this.vx;
    //para que se pare cuando llega al final
    if (this.x + this.width < this.ctx.canvas.width){
        this.vx = 0;
    }

}

Background.prototype.moveBackwards = function() {
    this.x -= this.vx;
    if (this.x >= 0){
        this.vx = 0;
    }
}