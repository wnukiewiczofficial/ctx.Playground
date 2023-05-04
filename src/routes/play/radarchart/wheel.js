export default class Wheel {
  constructor(cx, cy, r) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
  }

  draw(p5, categories, pickedStock) {
    // Indicator triangles
    p5.push();
    p5.translate(this.cx, this.cy);
    p5.rotate(p5.PI / 8);
    p5.stroke(120, 120, 120);
    p5.strokeWeight(this.r * 0.008);
    let l = (p5.PI / 8 / p5.PI) * p5.PI * 2 * this.r;
    for (let i = 0; i < 8; i++) {
      categories[i].col.setAlpha(255);
      p5.fill(categories[i].col);
      p5.rotate(p5.PI / 4);
      p5.triangle(0, 0, -l * 0.48, -this.r * 0.91, l * 0.48, -this.r * 0.91);
    }
    p5.pop();

    //Front
    p5.push();
    p5.fill(255);
    p5.stroke(120, 120, 120);
    p5.strokeWeight(this.r * 0.008);
    p5.translate(this.cx, this.cy);
    p5.ellipse(0, 0, this.r * 1.5, this.r * 1.5);
    p5.pop();

    // Value triangles
    p5.push();
    p5.translate(this.cx, this.cy);
    p5.rotate(p5.PI / 8);
    p5.noStroke();
    p5.strokeWeight(2);

    for (let i = 0; i < 8; i++) {
      p5.rotate(p5.PI / 4);
      let val = pickedStock[i];

      let x = (p5.PI / 8 / p5.PI) * p5.PI * 2 * this.r * ((0.76 / 10) * val);
      categories[i].col.setAlpha((55 / 10) * categories[i].value + 200);
      p5.fill(categories[i].col);
      p5.triangle(
        0,
        0,
        -x * 0.54,
        -val * this.r * (0.695 / 9),
        x * 0.54,
        -val * this.r * (0.695 / 9)
      );
    }
    p5.pop();

    // Labels and scale
    p5.push();
    p5.translate(this.cx, this.cy);
    p5.rotate(p5.PI / 8);

    p5.stroke(120, 120, 120);

    for (let i = 0; i < 8; i++) {
      p5.fill(120, 120, 120);
      p5.rotate(p5.PI / 8);
      p5.strokeWeight(this.r * 0.005);
      p5.line(0, 0, 0, -this.r * 0.75);
      p5.textSize(this.r * 0.04);
      p5.textAlign(p5.CENTER, p5.CENTER);

      for (let x = 1; x <= 9; x++) {
        p5.push();
        p5.line(
          -this.r * 0.01,
          x * this.r * 0.083,
          this.r * 0.01,
          x * this.r * 0.083
        );
        p5.translate(this.r * 0.03, x * this.r * 0.079);
        p5.rotate(p5.PI);
        p5.fill(120, 120, 120);
        p5.strokeWeight(this.r * 0.004);
        if (i == 3) p5.text(x, 0, 0);
        p5.pop();
      }

      p5.rotate(p5.PI / 8);
      p5.textSize(this.r * 0.09);
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.fill(255);
      let txt;
      switch (i) {
        case 0:
          txt = "Growth";
          break;
        case 1:
          txt = "Dividend";
          break;
        case 2:
          txt = "Earnings";
          break;
        case 3:
          txt = "Strength";
          break;
        case 4:
          txt = "Futuristic";
          break;
        case 5:
          txt = "Positivity";
          break;
        case 6:
          txt = "Opportunity";
          break;
        case 7:
          txt = "Dependability";
          break;
        default:
          txt = "No name";
          break;
      }
      p5.text(txt, 0, -this.r + p5.textAscent() * 1.5);
    }
    p5.pop();
  }
}
