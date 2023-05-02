class Player {
  constructor(x, y, nickname, id) {
    this.w = 0.04 * (p5.width + p5.height);
    this.h = 0.04 * (p5.width + p5.height);
    this.x = x;
    this.y = y;
    this.xvel = 0;
    this.yvel = 0;
    this.speed = 1;
    this.xgravity = 0.5;
    this.ygravity = 0.5;
    this.col = color(0, 0, 0);
    this.tagged = false;
    this.tagTime = 8;
    this.counterControl = 0;
    this.nickname = nickname;
    this.id = id;
    this.winner = false;
  }

  draw() {
    if (!this.winner)
      this.col = this.tagged ? color(200, 0, 0) : color(0, 0, 0);
    else this.col = color(0, 200, 0);
    p5.noStroke();
    p5.fill(this.col);

    if (this.tagTime <= 0) this.x = -2 * p5.width;
    p5.rect(this.x, this.y, this.w, this.h);

    p5.stroke(this.col);
    p5.textSize(14);
    p5.textAlign(p5.CENTER, BOTTOM);
    textFont(infoFont);
    p5.text(this.nickname, this.x, this.y - this.h / 2);
    if (this.winner) {
      p5.textSize(30);
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.text("WINNER", this.x, this.y + this.h / 2);
    }
  }

  drawCounter() {
    if (this.tagged) {
      this.counterControl++;
      if (this.counterControl >= 60) {
        this.tagTime--;
        this.counterControl = 0;
      }

      if (this.tagTime > 0) {
        p5.fill(255);
        p5.stroke(255);
        p5.strokeWeight(0.5);
        p5.textSize(30);
        p5.textAlign(p5.CENTER, p5.CENTER);
        textFont(infoFont);
        p5.text(this.tagTime, this.x, this.y);
      } else {
        this.tagged = false;
        this.tagTime = 0;
        setTimeout(() => {
          started = false;
          Menu();
        }, 5000);
        players[this.id == 0 ? 1 : 0].winner = true;
      }
    }
  }

  move() {
    if (this.xvel < -15) this.xvel = -15;
    if (this.xvel > 15) this.xvel = 15;
    if (this.yvel < -15) this.yvel = -15;
    if (this.yvel > 15) this.yvel = 15;

    this.x += this.xvel;
    this.y += this.yvel;

    if (this.xvel > 0) this.xvel -= this.xgravity;
    if (this.yvel > 0) this.yvel -= this.ygravity;

    if (this.xvel < 0) this.xvel += this.xgravity;
    if (this.yvel < 0) this.yvel += this.ygravity;
  }

  collision() {
    if (this.x - this.w / 2 < 0) {
      this.x = this.w / 2;
      this.xvel *= -1;
    }
    if (this.x + this.w / 2 > p5.width) {
      this.x = p5.width - this.w / 2;
      this.xvel *= -1;
    }
    if (this.y - this.h / 2 < 0) {
      this.y = this.h / 2;
      this.yvel *= -1;
    }
    if (this.y + this.h / 2 > p5.height) {
      this.y = p5.height - this.h / 2;
      this.yvel *= -1;
    }

    for (let player in players) {
      if (players[player] != this) {
        if (
          this.x + this.w / 2 >= players[player].x - players[player].w / 2 &&
          this.x - this.w / 2 <= players[player].x + players[player].w / 2 &&
          this.y + this.h / 2 >= players[player].y - players[player].h / 2 &&
          this.y - this.h / 2 <= players[player].y + players[player].h / 2
        ) {
          if (this.tagged) {
            setTimeout(() => {
              players[player].tagged = true;
              players[player].tagTime = 6;
              this.tagged = false;
            }, 20);
          }
          if (this.x <= players[player].x) {
            this.xvel *= -1;
            players[player].xvel -=
              players[player].x - this.x + (this.xvel - players[player].xvel);
          }
          if (this.x >= players[player].x) {
            this.xvel *= -1;
            players[player].xvel -=
              players[player].x - this.x + (this.xvel - players[player].xvel);
          }
          if (this.y <= players[player].y) {
            this.yvel *= -1;
            players[player].yvel -=
              players[player].y - this.y + (this.yvel - players[player].yvel);
          }
          if (this.y >= players[player].y) {
            this.yvel *= -1;
            players[player].yvel -=
              players[player].y - this.y + (this.yvel - players[player].yvel);
          }
        }
      }
    }
  }

  input() {
    if (this.id == 0) {
      if (keyIsDown(87)) {
        this.yvel -= this.speed;
      }
      if (keyIsDown(83)) {
        this.yvel += this.speed;
      }
      if (keyIsDown(65)) {
        this.xvel -= this.speed;
      }
      if (keyIsDown(68)) {
        this.xvel += this.speed;
      }
    } else if (this.id == 1) {
      if (keyIsDown(UP_ARROW)) {
        this.yvel -= this.speed;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.yvel += this.speed;
      }
      if (keyIsDown(p5.LEFT_ARROW)) {
        this.xvel -= this.speed;
      }
      if (keyIsDown(p5.RIGHT_ARROW)) {
        this.xvel += this.speed;
      }
    }
  }
}
