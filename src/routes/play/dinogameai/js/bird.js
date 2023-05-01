
function p5.randomizeBirdLevel(birdHeight){
  let y;
  let rnd = Math.floor(Math.random() * 3);

  switch(rnd)
  {
    case 0:
    y = canvas.height-birdHeight;
      break;
    case 1:
    y = canvas.height-dino.h-birdHeight;
      break;
    case 2:
    y = canvas.height-dino.h-birdHeight*2;
      break;
  }
  return y;
}

class Bird {
  constructor() {
    this.w = dino.w;
    this.h = dino.h;
    this.x = -this.w;
    this.y = p5.randomizeBirdLevel(this.h);
    this.birdSprites = [
      {x: 136, y: 4, w: 42, h: 36}, // Low
      {x: 182, y: 4, w: 42, h: 36} // High
    ];

    this.index = 0;
    this.animController = 0;
  }
  move(groundId){
    this.x = grounds[groundId].x+grounds[groundId].w-this.w;
  }

  draw(){
    this.animController++;
    if(this.animController >= 60/4){
       this.index = this.index == 1 ? 0 : 1;
       this.animController = 0;
    }
    ctx.drawImage(sprites,this.birdSprites[this.index].x , this.birdSprites[this.index].y, this.birdSprites[this.index].w, this.birdSprites[this.index].h,
       this.x, this.y, this.w, this.h);
  }

}
