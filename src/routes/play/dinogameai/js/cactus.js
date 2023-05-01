
class Cactus {
  constructor() {
    this.index = Math.floor(Math.random() * 4);

    this.w = this.index < 2 ? dino.w/2 : dino.w*1.5;
    this.h = dino.h * ((Math.random()*(1.2 - 0.5)) + 0.5);
    this.x = -this.w;
    this.y = canvas.height-this.h;
    this.cactusSprites = [
      {x: 333, y: 3, w: 23, h: 48}, //1
      {x: 383, y: 3, w: 23, h: 48}, //2
      {x: 432, y: 3, w: 49, h: 48}, //Triple
      {x: 228, y: 2, w: 51, h: 35} //Triple small
    ];
  }
  move(groundId){
    this.x = grounds[groundId].x+grounds[groundId].w-this.w;
  }

  draw(){
    ctx.drawImage(sprites,this.cactusSprites[this.index].x , this.cactusSprites[this.index].y, this.cactusSprites[this.index].w, this.cactusSprites[this.index].h,
       this.x, this.y, this.w, this.h);
  }

}
