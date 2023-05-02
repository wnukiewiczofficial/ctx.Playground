class Block {
  constructor(y) {
    this.w =
      canvas.width -
      (canvas.width / 6) * 2 -
      20 -
      ((canvas.width / 6) * 2 + 20);
    this.h = canvas.height / 6;
    this.x = canvas.width / 2 - this.w / 2;
    this.y = y;
    this.speed = canvas.height * 0.002;
    this.value = Math.random();
    this.passed = this.y + this.h >= selector.y ? true : false;
    this.red = this.passed ? 135 : this.value < 0.5 ? 50 : 189;
    this.blue = this.passed ? 132 : this.value < 0.5 ? 160 : 38;
    this.green = this.passed ? 132 : this.value < 0.5 ? 168 : 38;
  }

  draw() {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    if (!this.passed) {
      this.red = this.value < 0.5 ? 50 : 189;
      this.green = this.value < 0.5 ? 160 : 38;
      this.blue = this.value < 0.5 ? 168 : 38;
    } else {
      let color = animateColor(
        this.red,
        this.green,
        this.blue,
        135,
        132,
        132,
        0.2
      );
      this.red = color.r;
      this.green = color.g;
      this.blue = color.b;
    }
    ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${canvas.width / 28}px porkys`;
    ctx.fillText(
      this.value < 0.5 ? "BUY" : "SELL",
      this.x + this.w / 2,
      this.y + this.h / 2
    );
    ctx.restore();
  }

  move() {
    this.y += this.speed;

    if (this.y >= canvas.height) {
      this.value = Math.random();
      this.y = -this.h;
      this.passed = false;
    }

    if (this.y + this.h >= selector.y) {
      if (!this.passed) {
        if (
          (man.side != 0 && this.value < 0.5) ||
          (man.side != 1 && this.value >= 0.5)
        ) {
          man.lose(); // Go to man.js there is the losing game function
        } else {
          man.score++;
          selector.correct = true;
        }
      }
      this.passed = true;
    }
  }
}
