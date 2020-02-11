function draw2d(inputTwoDimensionalArray, canvasHtmlNode, xScaleFactor, yScaleFactor, lowDark, lineDirection, lineColor){
	var maxY = inputTwoDimensionalArray.length;
	var maxX = inputTwoDimensionalArray[0].length;
	
	var ctx = canvasHtmlNode.getContext('2d');
	ctx.canvas.height = maxY;
	ctx.canvas.width  = maxX;
	var imageData = ctx.getImageData(0, 0, maxX, maxY);

	convertToCanvasArray(inputTwoDimensionalArray, imageData.data, lowDark, lineDirection, lineColor);
	ctx.putImageData(imageData, 0, 0);

	canvasHtmlNode.style.width  = maxX * xScaleFactor;
	canvasHtmlNode.style.height = maxY * yScaleFactor;
}
	


function convertToCanvasArray(dataArray, outputArray, lowDark, lineDirection, lineColor){
/*  function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
		return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
	}   */
	var extrema = getExtremaFromTwoDimensional(dataArray);

	var maxY = dataArray.length;
	var maxX = dataArray[0].length;
	if(lowDark){
		for(var y = 0; y < maxY; y++){
			for(var x = 0; x < maxX; x++){
				var index = ((y * maxX) + x) * 4 + 3;
				var value = 255 * (dataArray[y][x] - extrema.max) / (extrema.min - extrema.max);
				outputArray[index] = value;
			}
		}
	} else {
		for(var y = 0; y < maxY; y++){
			for(var x = 0; x < maxX; x++){
				var index = ((y * maxX) + x) * 4 + 3;
				var value = 255 * (dataArray[y][x] - extrema.min) / (extrema.max - extrema.min);
				outputArray[index] = value;
			}
		}
	}
	var xPos = 0;
	var yPos = 0;
	if(lineDirection != 0){
		var red = (parseInt(lineColor.substring(0,2), 16));
		var green = (parseInt(lineColor.substring(2,4), 16));
		var blue = (parseInt(lineColor.substring(4,6), 16));
		if(lineDirection == "High"){
			for(var i = 0; i < maxX+maxY; i++){
				var index = (yPos * maxX + xPos) * 4;
				outputArray[index+0] = red;
				outputArray[index+1] = green;
				outputArray[index+2] = blue;
				outputArray[index+3] = 255;
				if(xPos < maxX-1 && yPos < maxY-1) {
					if(dataArray[yPos+1][xPos] > dataArray[yPos][xPos+1]){
						yPos++;
					} else if(dataArray[yPos+1][xPos] < dataArray[yPos][xPos+1]){
						xPos++;
					} else {
						xPos++;
						yPos++;
					} 
				} else {
					if(xPos == maxX-1){
						yPos++;
					} else {
						xPos++;
					}
				}
			}
		} else if(lineDirection == "Low"){
			for(var i = 0; i < maxX+maxY; i++){
				var index = (yPos * maxX + xPos) * 4;
				outputArray[index+0] = red;
				outputArray[index+1] = green;
				outputArray[index+2] = blue;
				outputArray[index+3] = 255;
				if(xPos < maxX-1 && yPos < maxY-1) {
					if(dataArray[yPos+1][xPos] < dataArray[yPos][xPos+1]){
						yPos++;
					} else if(dataArray[yPos+1][xPos] > dataArray[yPos][xPos+1]){
						xPos++;
					} else {
						xPos++;
						yPos++;
					} 
				} else {
					if(xPos == maxX-1){
						yPos++;
					} else {
						xPos++;
					}
				}
			}
		}
	}
}