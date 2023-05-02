class Pointer {
  constructor() {
    this.d = canvas.width * 0.1;
    this.x = Math.random() * (canvas.width - this.d);
    this.y = Math.random() * (canvas.height - this.d);
    this.dir = {
      x: -1 + Math.floor(Math.random() * 3),
      y: -1 + Math.floor(Math.random() * 3),
    };
    this.speed = canvas.width * 0.0005;
    this.color =
      "rgb(" +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      " )";
  }

  move() {
    this.x += this.speed * this.dir.x;
    this.y += this.speed * this.dir.y;

    if (this.x <= 0) this.dir.x = 1;
    else if (this.x + this.d >= canvas.width) this.dir.x = -1;
    if (this.y <= 0) this.dir.y = 1;
    if (this.y + this.d >= canvas.height) this.dir.y = -1;
  }

  draw() {
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = this.color;
    ctx.lineWidth = 3;
    ctx.fillRect(this.x, this.y, this.d, this.d);

    ctx.fillStyle = "#FFFFFF";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";
    ctx.font = `${this.d / 4}px porkys`;
    ctx.fillText("Change", this.x + this.d / 2, this.y + this.d / 2);
    ctx.fillText("side", this.x + this.d / 2, this.y + this.d / 2 + this.d / 4);
    ctx.strokeText("Change", this.x + this.d / 2, this.y + this.d / 2);
    ctx.strokeText(
      "side",
      this.x + this.d / 2,
      this.y + this.d / 2 + this.d / 4
    );
    ctx.restore();
  }

  reset() {
    this.x = Math.random() * (canvas.width - this.d);
    this.y = Math.random() * (canvas.height - this.d);
    this.dir = {
      x: -1 + Math.floor(Math.random() * 3),
      y: -1 + Math.floor(Math.random() * 3),
    };
    this.color =
      "rgb(" +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      " )";
  }
}
