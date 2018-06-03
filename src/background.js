function Background(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.width = 9126;
    this.height = this.ctx.canvas.height;

    this.vx = 0;

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

Background.prototype.move = function() {
    this.x += this.vx;
    //para que se pare cuando llega al final
    if (this.x + this.width < this.ctx.canvas.width || this.x >= 0){
        this.vx = 0;
    }

}

Background.prototype.RIGHT = 39;
Background.prototype.LEFT = 37;
Background.prototype.TOP = 38;
Background.prototype.DOWN = 40;

Background.prototype.onKeyDown = function (code, player){
    switch (code){
        case this.RIGHT:
            if(player >= (this.ctx.canvas.width/2)) {
                this.vx = -10;
            }
            break;
        case this.LEFT:
            this.vx = 10;
    }
};

Background.prototype.onKeyUp = function (code){
    this.vx = 0;
};