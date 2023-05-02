class Boss {
  constructor() {
    this.w = p5.width * 0.2;
    this.h = p5.height * 0.4;
    this.x = p5.width;
    this.y = p5.height / 2 - this.h / 2;
    this.summoned = false;
    this.dying = false;
    this.speed = p5.width * 0.005;
    this.ydir = 1;
    this.hp = 100;

    this.shootingInterval;
  }

  summon() {
    if (this.x > p5.width - this.w * 1.2) this.x -= this.speed;
    else {
      this.summoned = true;
      this.shootingInterval = setInterval(this.shoot, 3000);
    }
  }

  die() {
    if (this.x < p5.width) this.x += this.speed;
    else {
      score += 50;
      boss = undefined;
    }
  }

  move() {
    this.y -= (this.ydir * this.speed) / 4;
    if (this.y <= p5.height / 2 - this.h / 2) this.ydir = -1;
    else if (this.y + this.h >= p5.height * 0.8) this.ydir = 1;
  }

  stopShooting() {
    clearInterval(this.shootingInterval);
  }

  shoot() {
    tridents.push(new Trident());
  }

  fight() {
    if (this.hp <= 0) {
      this.hp = 0;
      if (!this.dying) this.dying = true;
      this.die();
    }

    if (
      this.x + this.w * 0.8 >= shark.x &&
      this.x + this.w * 0.2 <= shark.x + shark.w &&
      this.y + this.h * 0.9 >= shark.y &&
      this.y + this.h * 0.1 <= shark.y + shark.h &&
      !lost
    ) {
      lives = 0;
      lost = true;
      background_song.stop();
      die_sound.play();
    }
  }

  draw() {
    image(
      trident_img,
      this.x + this.w * 0.1,
      this.y,
      this.w * 0.2,
      this.h * 0.8
    );
    image(boss_img, this.x, this.y, this.w, this.h);

    //HP indicator
    p5.push();

    p5.fill(0, 200, 0);
    p5.noStroke();
    let hpWidth = map(this.hp, 0, 100, 0, this.w * 0.5);
    p5.rect(
      this.x + (this.w * 0.5) / 2,
      this.y - this.h * 0.1,
      hpWidth,
      this.h * 0.05
    );

    nop5.fill();
    p5.stroke(0);
    p5.strokeWeight(p5.width * 0.002);
    p5.rect(
      this.x + (this.w * 0.5) / 2,
      this.y - this.h * 0.1,
      this.w * 0.5,
      this.h * 0.05
    );
    p5.pop();
  }
}
