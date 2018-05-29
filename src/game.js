/*
Llamar a start: set Interval

Llamar a las funciones de Draw
    - bk.draw();
    - mario.draw();
    - obstacles.draw();

Llamar a las funciones de Move
    -bk.moce();
    -mario.move();

    

*/

function Game (canvasElement){
    this.ctx = canvasElement.getContext("2d");
    this.bk = new Background(this.ctx);
}

Game.prototype.start = function(){
    this.gameLoop = setInterval(function (){
        this.clearAll();
        this.drawAll();
    }.bind(this), 16)
}


Game.prototype.drawAll = function (){
    this.bk.draw();
}


Game.prototype.clearAll = function (){
    this.ctx.clearRect(
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
    );
}