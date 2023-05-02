import { paddle1, paddle2 } from "./globals";
import { Reset } from "./score";
import { PointDown, PointUp } from "./score";
import { p5 } from "./globals";

//Ball object
export default class Ball {
  constructor() {
    this.x = p5.value.width / 2;
    this.y = p5.value.height / 2;
    this.radius = 10 + 0.02 * p5.value.height;
    this.yvel = -(p5.value.height / 100);
    this.xvel = p5.value.random(-5, 5);

    this.color = p5.value.color(113, 50, 168);
  }

  //Displaying the object on the screen
  Display() {
    p5.value.push();
    p5.value.noStroke();
    p5.value.fill(this.color);
    p5.value.circle(this.x, this.y, this.radius);
  }

  //Moving system of the object
  Move() {
    this.x += this.xvel;
    this.y += this.yvel;
  }

  //Collision system of the object AND Bouncing system
  Collision() {
    let anglestrength = 1.5; // I prefer 1 to 2

    //Collision with up paddle
    if (
      this.x + this.radius / 2 >= paddle1.value.x &&
      this.x - this.radius / 2 <= paddle1.value.x + paddle1.value.width &&
      this.y + this.radius / 2 >= paddle1.value.y &&
      this.y - this.radius / 2 <= paddle1.value.y + paddle1.value.height
    ) {
      //Y bounce
      this.yvel < 0 ? (this.yvel *= -1) : (this.yvel *= 1);

      //X bounce
      //The further from center of the pallet the more bouncing angle is
      let diff = paddle1.value.x + paddle1.value.width / 2 - this.x;
      if (this.xvel < -3) {
        this.xvel = -3;
        if (diff < 0)
          this.xvel -= ((diff * p5.value.height) / 10000) * anglestrength;
      } else if (this.xvel > 3) {
        this.xvel = 3;
        if (diff > 0)
          this.xvel -= ((diff * p5.value.height) / 10000) * anglestrength;
      } else {
        this.xvel -= ((diff * p5.value.height) / 10000) * anglestrength;
      }

      //Adding some speed after the bounce
      if (
        this.yvel > (-p5.value.height / 1000) * 70 &&
        this.yvel < (p5.value.height / 1000) * 70
      )
        this.yvel += p5.value.height / 1000;
    }

    //Collision with down paddle
    if (
      this.x + this.radius / 2 >= paddle2.value.x &&
      this.x - this.radius / 2 <= paddle2.value.x + paddle2.value.width &&
      this.y + this.radius / 2 >= paddle2.value.y &&
      this.y - this.radius / 2 <= paddle2.value.y + paddle2.value.height
    ) {
      //Y bounce
      this.yvel > 0 ? (this.yvel *= -1) : (this.yvel *= 1);

      //X bounce
      //The further from center of the pallet the more bouncing angle is
      let diff = paddle2.value.x + paddle2.value.width / 2 - this.x;
      if (this.xvel < -3) {
        this.xvel = -3;
        if (diff < 0)
          this.xvel -= ((diff * p5.value.height) / 10000) * anglestrength;
      } else if (this.xvel > 3) {
        this.xvel = 3;
        if (diff > 0)
          this.xvel -= ((diff * p5.value.height) / 10000) * anglestrength;
      } else {
        this.xvel -= ((diff * p5.value.height) / 10000) * anglestrength;
      }

      //Adding some speed after the bounce
      if (
        this.yvel > (-p5.value.height / 1000) * 70 &&
        this.yvel < (p5.value.height / 1000) * 70
      )
        this.yvel -= p5.value.height / 1000;
    }

    //Border collision left-right
    if (this.x - this.radius <= 0 || this.x + this.radius >= p5.value.width)
      this.xvel = -this.xvel;

    //Border collision top-bottom
    if (this.y - this.radius <= 0 - paddle1.value.height) {
      Reset();
      PointDown(); //Giving a point to bottom paddle
    } else if (this.y + this.radius >= p5.value.height + paddle2.value.height) {
      Reset();
      PointUp(); //Giving a point to up paddle
    }
  }
}
