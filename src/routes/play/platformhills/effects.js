function canvasTint() {
  p5.push();
  let tintLevel = map(hero.y, ground.y * 0.8, p5.height - hero.h, 0, 180);

  p5.fill(0, 0, 0, tintLevel);
  p5.noStroke();
  p5.rect(0, 0, p5.width, p5.height);
  p5.pop();
}
