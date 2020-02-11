function minimumSpanningTree(cityMatrix){
	var amountOfCities = cityMatrix.length;

	/* allEdges is an array of all the edges sorted from least distance to greatest */
	var allEdges = matrixToEdges(cityMatrix).sort((a,b) => a.distance - b.distance);
	var allPointsUsed = [];
	var returnPath = [];

	allPointsUsed.push(allEdges[0].start);
	allPointsUsed.push(allEdges[0].end);

	returnPath.push(allEdges[0].start);
	returnPath.push(allEdges[0].end);
	returnPath.push(-1);
	
	while(allPointsUsed.length < amountOfCities){
		for(j in allEdges){
			var currentEdge = allEdges[j];
			var point1 = currentEdge.start;
			var point2 = currentEdge.end;
			var point1Exist = allPointsUsed.indexOf(point1) != -1;
			var point2Exist = allPointsUsed.indexOf(point2) != -1;
			
			if((!point1Exist && !point2Exist) || (point1Exist && point2Exist)){
				continue;
			} else if(point1Exist && !point2Exist){
				returnPath.push(currentEdge.start);
				returnPath.push(currentEdge.end);
				returnPath.push(-1);
				allPointsUsed.push(point2)
				break;
			}
		}
	}
	return returnPath;
}