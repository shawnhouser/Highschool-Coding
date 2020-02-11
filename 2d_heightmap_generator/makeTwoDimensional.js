function make1dArray(startValue, endValue, maxLength){
	var outputArray=[];
	if(startValue < endValue){
		for(var i = 0; i < maxLength; i++){
			outputArray[i] = (((endValue-startValue)/(maxLength-1)) * i) + startValue;
		}
	} else if(startValue > endValue){
		for(var i = 0; i < maxLength; i++){
			outputArray[i] = startValue - (((startValue-endValue)/(maxLength-1)) * i);
		}
	} else {
		for(var i = 0; i < maxLength; i++){
			outputArray[i] = startValue;
		}
	}
	return outputArray;
}

function make2dArray(xArray, yArray, comparison){
	var outputArray=[];
	var maxY = yArray.length;
	var maxX = xArray.length;
	switch (comparison) {
		case "x+y":
			for(var y = 0; y < maxY; y++){
				outputArray[y] = [];
				for(var x = 0; x < maxX; x++){
					outputArray[y][x] = xArray[x] + yArray[y];
				}
			}
		break; case "x-y":
			for(var y = 0; y < maxY; y++){
				outputArray[y] = [];
				for(var x = 0; x < maxX; x++){
					outputArray[y][x] = xArray[x] - yArray[y];
				}
			}
		break; case "y-x":
			for(var y = 0; y < maxY; y++){
				outputArray[y] = [];
				for(var x = 0; x < maxX; x++){
					outputArray[y][x] = yArray[y] - xArray[x];
				}
			}
		break; case "x*y":
			for(var y = 0; y < maxY; y++){
				outputArray[y] = [];
				for(var x = 0; x < maxX; x++){
					outputArray[y][x] = xArray[x] * yArray[y];
				}
			}
		break; case "x/y":
			var lowestY = Math.min.apply(Math, yArray);
			if(lowestY <= 0){
				for(var y = 0; y < maxY; y++){
					outputArray[y] = [];
					for(var x = 0; x < maxX; x++){
						var returnValue = xArray[x] / yArray[y];
						if(isFinite(returnValue)){
							outputArray[y][x] = returnValue;
						} else {
							outputArray[y][x] = 0
						}
					}
				}
			} else {
				for(var y = 0; y < maxY; y++){
					outputArray[y] = [];
					for(var x = 0; x < maxX; x++){
						outputArray[y][x] = xArray[x] / yArray[y];
					}
				}
			}
		break; case "y/x":
			var lowestX = Math.min.apply(Math, xArray);
			if(lowestX <= 0){
				for(var y = 0; y < maxY; y++){
					outputArray[y] = [];
					for(var x = 0; x < maxX; x++){
						var returnValue = yArray[y] / xArray[x];
						if(isFinite(returnValue)){
							outputArray[y][x] = returnValue;
						} else {
							outputArray[y][x] = 0
						}
					}
				}
			} else {
				for(var y = 0; y < maxY; y++){
					outputArray[y] = [];
					for(var x = 0; x < maxX; x++){
						outputArray[y][x] = yArray[y] / xArray[x];
					}
				}
			}
		break; default:
			for(var y = 0; y < maxY; y++){
				outputArray[y] = [];
				for(var x = 0; x < maxX; x++){
					outputArray[y][x] = 0;
				}
			}
		break; // Break on final for clarity and proper Indentation
	} // End of Switch on the comparison
	return outputArray;
}

function compare2dArrays(topArray, botArray, comparison){
	if(topArray.length != botArray.length || topArray[0].length != botArray[0].length){ return; }
	var outputArray = [];
	var maxY = topArray.length;
	var maxX = topArray[0].length;
	switch (comparison) {
		case "t+b":
			for(var y = 0; y < maxY; y++){
				outputArray[y] = []
				for(var x = 0; x < maxX; x++){
					outputArray[y][x] = topArray[y][x] + botArray[y][x];
				}
			}
		break; case "t-b":
			for(var y = 0; y < maxY; y++){
				outputArray[y] = []
				for(var x = 0; x < maxX; x++){
					outputArray[y][x] = topArray[y][x] - botArray[y][x];
				}	
			}
		break; case "b-t":
			for(var y = 0; y < maxY; y++){
				outputArray[y] = []
				for(var x = 0; x < maxX; x++){
					outputArray[y][x] = botArray[y][x] - topArray[y][x];
				}
			}
		break; case "t*b":
			for(var y = 0; y < maxY; y++){
				outputArray[y] = []
				for(var x = 0; x < maxX; x++){
					outputArray[y][x] = topArray[y][x] * botArray[y][x];
				}
			}
		break; case "t/b":
			var botExtrema = getExtremaFromTwoDimensional(botArray);
			if(botExtrema.min <= 0){
				for(var y = 0; y < maxY; y++){
					outputArray[y] = []
					for(var x = 0; x < maxX; x++){
						var returnValue =  topArray[y][x] / botArray[y][x];
						if(isFinite(returnValue)){
							outputArray[y][x] = returnValue;
						} else {
							outputArray[y][x] = 0;
						}
					}
				}
			} else {
				for(var y = 0; y < maxY; y++){
					outputArray[y] = []
					for(var x = 0; x < maxX; x++){
						outputArray[y][x] = topArray[y][x] / botArray[y][x];
					}
				}
			}
		break; case "b/t":
			var topExtrema = getExtremaFromTwoDimensional(topArray);
			if(topExtrema.min <= 0){
				for(var y = 0; y < maxY; y++){
					outputArray[y] = []
					for(var x = 0; x < maxX; x++){
						var returnValue =  botArray[y][x] / topArray[y][x];
						if(isFinite(returnValue)){
							outputArray[y][x] = returnValue;
						} else {
							outputArray[y][x] = 0;
						}
					}
				}
			} else {
				for(var y = 0; y < maxY; y++){
					outputArray[y] = []
					for(var x = 0; x < maxX; x++){
						outputArray[y][x] = botArray[y][x] / topArray[y][x] || 0;
					}
				}
			}
		break; default:
			for(var y = 0; y < maxY; y++){
				outputArray[y] = []
				for(var x = 0; x < maxX; x++){
					outputArray[y][x] = 0;
				}
			}
		break; // Break on final for clarity and proper Indentation
	} // End of Switch on the comparison
	return outputArray;
}