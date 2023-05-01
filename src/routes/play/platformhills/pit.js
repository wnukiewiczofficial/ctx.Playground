function Pit(x) {
  this.x = x;
  this.y = ground.y * 0.95;
  this.h = p5.height - this.y;
  this.w = hero.w * 3;

  this.resize = function () {
    this.h = p5.height - this.y;
    this.w = hero.w * 3;
    this.y = ground.y * 0.95;
  };

  this.vacumming = function () {
    if (
      hero.x > this.x + worldX &&
      hero.x + hero.w < this.x + this.w + worldX
    ) {
      return true;
    }
    return false;
  };

  this.draw = function () {
    image(environment.pit, this.x, this.y, this.w, this.h);
    p5.fill(0, 0, 0, 100);
    p5.noStroke();
    p5.rect(this.x, this.y, this.w, this.h);
  };
}

function collisionInPit(index) {
  if (hero.x + hero.w > pits[index].x + pits[index].w + worldX)
    hero.x = pits[index].x + pits[index].w + worldX - hero.w;
  else if (hero.x < pits[index].x + worldX) hero.x = pits[index].x + worldX;
}
