class Cell {
  constructor(x, y, w, h, i, j) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = i;
    this.j = j;
    this.isVisible = false;
    this.isBomb = false;
    this.closeBombs = 0;
    this.marked = false;
    this.alpha = 1;
  }
  checkBombsAround() {
    if (this.isBomb) this.closeBombs = -1;
    else {
      let total = 0;
      for (var xoff = -1; xoff <= 1; xoff++) {
        var i = this.i + xoff;
        if (i < 0 || i >= cells[this.i].length) continue;

        for (var yoff = -1; yoff <= 1; yoff++) {
          var j = this.j + yoff;
          if (j < 0 || j >= cells.length) continue;
          if (cells[i][j].isBomb) {
            total++;
          }
        }
      }
      this.closeBombs = total;
    }
  }

  discover() {
    if (!this.isVisible) {
      discovered++;
      this.isVisible = true;

      if (this.marked) flagCount--;
      if (this.marked && this.isBomb) correctFlags--;
      if (this.closeBombs == 0) {
        for (var xoff = -1; xoff <= 1; xoff++) {
          var i = this.i + xoff;
          if (i < 0 || i >= cells[this.i].length) continue;

          for (var yoff = -1; yoff <= 1; yoff++) {
            var j = this.j + yoff;
            if (j < 0 || j >= cells.length) continue;
            if (!cells[i][j].isVisible) {
              cells[i][j].discover();
            }
          }
        }
      }
    }
  }

  draw() {
    if (this.isVisible) {
      ctx.save();
      ctx.p5.fillStyle = "#fcba03";
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.p5.fillRect(this.x, this.y, this.w * 2, this.h * 2);
      ctx.strokeRect(this.x, this.y, this.w * 2, this.h * 2);

      if (this.isBomb) {
        ctx.save();
        ctx.p5.fillStyle = "#8c2300";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 8;
        ctx.p5.fillRect(this.x, this.y, this.w * 2, this.h * 2);
        ctx.strokeRect(this.x, this.y, this.w * 2, this.h * 2);
        ctx.drawImage(bombImg, this.x, this.y, this.w * 2, this.h * 2);
        ctx.restore();
      }

      if (this.closeBombs > 0) {
        if (this.closeBombs == 1) ctx.p5.fillStyle = "#425d8f";
        else if (this.closeBombs == 2) ctx.p5.fillStyle = "#036e0c";
        else if (this.closeBombs == 3) ctx.p5.fillStyle = "#bd0909";
        else if (this.closeBombs == 4) ctx.p5.fillStyle = "#b709bd";

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${this.w}px Arial`;
        ctx.p5.fillText(this.closeBombs, this.x + this.w, this.y + this.h);
      }

      if (this.alpha >= 0.1) this.alpha -= 0.1;
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(tileImg, this.x, this.y, this.w * 2, this.h * 2);

      ctx.restore();
    } else {
      ctx.save();
      if (this.isBomb && won) {
        ctx.p5.fillStyle = "#0e8c00";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 8;
        ctx.p5.fillRect(this.x, this.y, this.w * 2, this.h * 2);
        ctx.strokeRect(this.x, this.y, this.w * 2, this.h * 2);
        if (this.alpha >= 0.1) this.alpha -= 0.05;
      } else this.alpha = 1;
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(tileImg, this.x, this.y, this.w * 2, this.h * 2);
      ctx.restore();
      if (this.marked) {
        ctx.save();
        ctx.drawImage(
          flagImg,
          this.x + this.w / 4,
          this.y + this.w / 4,
          this.w * 1.4,
          this.h * 1.4
        );
        ctx.restore();
      }
    }
  }
}
