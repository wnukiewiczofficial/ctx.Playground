//When user touches the screen
function touchStarted() {
  if (stopped && scene == "game") stopped = false;
  if (scene == "game") {
    touch = true;
    click = false;
    paddle2.StartMoving(touch, click);
  }
  if (scene == "menu") {
    let ebox = {
      x: p5.width / 2 - (p5.width * 0.5) / 2,
      y: p5.height / 2 - p5.height * 0.1 * 1.2 - (p5.height * 0.1) / 2,
      w: p5.width * 0.5,
      h: p5.height * 0.1,
    };
    let mbox = {
      x: p5.width / 2 - (p5.width * 0.5) / 2,
      y: p5.height / 2 - (p5.height * 0.1) / 2,
      w: p5.width * 0.5,
      h: p5.height * 0.1,
    };
    let hbox = {
      x: p5.width / 2 - (p5.width * 0.5) / 2,
      y: p5.height / 2 + p5.height * 0.1 * 1.2 - (p5.height * 0.1) / 2,
      w: p5.width * 0.5,
      h: p5.height * 0.1,
    };

    if (
      touches[0].x >= ebox.x &&
      touches[0].x <= ebox.x + ebox.w &&
      touches[0].y >= ebox.y &&
      touches[0].y <= ebox.y + ebox.h &&
      scene == "menu" &&
      mode == "none"
    ) {
      mode = "easy";
      difficulty = 0.3;
      Reset();
      scene = "game";
    } else if (
      touches[0].x >= mbox.x &&
      touches[0].x <= mbox.x + mbox.w &&
      touches[0].y >= mbox.y &&
      touches[0].y <= mbox.y + mbox.h &&
      scene == "menu" &&
      mode == "none"
    ) {
      mode = "medium";
      difficulty = 0.6;
      Reset();
      scene = "game";
    } else if (
      touches[0].x >= hbox.x &&
      touches[0].x <= hbox.x + hbox.w &&
      touches[0].y >= hbox.y &&
      touches[0].y <= hbox.y + hbox.h &&
      scene == "menu" &&
      mode == "none"
    ) {
      mode = "hard";
      difficulty = 0.9;
      Reset();
      scene = "game";
    }
  }
}

//When user drags a touch
function touchMoved() {
  if (!stopped && scene == "game") paddle2.Move(touch, click);
}

//When user stops touching the screen
function touchEnd() {
  touch = false;
}

//When user holds his mouse pressed
function mousePressed() {
  if (stopped && scene == "game") stopped = false;
  if (scene == "game") {
    click = true;
    touch = false;
    paddle2.StartMoving(touch, click);
  }
  if (scene == "menu") {
    let ebox = {
      x: p5.width / 2 - (p5.width * 0.5) / 2,
      y: p5.height / 2 - p5.height * 0.1 * 1.2 - (p5.height * 0.1) / 2,
      w: p5.width * 0.5,
      h: p5.height * 0.1,
    };
    let mbox = {
      x: p5.width / 2 - (p5.width * 0.5) / 2,
      y: p5.height / 2 - (p5.height * 0.1) / 2,
      w: p5.width * 0.5,
      h: p5.height * 0.1,
    };
    let hbox = {
      x: p5.width / 2 - (p5.width * 0.5) / 2,
      y: p5.height / 2 + p5.height * 0.1 * 1.2 - (p5.height * 0.1) / 2,
      w: p5.width * 0.5,
      h: p5.height * 0.1,
    };

    if (
      p5.mouseX >= ebox.x &&
      p5.mouseX <= ebox.x + ebox.w &&
      p5.mouseY >= ebox.y &&
      p5.mouseY <= ebox.y + ebox.h &&
      scene == "menu" &&
      mode == "none"
    ) {
      mode = "easy";
      difficulty = 0.3;
      Reset();
      scene = "game";
    } else if (
      p5.mouseX >= mbox.x &&
      p5.mouseX <= mbox.x + mbox.w &&
      p5.mouseY >= mbox.y &&
      p5.mouseY <= mbox.y + mbox.h &&
      scene == "menu" &&
      mode == "none"
    ) {
      mode = "medium";
      difficulty = 0.6;
      Reset();
      scene = "game";
    } else if (
      p5.mouseX >= hbox.x &&
      p5.mouseX <= hbox.x + hbox.w &&
      p5.mouseY >= hbox.y &&
      p5.mouseY <= hbox.y + hbox.h &&
      scene == "menu" &&
      mode == "none"
    ) {
      mode = "hard";
      difficulty = 0.9;
      Reset();
      scene = "game";
    }
  }
}

//When user drags his mouse
function mouseDragged() {
  if (!stopped && scene == "game") paddle2.Move(touch, click);
}

//When user stops draggin his mouse
function mouseReleased() {
  click = false;
}

function preventDefault(e) {
  e.preventDefault();
}

function disableScroll() {
  document.body.addEventListener("touchmove", preventDefault, {
    passive: false,
  });
}
function enableScroll() {
  document.body.removeEventListener("touchmove", preventDefault);
}
