//Paddle object
class Paddle {
  constructor(side) {
    this.height = 20;
    this.width = 0.1 * p5.height + 0.05 * p5.height;

    side == "up" ? (this.y = 0) : (this.y = p5.height - this.height);
    this.x =p5.width / 2 - this.width / 2;

    side == "up"
      ? (this.color = color(255, 0, 0))
      : (this.color = color(0, 0, 255));

    this.points = 0;
  }

  //Displaying the object on the screen
  Display() {
    p5.fill(this.color);
    p5.noStroke();
    p5.rect(this.x, this.y, this.width, this.height);
  }

  //System that moves paddle to place when user starts to touch or click
  StartMoving(touch, click) {
    if (touch) {
      if (
        touches[0].x - this.width / 2 > 0 &&
        touches[0].x + this.width / 2 <p5.width
      )
        this.x = touches[0].x - this.width / 2;
    }
    if (click) {
      if (p5.mouseX - this.width / 2 > 0 && p5.mouseX + this.width / 2 <p5.width)
        this.x = p5.mouseX - this.width / 2;
    }
  }

  //Moving system that works when dragging
  Move(touch, click) {
    if (touch) {
      if (
        touches[0].x - this.width / 2 > 0 &&
        touches[0].x + this.width / 2 <p5.width
      )
        this.x = touches[0].x - this.width / 2;
    }
    if (click) {
      if (p5.mouseX - this.width / 2 > 0 && p5.mouseX + this.width / 2 <p5.width)
        this.x = p5.mouseX - this.width / 2;
    }
  }

  //AI system of the object
  AI() {
    let diff = -(this.x + this.width / 2 - ball.x);

    if (diff < 0 && diff < -4) {
      diff = -5;
    } else if (diff > 0 && diff > 4) {
      diff = 5;
    }

    let p5.randomOffset = p5.random(difficulty, 1);
    this.x += diff * p5.randomOffset;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width >p5.width) {
      this.x =p5.width - this.width;
    }
  }
}
