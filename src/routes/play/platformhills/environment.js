function drawBackground() {
  let c1 = color(0, 150, 240);
  let c2 = color(63, 191, 191);

  for (let y = 0; y < p5.height; y++) {
    n = map(y, 0, p5.height, 0, 1);
    let newc = lerpColor(c1, c2, n);
    p5.stroke(newc);
    p5.line(0, y, p5.width, y);
  }
}

function Ground() {
  this.y = p5.height * 0.7;
  this.pathH = p5.height * 0.1;
  this.partsX = [0, p5.width];

  this.resize = function () {
    this.y = p5.height * 0.7;
    this.pathH = p5.height * 0.1;
  };

  this.backLayerDraw = function () {
    p5.noStroke();
    for (let i in this.partsX) {
      p5.fill(0, 100, 0);
      p5.rect(
        this.partsX[i],
        this.y * 0.85,
        p5.width,
        p5.height - this.y * 0.85
      );
      p5.fill(255, 255, 20);
      p5.rect(this.partsX[i], this.y - this.pathH * 0.5, p5.width, this.pathH);
    }
  };
  this.frontLayerDraw = function () {
    p5.noStroke();
    for (let i in this.partsX) {
      p5.fill(255, 255, 20);
      p5.rect(this.partsX[i], ground.y * 1.05, p5.width, (ground.y * 0.05) / 2);
    }
  };
  this.update = function () {
    for (let i in this.partsX) {
      if (this.partsX[i] <= -width) this.partsX[i] = p5.width;
      else if (this.partsX[i] >= p5.width * 2) this.partsX[i] = -width;
    }
  };
}

function Forest() {
  this.y = ground.y * 0.95;
  this.trees = [];
  for (let i = 0; i < 100; i++) {
    this.trees[i] = {
      x: i * round(p5.random(320, 360)) - p5.width * 10,
      y: this.y * 0.9 + p5.floor(p5.random(0, this.y * 0.08)),
      h: p5.random(p5.height * 0.1, p5.height * 0.3),
    };
  }

  this.resize = function () {
    this.y = ground.y * 0.95;
    for (let i = 0; i < this.trees.length; i++) {
      this.trees[i].y = this.y * 0.9 + p5.floor(p5.random(0, this.y * 0.08));
      this.trees[i].h = p5.random(p5.height * 0.1, p5.height * 0.3);
    }
  };

  this.draw = function () {
    p5.push();
    for (let i = 0; i < this.trees.length; i++) {
      p5.fill(50, 0, 0);
      p5.rectMode(p5.CORNER);
      p5.rect(
        this.trees[i].x,
        this.trees[i].y - this.trees[i].h,
        this.trees[i].h * 0.2,
        this.trees[i].h,
        10
      );
      p5.fill(0, 120, 0);
      p5.rectMode(p5.CENTER);
      p5.rect(
        this.trees[i].x + this.trees[i].h * 0.1,
        this.trees[i].y - this.trees[i].h,
        this.trees[i].h * 0.6,
        this.trees[i].h * 0.6,
        this.trees[i].h * 0.2
      );
    }
    p5.pop();
  };
}

function Sky() {
  this.y = 0;
  this.clouds = [];
  for (let i = 0; i < 100; i++) {
    this.clouds[i] = {
      x: i * round(p5.random(320, 360)) - p5.width * 10,
      y: this.y + p5.floor(p5.random(0, p5.height * 0.1)),
      d: p5.random(p5.height * 0.1, p5.height * 0.15),
      radius: round(p5.random(30, 60)),
    };
  }

  this.resize = function () {
    for (let i = 0; i < this.clouds.length; i++) {
      this.clouds[i].y = this.y + p5.floor(p5.random(0, p5.height * 0.1));
      this.clouds[i].h = p5.random(p5.height * 0.1, p5.height * 0.15);
    }
  };

  this.draw = function () {
    p5.fill(255);
    p5.noStroke();
    for (let i = 0; i < this.clouds.length; i++) {
      p5.rect(
        this.clouds[i].x,
        this.clouds[i].y,
        this.clouds[i].d,
        this.clouds[i].d,
        this.clouds[i].radius
      );
    }
  };
}
