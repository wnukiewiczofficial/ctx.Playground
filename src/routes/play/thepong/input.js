import {
  touch,
  click,
  stopped,
  scene,
  mode,
  difficulty,
  paddle2,
  p5,
} from "./globals";

import { Reset } from "./score";

//When user p5.value.touches the screen
export function touchStarted() {
  if (stopped.value && scene.value == "game") stopped.set(false);
  if (scene.value == "game") {
    touch.set(true);
    click.set(false);
    paddle2.value.StartMoving(touch.value, click.value);
  }
  if (scene.value == "menu") {
    let ebox = {
      x: p5.value.width / 2 - (p5.value.width * 0.5) / 2,
      y:
        p5.value.height / 2 -
        p5.value.height * 0.1 * 1.2 -
        (p5.value.height * 0.1) / 2,
      w: p5.value.width * 0.5,
      h: p5.value.height * 0.1,
    };
    let mbox = {
      x: p5.value.width / 2 - (p5.value.width * 0.5) / 2,
      y: p5.value.height / 2 - (p5.value.height * 0.1) / 2,
      w: p5.value.width * 0.5,
      h: p5.value.height * 0.1,
    };
    let hbox = {
      x: p5.value.width / 2 - (p5.value.width * 0.5) / 2,
      y:
        p5.value.height / 2 +
        p5.value.height * 0.1 * 1.2 -
        (p5.value.height * 0.1) / 2,
      w: p5.value.width * 0.5,
      h: p5.value.height * 0.1,
    };

    if (
      p5.value.touches[0].x >= ebox.x &&
      p5.value.touches[0].x <= ebox.x + ebox.w &&
      p5.value.touches[0].y >= ebox.y &&
      p5.value.touches[0].y <= ebox.y + ebox.h &&
      scene.value == "menu" &&
      mode.value == "none"
    ) {
      mode.set("easy");
      difficulty.set(0.3);
      Reset();
      scene.set("game");
    } else if (
      p5.value.touches[0].x >= mbox.x &&
      p5.value.touches[0].x <= mbox.x + mbox.w &&
      p5.value.touches[0].y >= mbox.y &&
      p5.value.touches[0].y <= mbox.y + mbox.h &&
      scene.value == "menu" &&
      mode.value == "none"
    ) {
      mode.set("medium");
      difficulty.set(0.6);
      Reset();
      scene.set("game");
    } else if (
      p5.value.touches[0].x >= hbox.x &&
      p5.value.touches[0].x <= hbox.x + hbox.w &&
      p5.value.touches[0].y >= hbox.y &&
      p5.value.touches[0].y <= hbox.y + hbox.h &&
      scene.value == "menu" &&
      mode.value == "none"
    ) {
      mode.set("hard");
      difficulty.set(0.9);
      Reset();
      scene.set("game");
    }
  }
}

//When user drags a touch
export function touchMoved() {
  if (!stopped.value && scene.value == "game")
    paddle2.value.Move(touch.value, click.value);
}

//When user stops touching the screen
export function touchEnd() {
  touch.set(false);
}

//When user holds his mouse pressed
export function mousePressed() {
  if (stopped.value && scene.value == "game") stopped.set(false);
  if (scene.value == "game") {
    click.set(true);
    touch.set(false);
    paddle2.value.StartMoving(touch.value, click.value);
  }
  if (scene.value == "menu") {
    let ebox = {
      x: p5.value.width / 2 - (p5.value.width * 0.5) / 2,
      y:
        p5.value.height / 2 -
        p5.value.height * 0.1 * 1.2 -
        (p5.value.height * 0.1) / 2,
      w: p5.value.width * 0.5,
      h: p5.value.height * 0.1,
    };
    let mbox = {
      x: p5.value.width / 2 - (p5.value.width * 0.5) / 2,
      y: p5.value.height / 2 - (p5.value.height * 0.1) / 2,
      w: p5.value.width * 0.5,
      h: p5.value.height * 0.1,
    };
    let hbox = {
      x: p5.value.width / 2 - (p5.value.width * 0.5) / 2,
      y:
        p5.value.height / 2 +
        p5.value.height * 0.1 * 1.2 -
        (p5.value.height * 0.1) / 2,
      w: p5.value.width * 0.5,
      h: p5.value.height * 0.1,
    };

    if (
      p5.value.mouseX >= ebox.x &&
      p5.value.mouseX <= ebox.x + ebox.w &&
      p5.value.mouseY >= ebox.y &&
      p5.value.mouseY <= ebox.y + ebox.h &&
      scene.value == "menu" &&
      mode.value == "none"
    ) {
      mode.value = "easy";
      difficulty.value = 0.3;
      Reset();
      scene.value = "game";
    } else if (
      p5.value.mouseX >= mbox.x &&
      p5.value.mouseX <= mbox.x + mbox.w &&
      p5.value.mouseY >= mbox.y &&
      p5.value.mouseY <= mbox.y + mbox.h &&
      scene.value == "menu" &&
      mode.value == "none"
    ) {
      mode.set("medium");
      difficulty.set(0.6);
      Reset();
      scene.set("game");
    } else if (
      p5.value.mouseX >= hbox.x &&
      p5.value.mouseX <= hbox.x + hbox.w &&
      p5.value.mouseY >= hbox.y &&
      p5.value.mouseY <= hbox.y + hbox.h &&
      scene.value == "menu" &&
      mode.value == "none"
    ) {
      mode.set("hard");
      difficulty.set(0.9);
      Reset();
      scene.set("game");
    }
  }
}

//When user drags his mouse
export function mouseDragged() {
  if (!stopped.value && scene.value == "game")
    paddle2.value.Move(touch.value, click.value);
}

//When user stops draggin his mouse
export function mouseReleased() {
  click.set(false);
}
