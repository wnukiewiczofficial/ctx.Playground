
class Dino {
  constructor() {
    this.w = canvas.width/20;
    this.h = canvas.width/20;
    this.x = this.w/2;
    this.y = canvas.height-this.h;
    this.vel = 0;
    this.gravity = 3;
    this.ducked = false;
    this.jumped = false;
    this.dinoSprites = [
      {x: 767, y: 4, w: 40, h: 43}, // Left foot
      {x: 811, y: 4, w: 40, h: 43}, // Right foot
      {x: 943, y: 4, w: 55, h: 43}, // Duck right foot
      {x: 1002, y: 4, w: 55, h: 43}, // Duck left foot
    ];

    this.index = 0;
    this.animController = 0;
  }
  physics(){
    this.y += this.vel;
    this.vel += this.gravity;

    if(this.y < 0) this.y = 0;
    if(this.y+this.h > canvas.height) this.y = canvas.height - this.h;
  }

  animate(){
    this.animController++;
    if(this.animController >= 60/8){
      if(this.ducked) this.index = this.index == 3 ? 2 : 3;
      else if(!this.jumped) this.index = this.index == 0 ? 1 : 0;

       this.animController = 0;
    }
    ctx.drawImage(sprites,this.dinoSprites[this.index].x , this.dinoSprites[this.index].y, this.dinoSprites[this.index].w, this.dinoSprites[this.index].h,
       this.x, this.y, this.w, this.h);
  }

  jump(){
    if (this.y == canvas.height - this.h) {
      this.jumped = false;
      if(this.x >= obstacles[nearestObstacleIndex].x-this.w*4 &&
         obstacles[nearestObstacleIndex].y == canvas.height - obstacles[nearestObstacleIndex].h ){
        this.vel = -this.h*0.4;
        this.jumped = true;
      }

    }
  }

  // DEBUG MODE (CHECKING COLLISIONS)
  // collision(){
  //   if(dino.x+dino.w >= obstacles[nearestObstacleIndex].x &&
  //      dino.x+dino.w <= obstacles[nearestObstacleIndex].x+obstacles[nearestObstacleIndex].w  &&
  //       dino.y+dino.h >= obstacles[nearestObstacleIndex].y &&
  //       dino.y < obstacles[nearestObstacleIndex].y + obstacles[nearestObstacleIndex].h)
  //   console.log("Hit!");
  // }

  duck(){
    if(this.x >= obstacles[nearestObstacleIndex].x-this.w*4 &&
       obstacles[nearestObstacleIndex].y + obstacles[nearestObstacleIndex].h < canvas.height&&
       obstacles[nearestObstacleIndex].y + obstacles[nearestObstacleIndex].h >= dino.y){
      this.ducked = true;
    }
    else{
      this.ducked = false;
    }
  }
}
