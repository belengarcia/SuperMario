function Gap (ctx, x, y, width, height){
    Obstacle.call(ctx, x, y, width, height);
}
Gap.prototype = Object.create(Obstacle.prototype);
Gap.prototype.constructor = Gap;

//Gaps
//new Gap (this.ctx, 1104, 200, 85, 62)