function distance(x1, y1, x2, y2){ return Math.pow(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2), 1/2); }
function numberToChar(i) { return (i >= 26 ? numberToChar((i / 26 >> 0) - 1) : '') + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i % 26 >> 0]; }
function swapSpotsInArray(array, x, y){ array[x] = [array[y],array[y]=array[x]][0]; }
function copyObject(object){ return JSON.parse(JSON.stringify(object)); }

function makeRandomCities(amount, maxX, maxY){
	var randomCities = [];
	for(var i = 0; i < amount; i++){
		var currentCity = {};
		currentCity.x = Math.floor(Math.random()*maxX)+1;
		currentCity.y = Math.floor(Math.random()*maxY)+1;
		currentCity.name = numberToChar(i);
		randomCities.push(currentCity);
	}
	return randomCities;
}

function citiesToMatrix(cities){
	var cityMatrix = [];
	var amountOfCities = cities.length;
	for(var i = 0; i < amountOfCities; i++){
		cityMatrix[i] = [];
		for(var j = 0; j < amountOfCities; j++){
			var city1 = cities[i];
			var city2 = cities[j];
			cityMatrix[i][j] = distance(city1.x, city1.y, city2.x, city2.y);
		}
	}
	return cityMatrix;
}

function findPathDistance(cityMatrix, orderOfCities){
	var pathDistance = 0;
	var amountOfCities = cityMatrix.length;
	for(var i = 0; i < amountOfCities; i++) {
		var city1id = orderOfCities[i % amountOfCities];
		var city2id = orderOfCities[(i + 1)% amountOfCities];
		
		pathDistance += cityMatrix[city1id][city2id];
		if(cityMatrix[city1id][city2id] == 0){ return Number.POSITIVE_INFINITY; }
	}
	return pathDistance;
}

function matrixToEdges(cityMatrix){
	var allEdges = [];
	var amountOfCities = cityMatrix.length;
	for(var i = 0; i < amountOfCities; i++){
		for(var j = 0; j < amountOfCities; j++){
			if(i == j || cityMatrix[i][j] == 0){ continue; }
			allEdges.push({
				distance:cityMatrix[i][j],
				start:i,
				end:j
			})
		}
	}
	return allEdges;
}