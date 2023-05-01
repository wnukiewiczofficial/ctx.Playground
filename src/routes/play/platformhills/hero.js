function Hero() {
  this.w = 80;
  this.h = 150;
  this.x = p5.width / 2;
  this.y = ground.y - this.h;
  this.vel = { x: 0, y: 0 };
  this.left = false;
  this.right = false;
  this.jumping = false;
  this.plummeting = false;
  this.falling = false;
  this.ground = true;
  this.lost = false;
  this.state = "idle";

  this.resize = function () {
    if (["idle", "idle_jump", "idle_fall"].includes(this.state)) {
      this.w = 80;
      this.h = 150;
    } else if (["die"].includes(this.state)) {
      this.w = 100;
      this.h = 80;
    } else {
      this.w = 60;
      this.h = 150;
    }

    if (this.x < p5.width * 0.3) this.x = p5.width * 0.3;
    else if (this.x + this.w > p5.width * 0.7) this.x = p5.width * 0.7 - this.w;
  };

  this.draw = function () {
    this.resize();
    image(character[this.state], this.x, this.y, this.w, this.h);
  };

  this.update = function () {
    if (this.lost) return;

    if (this.y + this.h >= p5.height) {
      this.lost = true;
      this.h /= 2;
      this.y = p5.height - this.h;
      sounds.die.play();
      return;
    }

    if (this.vel.x > 0) this.vel.x -= 0.2;
    if (this.vel.x < 0) this.vel.x += 0.2;

    if (abs(this.vel.x) < 0.2) this.vel.x = 0;
    this.x += this.vel.x;

    this.y += gravity;
    if (this.vel.y > 0) this.vel.y -= 1;
    this.y -= this.vel.y;
    if (this.vel.y <= 0) {
      this.vel.y = 0;
      this.jumping = false;
      this.plummeting = true;
    }

    if (this.y + this.h >= ground.y && !this.falling) {
      this.ground = true;
      this.jumping = false;
      this.plummeting = false;
      this.y = ground.y - this.h;
    }

    if (this.left) {
      if (this.x > p5.width * 0.3) {
        if (this.vel.x >= -6) this.vel.x -= 1.2;
      } else {
        this.vel.x = 0;
        worldX += 10;
      }
    }
    if (this.right) {
      if (this.x + this.w < p5.width * 0.7) {
        if (this.vel.x <= 6) this.vel.x += 1.2;
      } else {
        this.vel.x = 0;
        worldX -= 10;
      }
    }
  };

  this.lookForMotion = function () {
    let state = "idle";
    if (this.left) state = "left";
    else if (this.right) state = "right";

    if (this.jumping) state += "_jump";
    else if (this.plummeting) state += "_fall";

    if (this.lost) state = "die";

    this.state = state;
  };

  this.keyPressed = function () {
    if (keyCode == p5.LEFT_ARROW) {
      this.left = true;
    }
    if (keyCode == p5.RIGHT_ARROW) {
      this.right = true;
    }
    if (keyCode == UP_ARROW && !this.jumping && !this.plummeting) {
      sounds.jump.play();
      this.jumping = true;
      this.ground = false;
      this.vel.y += 30;
    }
  };

  this.keyReleased = function () {
    if (keyCode == p5.LEFT_ARROW) {
      this.left = false;
    }
    if (keyCode == p5.RIGHT_ARROW) {
      this.right = false;
    }
  };
}
