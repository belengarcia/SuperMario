function Obstacle(ctx, x, y, width, height) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    
    this.width = width;
    this.height = height;
}

 Obstacle.prototype.draw = function() {
    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(
        this.x,
        this.y,
        this.width, 
        this.height);
 };