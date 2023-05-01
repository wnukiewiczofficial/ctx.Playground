function drawScore() {
  push();
  p5.fill(255);
  p5.stroke(0);
  p5.textSize(32);
  textAlign(p5.LEFT, p5.TOP);
  p5.text(`Coins: ${score} / ${goal}`, 0, 0);
  pop();
}
