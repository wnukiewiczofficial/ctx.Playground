class Cell {
  constructor(x, y, w, h, state, i, j, special) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = i;
    this.j = j;
    this.matched = false;
    this.state = state;
    this.special = special;
    this.tint = 1;
    if (this.special || this.state == "points") {
      this.applying = false;
    }

    this.value = 0;

    if (this.state == "bar") {
      if (this.special) {
        if (Math.random() <= 0.3) this.value = "SW";
        else {
          if (Math.random() <= 0.6) this.value = "W";
          else this.value = "G";
        }
      } else {
        switch (this.i) {
          case 0:
            this.value = Math.floor(Math.random() * (10 - 1) + 1);
            break;
          case 1:
            this.value = Math.floor(Math.random() * (20 - 11) + 11);
            break;
          case 2:
            this.value = Math.floor(Math.random() * (30 - 21) + 21);
            break;
          case 3:
            this.value = Math.floor(Math.random() * (40 - 31) + 31);
            break;
        }
      }
    } else if (this.state == "cell") {
      let isIn = false;
      while (isIn || this.value == 0) {
        switch (this.i) {
          case 0:
            this.value = Math.floor(Math.random() * (10 - 1) + 1);
            break;
          case 1:
            this.value = Math.floor(Math.random() * (20 - 11) + 11);
            break;
          case 2:
            this.value = Math.floor(Math.random() * (30 - 21) + 21);
            break;
          case 3:
            this.value = Math.floor(Math.random() * (40 - 31) + 31);
            break;
        }

        for (let x in values) {
          if (this.value == values[x]) {
            isIn = true;
            break;
          } else isIn = false;
        }
        if (values.length == 0) isIn = false;
      }
      values.push(this.value);
    } else if (this.state == "points") {
      let succeed = false;
      while (!succeed) {
        let r = Math.floor(Math.random() * 5);
        switch (r) {
          case 0:
            if (pointsValuesCounter.minper5 < 5) {
              this.value = "-5%";
              pointsValuesCounter.minper5++;
              succeed = true;
            }
            break;
          case 1:
            if (pointsValuesCounter.per0 < 7) {
              this.value = "0%";
              pointsValuesCounter.per0++;
              succeed = true;
            }
            break;
          case 2:
            if (pointsValuesCounter.per5 < 5) {
              this.value = "5%";
              pointsValuesCounter.per5++;
              succeed = true;
            }
            break;
          case 3:
            if (pointsValuesCounter.x2 < 2) {
              this.value = "2x";
              pointsValuesCounter.x2++;
              succeed = true;
            }
            break;
          case 4:
            if (pointsValuesCounter.x4 < 1) {
              this.value = "4x";
              pointsValuesCounter.x4++;
              bonusCell = { i: this.i, j: this.j };
              succeed = true;
            }
            break;
        }
      }
    }
  }

  draw() {
    if (!this.matched || this.state == "points") {
      ctx.save();
      ctx.globalAlpha = this.tint;
      if (this.state != "bar")
        ctx.drawImage(cellUnmatchedImg, this.x, this.y, this.w * 2, this.h * 2);
      else ctx.drawImage(barImg, this.x, this.y, this.w * 2, this.h * 2);
      ctx.globalAlpha = 1;

      ctx.font = `${boxW * 0.12}px Anton`;
      ctx.lineWidth = 0.4;
      if (hintCell && this.i == hintCell.i && this.j == hintCell.j) {
        ctx.fillStyle = this.applying ? "#40016b" : "#FFFFFF";
        ctx.strokeStyle = this.applying ? "#40016b" : "#FFFFFF";
      } else {
        ctx.fillStyle = this.applying ? "#40016b" : "#FFFFFF";
        ctx.strokeStyle = this.applying ? "#40016b" : "#FFFFFF";
      }
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      if (this.state != "points") {
        if (
          this.state == "bar" &&
          (this.value == "W" || this.value == "SW" || this.value == "G")
        ) {
          switch (this.value) {
            case "W":
              ctx.drawImage(
                powerWImg,
                this.x + this.w / 2,
                this.y + this.h / 2,
                this.w,
                this.h
              );
              break;
            case "SW":
              ctx.drawImage(
                powerSWImg,
                this.x + this.w / 2,
                this.y + this.h / 2,
                this.w,
                this.h
              );
              break;
            case "G":
              ctx.drawImage(
                powerGImg,
                this.x + this.w / 2,
                this.y + this.h / 2,
                this.w,
                this.h
              );
              break;
          }
        } else {
          ctx.fillText(this.value, this.x + this.w, this.y + this.h * 1.2);
          ctx.strokeText(this.value, this.x + this.w, this.y + this.h * 1.2);
        }
      } else {
        if (this.matched) {
          ctx.font = `${boxW * 0.1}px Anton`;
          ctx.fillText(this.value, this.x + this.w, this.y + this.h * 1.2);
          ctx.strokeText(this.value, this.x + this.w, this.y + this.h * 1.2);
        } else {
          ctx.fillText("?", this.x + this.w, this.y + this.h * 1.2);
          ctx.strokeText("?", this.x + this.w, this.y + this.h * 1.2);
        }
      }

      ctx.restore();
    } else {
      if (animationON && this.state != "bar") {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.w * 2, this.h * 2);
      }
      ctx.globalAlpha = this.tint;
      ctx.drawImage(cellMatchedImg, this.x, this.y, this.w * 2, this.h * 2);
      ctx.globalAlpha = 1;
    }
  }
}
