export default class Ball {
  constructor(p5, level) {
    this.x = p5.floor(p5.random(0, p5.width));
    this.y = p5.floor(p5.random(0, p5.height));
    this.d =
      level == 1 ? p5.width * 0.1 : p5.random(p5.width * 0.01, p5.width * 0.08);
    this.col = p5.color(
      p5.random(0, 256),
      p5.random(0, 256),
      p5.random(0, 256),
      level < 5 ? 255 : p5.floor(p5.random(10, 256))
    );

    if (level >= 3) {
      this.dir = p5.createVector(
        p5.floor(p5.random(-1, 2)),
        p5.floor(p5.random(-1, 2))
      );
      if (level == 3) this.speed = 2;
      else this.speed = p5.floor(p5.random(2, 7));
      this.better = true;
    }
  }

  move(p5, level) {
    if (level >= 3 && this.better) {
      this.x += this.dir.x * this.speed;
      this.y += this.dir.y * this.speed;

      if (this.x - this.d / 2 <= 0 || this.x + this.d / 2 >= p5.width)
        this.dir.x *= -1;
      if (this.y - this.d / 2 <= 0 || this.y + this.d / 2 >= p5.height)
        this.dir.y *= -1;
    }
  }

  draw(p5) {
    p5.noStroke();
    p5.fill(this.col);
    p5.circle(this.x, this.y, this.d);
  }
}
