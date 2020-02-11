function displayCities(cityObjects, canvasContext, options){
	if(arguments.length == 2){ options = null; }
	options.isDot = options.isDot || false;
	options.useNumberName = options.useNumberName || false;
	options.dotSize = options.dotSize || 3;
	options.color = options.color || "red";


	canvasContext.fillStyle = options.color;
	for(var i = 0; i < cityObjects.length; i++){
		var currentCity = cityObjects[i];
		if(options.isDot){
			canvasContext.beginPath();
			canvasContext.arc(currentCity.x, currentCity.y, options.dotSize, 0, 2 * Math.PI);
			canvasContext.fill();
		} else {
			canvasContext.beginPath();
			canvasContext.fillText(options.useNumberName?i:currentCity.name, currentCity.x, currentCity.y);
		}
	}
}

function drawPath(cityObjects, cityMatrix, order, canvasContext, options){
	if(arguments.length == 3){ options = null; }
	options = options || {}
	options.color = options.color || "black";
	options.lineColor = options.lineColor || options.color;
	options.drawLength = options.drawLength || false;
	options.textColor = options.textColor || "blue";
	options.units = options.units || "ft";

	
	var amountOfEdges = order.length;
	for(var i = 0; i < amountOfEdges; i++){
		var city1id = order[i % amountOfEdges];
		var city1 = cityObjects[city1id];
		var city2id = order[(i + 1)% amountOfEdges];
		var city2 = cityObjects[city2id];
		if(city1id == -1 || city2id == -1){ continue; }
		
		canvasContext.beginPath();
		canvasContext.strokeStyle = options.lineColor;
		canvasContext.moveTo(city1.x,city1.y);
		canvasContext.lineTo(city2.x,city2.y);
		canvasContext.stroke();
		if(options.drawLength){
			var dist = Math.trunc(cityMatrix[city1id][city2id])+options.units;
			var averageX = (city1.x+city2.x)/2;
			var averageY = (city1.y+city2.y)/2;
			canvasContext.fillStyle = options.textColor;
			canvasContext.fillText(dist, averageX, averageY);
		}
	}
}