// CANVAS RESIZE FUNCTIONS
function p5.resizeCanvas(){
	canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

	boxW = canvas.height*0.35;
	boxH = canvas.height*0.35;

	for(i = 0; i < cells.length; i++){
		for(j = 0; j < cells[i].length; j++){
			cells[i][j].x = boxW/4*i + canvas.width/2-boxW/2;
			cells[i][j].y = boxH/4*j + canvas.height/2-boxH/4;
			cells[i][j].w = boxW/4/2;
			cells[i][j].h = boxH/4/2;
		}
	}

	for(let i in bar){
		bar[i].x = boxW/4*i + canvas.width/2-boxW/2;
		bar[i].y = boxH/4*4 + canvas.height/2-boxH/4;
		bar[i].w = boxW/4/2;
		bar[i].h = boxH/4/2;
	}
}
