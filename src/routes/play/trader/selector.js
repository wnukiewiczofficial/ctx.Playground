class Selector {
  constructor() {
    this.w = (canvas.width / 6) * 2 - 40;
    this.h = 10;
    this.x = (canvas.width / 6) * 2 + 20;
    this.y = canvas.height / 2 + canvas.width / 16 - this.h;
    this.red = 255;
    this.blue = 255;
    this.green = 255;
    this.correct = false;
  }

  draw() {
    ctx.save();

    if (!started && !dialog) {
      let color = animateColor(
        this.red,
        this.green,
        this.blue,
        189,
        38,
        38,
        blocks[0].speed / 10
      );
      this.red = color.r;
      this.green = color.g;
      this.blue = color.b;
    } else if (this.correct) {
      let color = animateColor(
        selector.red,
        selector.green,
        selector.blue,
        32,
        117,
        16,
        blocks[0].speed / 10
      );
      selector.red = color.r;
      selector.green = color.g;
      selector.blue = color.b;
      setTimeout(() => {
        this.correct = false;
      }, 500);
    } else {
      let color = animateColor(
        selector.red,
        selector.green,
        selector.blue,
        255,
        255,
        255,
        blocks[0].speed / 10
      );
      selector.red = color.r;
      selector.green = color.g;
      selector.blue = color.b;
    }
    ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;
    ctx.shadowColor = started ? "rgb(32, 117, 16)" : "#bd2626";
    ctx.shadowBlur = 15;
    ctx.shadowOffset = 6;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}
