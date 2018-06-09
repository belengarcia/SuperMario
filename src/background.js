function Background(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.width = 9126;
    this.height = this.ctx.canvas.height;

    this.vx = 10;

    this.img = new Image();
    this.img.src = 'img/bk2.png';
    this.canMove = true;

    this.movements = {
        right: false,
        left: false
    }
}

Background.prototype.draw = function() {
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
    );
};

Background.prototype.move = function(mario) {
    if (this.movements.right) {
        if (mario >= this.ctx.canvas.width / 2){
            this.x -= this.vx;
        }
    } else if (this.movements.left) {
        this.x += this.vx;
    }
  
    // para que se pare cuando llega al final
    if (this.x + this.width < this.ctx.canvas.width || this.x >= 0){
        this.x = 0;
    }

}

Background.prototype.RIGHT = 39;
Background.prototype.LEFT = 37;
Background.prototype.TOP = 38;
Background.prototype.DOWN = 40;


Background.prototype.onKeyEvent = function (event){
    var state = event.type === 'keydown' ? true : false;
    switch (event.keyCode) {
        case this.RIGHT:
            this.movements.right = state;
            break;
        case this.LEFT:
            this.movements.left = state;
            break;
    }
}