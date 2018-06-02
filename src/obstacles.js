function Obstacle(ctx) {
    this.ctx = ctx;

    this.width = 90;
    this.height = 90;
    
    this.x = 1205;
    this.y = 450;

    this.vx = -5;
}

 Obstacle.prototype.draw = function() {
    this.ctx.fillStyle="#FF0000"
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    //     this.ctx.drawImage(
//         this.img,
//         this.x,
//         this.y,
//         this.width,
//         this.height
//     )
 };

Obstacle.prototype.move = function () {
         this.x += this.vx;
};