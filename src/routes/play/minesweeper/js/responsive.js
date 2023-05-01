// CANVAS RESIZE FUNCTIONS
function p5.resizeCanvas(){
	canvas.width = window.innerWidth;
  canvas.height = (window.innerWidth < 1366 && window.innerHeight >= 768) ? window.innerWidth/2 : window.innerHeight;

	boxW = canvas.height*0.7;
	boxH = canvas.height*0.7;

	for(i = 0; i < cells.length; i++){
		for(j = 0; j < cells[i].length; j++){
			cells[i][j].x = boxW/tilesInRow*i + canvas.width/2-boxW/2;
			cells[i][j].y = boxH/tilesInRow*j + canvas.height/2-boxH/2;
			cells[i][j].w = boxW/tilesInRow/2;
			cells[i][j].h = boxH/tilesInRow/2;
		}
	}
}
