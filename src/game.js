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
    this.mario = new Mario(this.ctx);

    this.setKeyboardListeners();
}

Game.prototype.start = function(){
    this.gameLoop = setInterval(function (){
        this.clearAll();
        this.drawAll();
        this.moveAll();
    }.bind(this), 16)
}


Game.prototype.drawAll = function (){
    this.bk.draw();
    this.mario.draw();
}

Game.prototype.moveAll = function (){
    this.mario.move(this.bk);
}

Game.prototype.clearAll = function (){
    this.ctx.clearRect(
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
    );
}

Game.prototype.setKeyboardListeners = function (){
    document.onkeydown = function(event) {
        this.mario.onKeyDown(event.keyCode);
      }.bind(this);
    
      document.onkeyup = function(event) {
        this.mario.onKeyUp(event.keyCode);
      }.bind(this);
// esta la he copiado tal cual y no la entiendo!
}