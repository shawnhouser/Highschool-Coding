var boardSize = 300;

var board = new Array(boardSize).fill().map(()=> new Array(boardSize).fill(0));
function amountOfNeighbors(x,y){
	var neighbors = 0;
	if(y == 0 && x == 0){
		neighbors += board[y][x+1];
		neighbors += board[y+1][x];
		neighbors += board[y+1][x+1];
	} else if(x == boardSize-1 && y == boardSize-1){
		neighbors += board[y-1][x-1];
		neighbors += board[y-1][x];	
		neighbors += board[y][x-1];
	} else if(x == 0 && y == boardSize-1){
		neighbors += board[y-1][x];
		neighbors += board[y-1][x+1];	
		neighbors += board[y][x+1];
	} else if(x == boardSize-1 && y == 0){
		neighbors += board[y][x-1];
		neighbors += board[y+1][x-1];	
		neighbors += board[y+1][x];
	} else if(x == 0){
		neighbors += board[y-1][x];
		neighbors += board[y-1][x+1];
		neighbors += board[y][x+1];
		neighbors += board[y+1][x];
		neighbors += board[y+1][x+1];
	} else if(y == 0){
		neighbors += board[y][x-1];
		neighbors += board[y][x+1];
		neighbors += board[y+1][x-1];
		neighbors += board[y+1][x];
		neighbors += board[y+1][x+1];
	} else if(y == boardSize-1){
		neighbors += board[y-1][x-1];
		neighbors += board[y-1][x];
		neighbors += board[y-1][x+1];
		neighbors += board[y][x-1];
		neighbors += board[y][x+1];
	} else if(x == boardSize-1){
		neighbors += board[y-1][x-1];
		neighbors += board[y-1][x];
		neighbors += board[y][x-1];
		neighbors += board[y+1][x-1];
		neighbors += board[y+1][x];
	} else {
		neighbors += board[y-1][x-1];
		neighbors += board[y-1][x];
		neighbors += board[y-1][x+1];
	
		neighbors += board[y][x-1];
		//
		neighbors += board[y][x+1];

		neighbors += board[y+1][x-1];
		neighbors += board[y+1][x];
		neighbors += board[y+1][x+1];
	}
	return neighbors;
}
function willBeAlive(x,y){
	var neighbors = amountOfNeighbors(x,y);
	var isCellAive = board[y][x];
	
	if(neighbors < 2 || neighbors > 3){
		return 0;
	} else if(neighbors == 3){
		return 1;
	} else if(isCellAive){
		return 1;
	} else {
		return 0;
	}
}

function doGeneration(){
	var newBoard = new Array(boardSize).fill().map(()=> new Array(boardSize).fill(0));
	for(var y = 0; y < boardSize; y++){
		for(var x = 0; x < boardSize; x++){
			newBoard[y][x] = willBeAlive(x,y);
		}
	}
	board = newBoard;
}
function convertToCanvasArray(outputArray){
	for(var y = 0; y < boardSize; y++){
		for(var x = 0; x < boardSize; x++){
			var index = ((y * boardSize) + x) * 4 + 3;
			var currentCell = board[y][x];
			if(currentCell){
				outputArray[index] = 0;
			} else {
				outputArray[index] = 255;
			}
		}
	}
}
function draw(){

	var ctx = document.getElementById("canvas").getContext('2d');
	ctx.canvas.height = boardSize;
	ctx.canvas.width  = boardSize;

	var imageData = ctx.getImageData(0, 0, boardSize, boardSize);
	convertToCanvasArray(imageData.data)
	ctx.putImageData(imageData, 0, 0);

	document.getElementById("canvas").style.width  = boardSize * 2;
	document.getElementById("canvas").style.height = boardSize * 2;
}
function fullGeneration(){
	doGeneration();
	draw();
}
function start(){
	setTimeout(function() {
		fullGeneration();
		start()
	}, 50)
}

/*board[2][1] = 1;
board[2][2] = 1;
board[2][3] = 1;
board[1][3] = 1;
board[0][2] = 1;*/


board[6][2]=1;board[7][2]=1;
board[6][3]=1;board[7][3]=1;

		board[4][14]=1;board[4][15]=1;	
	board[5][13]=1;					board[5][17]=1;
board[6][12]=1;								board[6][18]=1;
board[7][12]=1;				board[7][16]=1;	board[7][18]=1;board[7][19]=1;
board[8][12]=1;								board[8][18]=1;
	board[9][13]=1;					board[9][17]=1;
		board[10][14]=1;board[10][15]=1;

										board[2][26]=1;
					board[3][24]=1;		board[3][26]=1;
board[4][22]=1;board[4][23]=1;
board[5][22]=1;board[5][23]=1;
board[6][22]=1;board[6][23]=1;
					board[7][24]=1;		board[7][26]=1;
										board[8][26]=1;
							
board[4][36]=1;board[4][37]=1;
board[5][36]=1;board[5][37]=1;
/*
board[231][231]=1;board[231][232]=1;board[231][233]=1;				  board[231][235]=1;
board[232][231]=1;
											      board[233][234]=1;board[233][235]=1;
			  board[234][232]=1;  board[234][233]=1;				  board[234][235]=1;
board[235][231]=1;				board[235][233]=1;				  board[235][235]=1;
			*/							
draw();
start();


