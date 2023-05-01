// CANVAS RESIZE FUNCTIONS
function p5.resizeCanvas(){
	canvas.width = window.innerWidth;
  canvas.height = (window.innerWidth < 1366 && window.innerHeight >= 768) ? window.innerWidth/2 : window.innerHeight;


	//MAN RESIZE
	man.w = canvas.width/12;
	man.h = canvas.height/3;
	man.x = man.side == 0 ? canvas.width/8 : canvas.width-canvas.width/8;
	man.y = canvas.height*0.65;

	for(i = 0; i < 7; i++) blocks[i].y =i*(canvas.height/6);
	blocks.forEach((block) => {
		block.w = (canvas.width-canvas.width/6*2-20) - (canvas.width/6*2+20);
    block.h = canvas.height/6;
		block.x = canvas.width/2-block.w/2;
    block.speed = canvas.height/400;
	});

	selector.w = canvas.width/6*2-40;
	selector.x = canvas.width/6*2+20;
	selector.y = canvas.height/2+canvas.width/16-selector.h;

  if(selector.correct) scoreFontSize = canvas.width/28;
  else scoreFontSize = canvas.width/32;
}
