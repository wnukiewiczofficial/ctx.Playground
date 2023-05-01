let pressed = false;

window.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }

window.addEventListener('touchstart', callChangeSide, false);
window.addEventListener('touchend', releaseChangeSide, false);

window.addEventListener('mousedown', callChangeSide, false);
window.addEventListener('mouseup', releaseChangeSide, false);

function callChangeSide(e){
  let mpos = getMousePos(canvas, e) || getTouchPos(canvas, e);

  if(pressed == false && started && !dialog){
    if(mpos.x >= pointer.x && mpos.x <= pointer.x + pointer.d && mpos.y >= pointer.y && mpos.y <= pointer.y + pointer.d){
      man.side = man.side == 0 ? 1 : 0;
      pointer.reset();
      return;
    }

    for(let i in fallings){
      if(mpos.x >= fallings[i].x && mpos.x <= fallings[i].x + fallings[i].d && mpos.y >= fallings[i].y && mpos.y <= fallings[i].y + fallings[i].d){
        if(fallings[i].bad){
          man.lose();
          fallings.shift();
          return;
        } else{
          fallings.shift();
        }
      }
    }
  }
  if(!started || dialog){
    pointer.reset();
    started = true;
    man.score = 0;
    dialog = false;
    fallings = [];
    fallingInterval = setInterval(() => {fallings.push(new Falling(0, Math.floor(Math.random()*2)));}, 5000);
    for(i = 0; i < blocks.length; i++) blocks[i].value = Math.random();
    for(i = 0; i < 7; i++) blocks[i] = new Block(i*((canvas.height/6)));
    let color = animateColor(selector.red, selector.green, selector.blue, 255, 255, 255, 0.1);
    selector.red = color.r;
    selector.green = color.g;
    selector.blue = color.b;
  }
  pressed = true;
}

function releaseChangeSide(){
  pressed = false;
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

function getTouchPos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.touches[0].clientX - rect.left,
    y: e.touches[0].clientY - rect.top
  };
}
