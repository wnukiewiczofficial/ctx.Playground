let instructions =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo diam id efficitur finibus. Duis in placerat felis, sed imperdiet tortor. Quisque in finibus ligula, et aliquam ligula. Nunc sit amet lorem eget ante sagittis malesuada eget eget dolor. Quisque et ullamcorper diam. Duis rhoncus nibh vitae ex eleifend, quis facilisis libero finibus. Pellentesque at ornare ex. Vivamus id nunc dolor. Aenean augue lacus, malesuada varius lacus et, auctor accumsan quam. Fusce sit amet cursus augue, in commodo massa. Cras molestie nulla diam, id vehicula augue lacinia vel. Nulla eros augue, posuere vel vulputate id, rutrum in risus. Quisque risus augue, aliquet blandit dapibus id, fermentum ac elit. Nullam ac dapibus sem. Fusce tempor mi non ex tristique, quis mollis tellus consequat.";

function drawBackground() {
  ctx.save();
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawLogo() {
  ctx.save();
  ctx.drawImage(
    logo,
    canvas.width / 32,
    canvas.height / 32,
    canvas.width / 4,
    canvas.height / 8
  );
  ctx.restore();
}

function drawComputers() {
  ctx.save();
  let w = canvas.width / 4;
  let h = canvas.width / 6;
  //Left computer
  ctx.drawImage(lComputerImage, w / 3, canvas.height / 2 - h / 2, w, h);
  //Right computer
  ctx.drawImage(
    rComputerImage,
    canvas.width - w - w / 3,
    canvas.height / 2 - h / 2,
    w,
    h
  );
  ctx.restore();
}

//WINDOW
function drawScrollWindow() {
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(
    (canvas.width / 6) * 2 + 10,
    0,
    (canvas.width / 6) * 2 - 20,
    canvas.height
  );

  ctx.strokeStyle = "#4d9ed1";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo((canvas.width / 6) * 2 + 10, 0);
  ctx.lineTo((canvas.width / 6) * 2 + 10, canvas.height);
  ctx.moveTo(canvas.width - (canvas.width / 6) * 2 - 10, 0);
  ctx.lineTo(canvas.width - (canvas.width / 6) * 2 - 10, canvas.height);
  ctx.stroke();
  ctx.restore();
}

//SCORE
function drawScore() {
  ctx.save();
  ctx.fillStyle = "#b0760b";
  ctx.textAlign = "center";
  ctx.textBaseline = "bot";

  if (scoreFontSize < canvas.width / 28 && selector.correct) scoreFontSize += 2;
  if (scoreFontSize > canvas.width / 32 && !selector.correct)
    scoreFontSize -= 2;
  ctx.font = `${scoreFontSize}px porkys`;
  ctx.fillText(
    "Score: " + man.score,
    canvas.width - canvas.width / 6,
    canvas.height / 8
  );
  ctx.restore();
}

// DRAWING REPLAY BUTTON COMMENTED OUT
// // REPLAY BUTTON
// function drawReplayButton(){
//   ctx.save();
//   let w = (canvas.width-canvas.width/6*2) - (canvas.width/6*2);
//   let h = canvas.height/6;
//   ctx.fillStyle = '#32a0a8';
//   ctx.fillRect(canvas.width/2 - w/2, canvas.height*0.8,w, h);
//
//   ctx.fillStyle = '#bd2626';
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';
//   ctx.font = '80px porkys';
//   ctx.fillText('REPLAY', canvas.width/2, canvas.height*0.8+h/2);
//   ctx.restore();
// }

// GAME OVER NOTIFICATION
function drawGameOver() {
  ctx.save();
  let w = canvas.width - (canvas.width / 6) * 2 - (canvas.width / 6) * 2;
  let h = canvas.height / 6;

  ctx.fillStyle = "#bd2626";
  ctx.strokeStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${canvas.width / 10}px porkys`;
  ctx.strokeText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.restore();
}

// DIALOG
function drawDialog() {
  ctx.save();
  ctx.fillStyle = "#bd2626";
  ctx.fillRect(
    canvas.width / 4,
    canvas.height / 2 - canvas.height * 0.2,
    canvas.width / 2,
    canvas.height * 0.65
  );

  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = `${canvas.width / 50}px porkys`;
  wrapText(
    instructions,
    canvas.width / 4,
    canvas.height / 2 - canvas.height * 0.15,
    canvas.width / 2,
    0.02 * canvas.width
  );
  ctx.restore();
}

function wrapText(text, x, y, maxWidth, lineHeight) {
  let words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + " ";
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
