import { p5, players, started, infoFont } from "./globals";
import Menu from "./start";
export default class Player {
  constructor(x, y, nickname, id) {
    this.w = 0.04 * (p5.value.width + p5.value.height);
    this.h = 0.04 * (p5.value.width + p5.value.height);
    this.x = x;
    this.y = y;
    this.xvel = 0;
    this.yvel = 0;
    this.speed = 1;
    this.xgravity = 0.5;
    this.ygravity = 0.5;
    this.col = p5.value.color(0, 0, 0);
    this.tagged = false;
    this.tagTime = 8;
    this.counterControl = 0;
    this.nickname = nickname;
    this.id = id;
    this.winner = false;
  }

  draw() {
    if (!this.winner)
      this.col = this.tagged
        ? p5.value.color(200, 0, 0)
        : p5.value.color(0, 0, 0);
    else this.col = p5.value.color(0, 200, 0);
    p5.value.noStroke();
    p5.value.fill(this.col);

    if (this.tagTime <= 0) this.x = -2 * p5.value.width;
    p5.value.rect(this.x, this.y, this.w, this.h);

    p5.value.stroke(this.col);
    p5.value.textSize(14);
    p5.value.textAlign(p5.value.CENTER, p5.value.BOTTOM);
    p5.value.textFont(infoFont.value);
    p5.value.text(this.nickname, this.x, this.y - this.h / 2);
    if (this.winner) {
      p5.value.textSize(30);
      p5.value.textAlign(p5.value.CENTER, p5.value.TOP);
      p5.value.text("WINNER", this.x, this.y + this.h / 2);
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
        p5.value.fill(255);
        p5.value.stroke(255);
        p5.value.strokeWeight(0.5);
        p5.value.textSize(30);
        p5.value.textAlign(p5.value.CENTER, p5.value.CENTER);
        p5.value.textFont(infoFont.value);
        p5.value.text(this.tagTime, this.x, this.y);
      } else {
        this.tagged = false;
        this.tagTime = 0;
        setTimeout(() => {
          started.set(false);
          Menu();
        }, 5000);
        let pl = players.value;
        pl[this.id == 0 ? 1 : 0].winner = true;
        players.set(pl);
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
    if (this.x + this.w / 2 > p5.value.width) {
      this.x = p5.value.width - this.w / 2;
      this.xvel *= -1;
    }
    if (this.y - this.h / 2 < 0) {
      this.y = this.h / 2;
      this.yvel *= -1;
    }
    if (this.y + this.h / 2 > p5.value.height) {
      this.y = p5.value.height - this.h / 2;
      this.yvel *= -1;
    }

    for (let player in players.value) {
      if (players.value[player] != this) {
        if (
          this.x + this.w / 2 >=
            players.value[player].x - players.value[player].w / 2 &&
          this.x - this.w / 2 <=
            players.value[player].x + players.value[player].w / 2 &&
          this.y + this.h / 2 >=
            players.value[player].y - players.value[player].h / 2 &&
          this.y - this.h / 2 <=
            players.value[player].y + players.value[player].h / 2
        ) {
          if (this.tagged) {
            setTimeout(() => {
              let pl = players.value;
              pl[player].tagged = true;
              pl[player].tagTime = 6;
              players.set(pl);
              this.tagged = false;
            }, 20);
          }
          if (this.x <= players.value[player].x) {
            this.xvel *= -1;
            let pl = players.value;
            pl[player].xvel -=
              players.value[player].x -
              this.x +
              (this.xvel - players.value[player].xvel);
            players.set(pl);
          }
          if (this.x >= players.value[player].x) {
            this.xvel *= -1;
            let pl = players.value;
            pl[player].xvel -=
              players.value[player].x -
              this.x +
              (this.xvel - players.value[player].xvel);
            players.set(pl);
          }
          if (this.y <= players.value[player].y) {
            this.yvel *= -1;
            let pl = players.value;
            pl[player].yvel -=
              players.value[player].y -
              this.y +
              (this.yvel - players.value[player].yvel);
            players.set(pl);
          }
          if (this.y >= players.value[player].y) {
            this.yvel *= -1;
            let pl = players.value;
            pl[player].yvel -=
              players.value[player].y -
              this.y +
              (this.yvel - players.value[player].yvel);
            players.set(pl);
          }
        }
      }
    }
  }

  input() {
    if (this.id == 0) {
      if (p5.value.keyIsDown(87)) {
        this.yvel -= this.speed;
      }
      if (p5.value.keyIsDown(83)) {
        this.yvel += this.speed;
      }
      if (p5.value.keyIsDown(65)) {
        this.xvel -= this.speed;
      }
      if (p5.value.keyIsDown(68)) {
        this.xvel += this.speed;
      }
    } else if (this.id == 1) {
      if (p5.value.keyIsDown(p5.value.UP_ARROW)) {
        this.yvel -= this.speed;
      }
      if (p5.value.keyIsDown(p5.value.DOWN_ARROW)) {
        this.yvel += this.speed;
      }
      if (p5.value.keyIsDown(p5.value.LEFT_ARROW)) {
        this.xvel -= this.speed;
      }
      if (p5.value.keyIsDown(p5.value.RIGHT_ARROW)) {
        this.xvel += this.speed;
      }
    }
  }
}
