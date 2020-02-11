function travelingSalsemanProblem(cityMatrix, options){
	if(arguments.length == 1){ options = null; }
	
	var travelingSalsemanCost = Number.POSITIVE_INFINITY;
	var travelingSalsemanPath = [];
	var amountOfCities = cityMatrix.length;

	function changeOrder(orderOfCities, i) { // i = depth;
		if (i == amountOfCities-1){ // Stop when depth == max depth
			var pathDistance = findPathDistance(cityMatrix, orderOfCities);
			if(pathDistance < travelingSalsemanCost){
				travelingSalsemanCost = pathDistance;
				travelingSalsemanPath = copyObject(orderOfCities);
			}
		} else {
			for (var j = i; j < amountOfCities; j++) {
				swapSpotsInArray(orderOfCities, i, j);
				changeOrder(orderOfCities, i + 1);
				swapSpotsInArray(orderOfCities, j, i);
			}
		}
	}
	function nearestNeighbor(){
		var lastPointId = 0;
		var visitedCities = [];
		visitedCities.push(lastPointId);

		for(var i = 0; i < amountOfCities-1; i++){
			var nearestNeighborDist = Number.POSITIVE_INFINITY;
			var nearestNeighborId = null;
			for(var j = 0; j < amountOfCities; j++){
				if(cityMatrix[lastPointId][j] == 0) {continue;}
				var pointDist = cityMatrix[lastPointId][j]
				if(pointDist < nearestNeighborDist && visitedCities.indexOf(j) == -1){
					nearestNeighborId = j;
					nearestNeighborDist = pointDist;
				}
			}
			lastPointId = nearestNeighborId;
			visitedCities.push(nearestNeighborId);
		}
		return visitedCities;
	}

	var startArray = []; for(var i = 0; i < amountOfCities; i++){ startArray[i] = i; }
	changeOrder(startArray, 0);
	var nearestNeighborPath = nearestNeighbor();
	var nearestNeighborCost = findPathDistance(cityMatrix, nearestNeighborPath);
	;
	return {
		tsPath:travelingSalsemanPath,
		tscost:travelingSalsemanCost,
		nnPath:nearestNeighborPath,
		nnCost:nearestNeighborCost
	};
}