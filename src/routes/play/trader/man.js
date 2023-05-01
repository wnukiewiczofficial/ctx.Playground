class Man{
  constructor(){
    this.side = 0;
    this.w = canvas.width/12;
    this.h = canvas.height/3;
    this.x = this.side == 0 ? canvas.width/8 : canvas.width-canvas.width/8;
    this.y = canvas.height*0.65;
    this.score = 0;
  }

  draw(){
    this.x = this.side == 0 ? canvas.width/8 : canvas.width-canvas.width/8-this.w;
    ctx.save();
    ctx.drawImage(manImage, this.x, this.y, this.w, this.h);
    ctx.restore();
  }

  //Here is a function that is called when user loses the game
  lose(){
    started = false;
    clearInterval(fallingInterval);
    // You can put anything you want here
  }
}
