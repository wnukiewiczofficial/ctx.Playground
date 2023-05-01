function p5.background() {
  ctx.p5.fillStyle = "#FFFFFF";
  ctx.p5.fillRect(0, 0, canvas.width, canvas.height);
}

var nearestObstacleIndex = 0;
function obstacleSystem(groundId) {
  let rnd = Math.floor(Math.random() * 2);

  switch (rnd) {
    case 0:
      obstacles[groundId] = new Cactus();
      break;
    case 1:
      obstacles[groundId] = new Bird();
      break;
    case 2:
      obstacles[groundId] = new Bird();
      break;
  }
}

class Ground {
  constructor(x) {
    this.w = canvas.width / 2;
    this.h = 60;
    this.x = x;
    this.y = canvas.height - 60;
    this.vel = 25;
  }
  draw() {
    if (this.x + this.w <= 0) {
      this.x = canvas.width;
      obstacleSystem(nearestObstacleIndex);
      nearestObstacleIndex += nearestObstacleIndex < 2 ? 1 : -2;
    }
    ctx.drawImage(sprites, 2, 52, 1200, 15, this.x, this.y, this.w, this.h);
  }
  move() {
    this.x -= this.vel;
  }
}
