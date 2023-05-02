class Clock {
  constructor(cx, cy, r) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.rang = false;
    this.col = color(
      p5.floor(p5.random(0, 160)),
      p5.floor(p5.random(0, 160)),
      p5.floor(p5.random(0, 160))
    );
  }

  draw() {
    //Front
    p5.push();
    p5.fill(255);
    p5.stroke(this.col);
    p5.strokeWeight(this.r * 0.05);
    window.p5.translate(this.cx, this.cy);
    p5.ellipse(0, 0, this.r * 1.7, this.r * 1.7);
    p5.ellipse(0, 0, this.r * 0.01, this.r * 0.01);
    p5.pop();

    //Line, hour indicators
    p5.push();
    p5.rectMode(p5.CENTER);
    p5.fill(this.col);
    p5.stroke(this.col);
    rotate(PI);
    window.p5.translate(-this.cx, -this.cy);
    for (let i = 0; i < 60; i++) {
      rotate((PI * 2) / 60);
      p5.rect(0, this.r * 0.7, this.r * 0.01, this.r * 0.06, 10);
    }

    for (let i = 0; i < 12; i++) {
      rotate(PI / 6);
      p5.rect(0, this.r * 0.7, this.r * 0.03, this.r * 0.12, 10);
    }
    p5.pop();

    let now = new Date();

    //Hour pointer
    p5.push();
    window.p5.translate(this.cx, this.cy);
    p5.stroke(this.col);
    p5.strokeWeight(this.r * 0.03);
    rotate(PI);
    rotate(map(now.getHours(), 0, 24, 0, PI * 4));
    p5.line(0, 0, 0, this.r * 0.4);
    p5.pop();

    //Minute pointer
    p5.push();
    window.p5.translate(this.cx, this.cy);
    p5.stroke(this.col);
    p5.strokeWeight(this.r * 0.02);
    rotate(PI);
    rotate(map(now.getMinutes(), 0, 60, 0, PI * 2));
    p5.line(0, 0, 0, this.r * 0.6);
    p5.pop();

    //Second pointer
    p5.push();
    window.p5.translate(this.cx, this.cy);
    p5.stroke(this.col);
    p5.strokeWeight(this.r * 0.01);
    rotate(PI);
    rotate(map(now.getSeconds(), 0, 60, 0, PI * 2));
    p5.line(0, 0, 0, this.r * 0.7);
    p5.pop();
  }

  ring() {
    let now = new Date();
    let scene1 = document.querySelector(".scene1");

    if (!this.rang && now.getSeconds() == p5.randomSecond) {
      this.rang = true;
      bell.play();

      pickContent();
      setTimeout(() => hideContent(), 1000 * 60);
      setTimeout(() => (this.rang = false), 1000 * 60);
    }
  }
}
