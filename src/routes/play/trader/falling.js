class Falling{
  constructor(index, bad){
    this.bad = bad || false;
    this.index = index;
    this.d = canvas.width * 0.05;
    this.x = Math.random() * (canvas.width - this.d);
    this.y = -this.d;
    this.speed = canvas.height*0.004;
  }

  fall(){
    this.y += this.speed;
    if(this.y >= canvas.height - this.d && !this.bad) man.lose();
    else if(this.y >= canvas.height){
      fallings.shift();
    }
  }

  draw(){
    if(this.bad) ctx.drawImage(bombImage, this.x, this.y, this.d, this.d);
    else ctx.drawImage(coinImage, this.x, this.y, this.d, this.d);
  }

  reset(){
    this.x = Math.random() * (canvas.width - this.d);
    this.y = Math.random() * canvas.height * -1;
  }
}
