function drawBackground() {
  ctx.save();
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawField() {
  ctx.save();
  ctx.p5.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 10;
  ctx.drawImage(
    fieldImg,
    canvas.width / 2 - boxW / 2 - boxW / 8,
    canvas.height / 2 - boxH * 1.18,
    boxW + boxW / 4,
    boxH + boxH / 4 + boxH
  );
  ctx.restore();
}

function drawInfo() {
  ctx.save();
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.p5.fillStyle = "#FFFFFF";
  ctx.font = `${boxH * 0.06}px Anton`;
  ctx.p5.fillText(
    "Score to beat",
    canvas.width / 2 - boxW / 2.1,
    canvas.height / 2 - boxH * 0.8
  );
  ctx.textAlign = "right";
  ctx.p5.fillText(
    "Multiplier",
    canvas.width / 2 + boxW / 2.1,
    canvas.height / 2 - boxH * 0.8
  );
  ctx.textAlign = "center";
  ctx.p5.fillText("Money", canvas.width / 2, canvas.height / 2 - boxH * 0.46);

  ctx.font = `${boxH * 0.15}px Anton`;
  ctx.p5.fillStyle = "#fcba03";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.p5.fillText(
    "13999",
    canvas.width / 2 - boxW / 2.1,
    canvas.height / 2 - boxH
  );
  ctx.p5.fillStyle = "#00eb00";
  ctx.textAlign = "right";
  ctx.p5.fillText(
    "X1.5",
    canvas.width / 2 + boxW / 2.1,
    canvas.height / 2 - boxH
  );
  ctx.p5.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.p5.fillText(
    "L$15",
    canvas.width / 2 - boxW / 2.4,
    canvas.height / 2 - boxH * 0.68
  );

  ctx.p5.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";

  ctx.font = `${boxH * 0.04}px Anton`;
  ctx.p5.fillText(
    "Score",
    canvas.width / 2 - boxW / 2.1,
    canvas.height / 2 - boxH / 4
  );
  ctx.textAlign = "right";
  ctx.p5.fillText(
    "Round",
    canvas.width / 2 + boxW / 2.1,
    canvas.height / 2 - boxH / 4
  );

  ctx.font = `${boxH * 0.08}px Anton`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";

  let x,
    y,
    isApplied = false;
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      if (cells[i][j].applying) {
        x = i;
        y = j;
        isApplied = true;
        break;
      }
    }
  }

  if (ending && isApplied) {
    if (x == hintCell.i && y == hintCell.i && cells[x][y].applying) {
      ctx.p5.fillStyle = "#40016b";
    } else if (cells[x][y].applying) {
      ctx.p5.fillStyle = "#40016b";
    } else {
      ctx.p5.fillStyle = "#FFFFFF";
    }
  }
  ctx.p5.fillText(
    score,
    canvas.width / 2 - boxW / 2.1,
    canvas.height / 2 - boxH / 2.9
  );
  ctx.textAlign = "right";
  ctx.p5.fillStyle = "#FFFFFF";
  ctx.p5.fillText(
    round,
    canvas.width / 2 + boxW / 2.1,
    canvas.height / 2 - boxH / 2.9
  );
  ctx.restore();
}
