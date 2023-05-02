import { ball, difficulty, p5 } from "./globals";

//Paddle object
export default class Paddle {
  constructor(side) {
    this.height = 20;
    this.width = 0.1 * p5.value.height + 0.05 * p5.value.height;

    side == "up" ? (this.y = 0) : (this.y = p5.value.height - this.height);
    this.x = p5.value.width / 2 - this.width / 2;

    side == "up"
      ? (this.color = p5.value.color(255, 0, 0))
      : (this.color = p5.value.color(0, 0, 255));

    this.points = 0;
  }

  //Displaying the object on the screen
  Display() {
    p5.value.fill(this.color);
    p5.value.noStroke();
    p5.value.rect(this.x, this.y, this.width, this.height);
  }

  //System that moves paddle to place when user starts to touch or click
  StartMoving(touch, click) {
    if (touch) {
      if (
        p5.value.touches[0].x - this.width / 2 > 0 &&
        p5.value.touches[0].x + this.width / 2 < p5.value.width
      )
        this.x = p5.value.touches[0].x - this.width / 2;
    }
    if (click) {
      if (
        p5.value.mouseX - this.width / 2 > 0 &&
        p5.value.mouseX + this.width / 2 < p5.value.width
      )
        this.x = p5.value.mouseX - this.width / 2;
    }
  }

  //Moving system that works when dragging
  Move(touch, click) {
    if (touch) {
      if (
        p5.value.touches[0].x - this.width / 2 > 0 &&
        p5.value.touches[0].x + this.width / 2 < p5.value.width
      )
        this.x = p5.value.touches[0].x - this.width / 2;
    }
    if (click) {
      if (
        p5.value.mouseX - this.width / 2 > 0 &&
        p5.value.mouseX + this.width / 2 < p5.value.width
      )
        this.x = p5.value.mouseX - this.width / 2;
    }
  }

  //AI system of the object
  AI() {
    let diff = -(this.x + this.width / 2 - ball.value.x);

    if (diff < 0 && diff < -4) {
      diff = -5;
    } else if (diff > 0 && diff > 4) {
      diff = 5;
    }

    let randomOffset = p5.value.random(difficulty.value, 1);
    this.x += diff * randomOffset;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > p5.value.width) {
      this.x = p5.value.width - this.width;
    }
  }
}
