

var input = {};

input.question   = document.getElementById("question");
input.answerForm = document.getElementById("answer");
input.answerBox  = input.answerForm.childNodes[1];
input.numberOfCities = 0;
input.names = [];
input.cityMatrix = [];
input.startInput = function(){
	input.question.innerHTML = "How many Cities?";
	input.answerForm.onsubmit = input.getCities;
	input.answerBox.type = "number";
};
input.getCities = function(){
	input.numberOfCities = input.answerBox.value;

	input.startNameing();
	return false;
}
input.startNameing = function(){
	input.answerBox.value = "";
	input.answerBox.type = "text";

	input.question.innerHTML = "Name of City 0";
	

	input.answerForm.onsubmit = input.nameCity;
	return false;
}

input.nameCity = function(){
	var currentCityNumber = input.names.length;
	var currentCityName = input.answerBox.value;
	input.names[currentCityNumber] = currentCityName;

	if(currentCityNumber == input.numberOfCities-1){
		console.log(input.names)
		input.startBuildingMatrix();
	} else {
		input.question.innerHTML = "Name of City " + (currentCityNumber+1);
		input.answerBox.value = "";
	}
	return false;
}

input.startBuildingMatrix = function(){
	for(var i = 0; i < input.numberOfCities; i++){
		input.cityMatrix[i] = [];
	}
	input.answerForm.onsubmit = input.addDistanceToMatrix;
	input.answerBox.value = "";
	input.answerBox.type = "number";

	input.question.innerHTML = "Distance from " + input.names[0] + " to " + input.names[0];
	return false;
}
input.addDistanceToMatrix = function(){
	var totalCitiesSoFar = 0;
	for(var i = 0; i < input.numberOfCities; i++){
		totalCitiesSoFar += input.cityMatrix[i].length
	}
	var toCity = totalCitiesSoFar % input.numberOfCities;
	var fromCity = Math.floor(totalCitiesSoFar / input.numberOfCities);

	var currentCityDistance = (toCity == fromCity)?0: parseInt(input.answerBox.value);
	input.cityMatrix[fromCity][toCity] = currentCityDistance;

	if(totalCitiesSoFar == Math.pow(input.numberOfCities, 2)-1){
		input.question.style.display = "none";
		input.answerForm.style.display = "none";
		input.submit();
	} else {
		var adjToCity = (totalCitiesSoFar+1) % input.numberOfCities;
		var adjFromCity = Math.floor((totalCitiesSoFar+1) / input.numberOfCities);
		input.question.innerHTML = "Distance from " + input.names[adjFromCity] + " to " + input.names[adjToCity];
		input.answerBox.value = "";
	}
	return false;
}

input.submit = function(){
	var randomCityObjects = []
	for(var i = 0; i < input.numberOfCities; i++){
		randomCityObjects[i] = {};
		randomCityObjects[i].name = input.names[i];
		randomCityObjects[i].y = Math.sin(Math.PI*2*(i/(input.numberOfCities)))*((maxX-50)/2)+maxX/2
		randomCityObjects[i].x = Math.cos(Math.PI*2*(i/(input.numberOfCities)))*((maxX-50)/2)+maxX/2
	}
	doCalculations(input.cityMatrix, randomCityObjects);
}