function Gap (ctx, x, y, width, height){
    Obstacle.call(ctx, x, y, width, height);
}
Gap.prototype = Object.create(Gap.prototype);
Gap.prototype.constructor = Gap;