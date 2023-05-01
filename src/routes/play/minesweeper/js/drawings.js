var instructions =
  "Some text. This is the minesweeper game. Made in HTML and Canvas. Regards :)";

function drawBackground() {
  ctx.save();
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawLogo() {
  ctx.save();
  ctx.drawImage(
    logoImg,
    canvas.width / 28,
    canvas.height / 28,
    canvas.width / 6,
    canvas.height / 12
  );
  ctx.restore();
}

function drawBox() {
  ctx.save();
  ctx.strokeStyle = "#5e5c56";
  ctx.lineWidth = 10;
  ctx.strokeRect(
    canvas.width / 2 - boxW / 2,
    canvas.height / 2 - boxH / 2,
    boxW,
    boxH
  );
  ctx.restore();
}

function drawStatistics() {
  let w = (boxW / tilesInRow / 2) * 1.5,
    h = (boxW / tilesInRow / 2) * 1.5;
  ctx.save();
  ctx.p5.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = `${w}px Arial`;
  ctx.drawImage(
    flagImg,
    canvas.width / 2 - w * 4,
    canvas.height / 2 - boxH / 2 - h * 1.5,
    w,
    h
  );
  ctx.p5.fillText(
    flagCount,
    canvas.width / 2 - w * 2.5,
    canvas.height / 2 - boxH / 2 - (h / 2) * 1.5
  );

  ctx.drawImage(
    timeImg,
    canvas.width / 2,
    canvas.height / 2 - boxH / 2 - h * 1.5,
    w,
    h
  );
  let timer =
    Math.floor(timePassed / 60) +
    ":" +
    (timePassed % 60 < 10 ? "0" + (timePassed % 60) : timePassed % 60);
  ctx.p5.fillText(
    timer,
    canvas.width / 2 + w * 1.5,
    canvas.height / 2 - boxH / 2 - (h / 2) * 1.5
  );
  ctx.restore();
}

// GAME OVER NOTIFICATION
function drawGameOver() {
  ctx.save();
  let w = canvas.width - (canvas.width / 6) * 2 - (canvas.width / 6) * 2;
  let h = canvas.height / 6;

  ctx.p5.fillStyle = "#bd2626";
  ctx.strokeStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${canvas.width / 10}px porkys`;
  ctx.strokeText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.p5.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.restore();
}

// WIN NOTIFICATION
function drawWin() {
  ctx.save();
  let w = canvas.width - (canvas.width / 6) * 2 - (canvas.width / 6) * 2;
  let h = canvas.height / 6;

  ctx.p5.fillStyle = "#0e8c00";
  ctx.strokeStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${canvas.width / 10}px porkys`;
  ctx.strokeText("YOU WON", canvas.width / 2, canvas.height / 2);
  ctx.p5.fillText("YOU WON", canvas.width / 2, canvas.height / 2);
  ctx.restore();
}

// DIALOG
function drawDialog() {
  ctx.save();
  ctx.p5.fillStyle = "#bd2626";
  ctx.p5.fillRect(
    canvas.width / 4,
    canvas.height / 2 - canvas.height * 0.3,
    canvas.width / 2,
    canvas.height * 0.65
  );

  ctx.p5.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = `${canvas.width / 50}px porkys`;
  wrapText(
    instructions,
    canvas.width / 4,
    canvas.height / 2 - canvas.height * 0.25,
    canvas.width / 2,
    0.02 * canvas.width
  );
  ctx.restore();
}

function wrapText(text, x, y, maxWidth, lineHeight) {
  var words = text.split(" ");
  var line = "";

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + " ";
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.p5.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.p5.fillText(line, x, y);
}
