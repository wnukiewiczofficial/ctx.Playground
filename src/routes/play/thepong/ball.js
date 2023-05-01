//Ball object
class Ball {
  constructor() {
    this.x = p5.width / 2;
    this.y = p5.height / 2;
    this.radius = 10 + 0.02 * p5.height;
    this.yvel = -(height / 100);
    this.xvel = p5.random(-5, 5);

    this.color = color(113, 50, 168);
  }

  //Displaying the object on the screen
  Display() {
    push();
    p5.noStroke();
    p5.fill(this.color);
    p5.circle(this.x, this.y, this.radius);
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
      this.x + this.radius / 2 >= paddle1.x &&
      this.x - this.radius / 2 <= paddle1.x + paddle1.width &&
      this.y + this.radius / 2 >= paddle1.y &&
      this.y - this.radius / 2 <= paddle1.y + paddle1.height
    ) {
      //Y bounce
      this.yvel < 0 ? (this.yvel *= -1) : (this.yvel *= 1);

      //X bounce
      //The further from center of the pallet the more bouncing angle is
      let diff = paddle1.x + paddle1.width / 2 - this.x;
      if (this.xvel < -3) {
        this.xvel = -3;
        if (diff < 0) this.xvel -= ((diff * p5.height) / 10000) * anglestrength;
      } else if (this.xvel > 3) {
        this.xvel = 3;
        if (diff > 0) this.xvel -= ((diff * p5.height) / 10000) * anglestrength;
      } else {
        this.xvel -= ((diff * p5.height) / 10000) * anglestrength;
      }

      //Adding some speed after the bounce
      if (
        this.yvel > (-height / 1000) * 70 &&
        this.yvel < (p5.height / 1000) * 70
      )
        this.yvel += p5.height / 1000;
    }

    //Collision with down paddle
    if (
      this.x + this.radius / 2 >= paddle2.x &&
      this.x - this.radius / 2 <= paddle2.x + paddle2.width &&
      this.y + this.radius / 2 >= paddle2.y &&
      this.y - this.radius / 2 <= paddle2.y + paddle2.height
    ) {
      //Y bounce
      this.yvel > 0 ? (this.yvel *= -1) : (this.yvel *= 1);

      //X bounce
      //The further from center of the pallet the more bouncing angle is
      let diff = paddle2.x + paddle2.width / 2 - this.x;
      if (this.xvel < -3) {
        this.xvel = -3;
        if (diff < 0) this.xvel -= ((diff * p5.height) / 10000) * anglestrength;
      } else if (this.xvel > 3) {
        this.xvel = 3;
        if (diff > 0) this.xvel -= ((diff * p5.height) / 10000) * anglestrength;
      } else {
        this.xvel -= ((diff * p5.height) / 10000) * anglestrength;
      }

      //Adding some speed after the bounce
      if (
        this.yvel > (-height / 1000) * 70 &&
        this.yvel < (p5.height / 1000) * 70
      )
        this.yvel -= p5.height / 1000;
    }

    //Border collision left-right
    if (this.x - this.radius <= 0 || this.x + this.radius >= p5.width)
      this.xvel = -this.xvel;

    //Border collision top-bottom
    if (this.y - this.radius <= 0 - paddle1.height) {
      Reset();
      PointDown(); //Giving a point to bottom paddle
    } else if (this.y + this.radius >= p5.height + paddle2.height) {
      Reset();
      PointUp(); //Giving a point to up paddle
    }
  }
}
