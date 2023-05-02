let timLongTouch;
let mobileX, mobileY;

window.addEventListener("contextmenu", (e) => e.preventDefault()); // Deleting RMB context

window.addEventListener(
  "touchstart",
  (e) => {
    let rect = canvas.getBoundingClientRect();
    mobileX = e.touches[0].clientX - rect.left;
    mobileY = e.touches[0].clientY - rect.top;
    timLongTouch = setTimeout(held, 500);
  },
  false
);
window.addEventListener(
  "touchend",
  (e) => {
    checkLongTouch(e);
  },
  false
);

// Hold function
function held() {
  mobileX = Math.floor(mobileX);
  mobileY = Math.floor(mobileY);
  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells[i].length; j++) {
      if (
        mobileX > cells[i][j].x &&
        mobileX < cells[i][j].x + cells[i][j].w * 2 &&
        mobileY > cells[i][j].y &&
        mobileY < cells[i][j].y + cells[i][j].h * 2
      ) {
        cells[i][j].marked = !cells[i][j].marked;
        if (cells[i][j].marked && !cells[i][j].isVisible) {
          flagCount++;
          if (cells[i][j].isBomb) correctFlags++;
        } else if (!cells[i][j].marked && !cells[i][j].isVisible) {
          flagCount--;
          if (cells[i][j].isBomb) correctFlags--;
        }
      }
    }
  }
}

// Hold is cancelled
function checkLongTouch() {
  if (timLongTouch) {
    clearTimeout(timLongTouch);
  }
}
//MOUSE
window.addEventListener("mousedown", interact, false);

function interact(e) {
  if (!started || dialog) {
    started = true;
    dialog = false;

    cells = new Array(tilesInRow);
    createMap();
    intervalVar = setInterval(() => timePassed++, 1000);
  } else if (started) {
    let pos = getMousePos(canvas, e);
    for (i = 0; i < cells.length; i++) {
      for (j = 0; j < cells[i].length; j++) {
        if (
          pos.x > cells[i][j].x &&
          pos.x < cells[i][j].x + cells[i][j].w * 2 &&
          pos.y > cells[i][j].y &&
          pos.y < cells[i][j].y + cells[i][j].h * 2
        ) {
          if (e.button == 0) {
            cells[i][j].discover();
            if (cells[i][j].isBomb) {
              started = false;
              clearInterval(intervalVar);
            }
          }
          if (e.button == 2) {
            cells[i][j].marked = !cells[i][j].marked;
            if (cells[i][j].marked && !cells[i][j].isVisible) {
              flagCount++;
              if (cells[i][j].isBomb) correctFlags++;
            } else if (!cells[i][j].marked && !cells[i][j].isVisible) {
              flagCount--;
              if (cells[i][j].isBomb) correctFlags--;
            }
          }
        }
      }
    }
  }
}

// Function that returns mouse position
function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
