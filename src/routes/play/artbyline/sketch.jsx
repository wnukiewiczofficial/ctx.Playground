import Sketch from "react-p5";

export default function ArtByLine() {
  const ball = {
    x: 0,
    y: 0,
    r: 20,
    dir: { x: 1, y: 1 },
    speed: 2,
    col: 255,
    bouncedetect: function (p5) {
      let bounced = false;
      if (this.x + this.r >= p5.width) {
        this.dir.x = -1;
        bounced = true;
      }
      if (this.x - this.r <= 0) {
        this.dir.x = 1;
        bounced = true;
      }
      if (this.y + this.r >= p5.height) {
        this.dir.y = -1;
        bounced = true;
      }
      if (this.y - this.r <= 0) {
        this.dir.y = 1;
        bounced = true;
      }

      if (bounced)
        this.col = p5.color(
          p5.floor(p5.random(0, 256)),
          p5.floor(p5.random(0, 256)),
          p5.floor(p5.random(0, 256))
        );
    },
    flyaround: function () {
      this.x += this.dir.x * this.speed;
      this.y += this.dir.y * this.speed;
    },
    draw: function (p5) {
      p5.noStroke();
      p5.fill(this.col);
      p5.circle(this.x, this.y, this.r);
    },
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(
      canvasParentRef.parentElement.clientWidth,
      canvasParentRef.parentElement.clientHeight
    ).parent(canvasParentRef);
    p5.background(50);
    ball.x = p5.width / 2;
    ball.y = p5.height / 2;
  };

  const draw = (p5) => {
    ball.bouncedetect(p5);
    ball.flyaround(p5);
    ball.draw(p5);
  };

  return <Sketch setup={setup} draw={draw} />;
}
