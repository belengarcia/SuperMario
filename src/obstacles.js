function Obstacle(ctx, x, y, width, height) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    
    this.width = width;
    this.height = height;
    this.logged = false;
}

 Obstacle.prototype.draw = function() {
     //console.log('Brick: ', this.x)
    this.ctx.fillRect(
        this.x,
        this.y,
        this.width, 
        this.height);
 };

 Obstacle.prototype.collide = function(mario) {
    var containerObject = this;
    var containerStart = this.x;
    var containerEnds = this.x + this.width;
    var containerHeight = this.y;

    var marioInsideX = mario.x + (mario.width/mario.img.frames) >= containerStart && mario.x < containerEnds;
    if(marioInsideX === true){
        if(!this.logged){
            console.log("Mario x = " + mario.x + "\nMario final x = " + (mario.x + mario.width)+ "\nObject x = " + this.x + "\nObject final x = " + (this.x + this.width));
            //console.log(mario.y + mario.height, this.y);
            this.logged = true;
        }
        
    }
    return marioInsideX;

    

    return !(containerObject.x + containerObject.width  < mario.x || 
        mario.x + mario.width < containerObject.x ||
        containerObject.y + containerObject.height < mario.y ||
        mario.y + mario.height < containerObject.y);
 };