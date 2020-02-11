var emptyFormData = {
	"xStart":0,
	"xEnd":0,
	"yStart":0,
	"yEnd":0,
	"comparison":"",
	"xName":"",
	"yName":""
}

function whatIsIt(object) {
	var stringConstructor = "test".constructor;
	var arrayConstructor = [].constructor;
	var objectConstructor = {}.constructor;
	if (object === null) {
		return "null";
	} else if (object === undefined) {
		return "undefined";
	} else if (object.constructor === stringConstructor) {
		return "String";
	} else if (object.constructor === arrayConstructor) {
		return "Array";
	} else if (object.constructor === objectConstructor) {
		if(object[0]){
			return "Branch"
		} else {
			return "Leaf"
		}
	// return "Object"
	} else {
		return "other";
	}
}

function getExtremaFromTwoDimensional(dataArray){
	var max = 0;
	var min = 0;
	for(var i = 0; i < dataArray.length; i++) {
		var biggestFromArray = Math.max.apply(Math, dataArray[i]);
		var smallestFromArray = Math.min.apply(Math, dataArray[i]);
		if(biggestFromArray > max){
			max = biggestFromArray;
		}
		if(smallestFromArray < min){
			min = smallestFromArray
		}
	}
	return {"max" : max, 
			"min" : min};
}
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function getJSONLength(JSONArray){ 
	var numberOfObjects = Object.keys(JSONArray).length;
	var total = numberOfObjects;
	for(var i = 0; i < numberOfObjects; i++){
		var currentItemType = whatIsIt(Object.keys(JSONArray)[i])
		if(Object.keys(JSONArray)[i] == "comparison"){
			total--;
		} else {
		}
	}
	
	return total;
}

function findIfAnyNull(inputTree){
	var currentItemType = whatIsIt(inputTree);
	if( currentItemType == "Branch"){
		var numberOfBranches = getJSONLength(inputTree);
		for(var j = 0; j < numberOfBranches; j++){
			var doesItHaveSomething = findIfAnyNull(inputTree[j]);
			if(doesItHaveSomething){
				return 1;
			} else {
				// return 0;
			}
		}
	} else if(currentItemType == "Leaf"){
		return 0;
	} else {
		return 1;
	}
}

function getURLParameters() {
  	var query_string = {};
  	var query = window.location.search.substring(1);
  	var vars = query.split("&");
  	for (var i=0;i<vars.length;i++) {
    	var pair = vars[i].split("=");
    	if (typeof query_string[pair[0]] === "undefined") {
      		query_string[pair[0]] = decodeURIComponent(pair[1]);
    	} else if (typeof query_string[pair[0]] === "string") {
      		var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      		query_string[pair[0]] = arr;
    	} else {
      		query_string[pair[0]].push(decodeURIComponent(pair[1]));
    	}
  	} 
	return query_string;
}
function removeURLParameters(){
    var url = window.location.href;
    var value  = url.split("?")[0];   
	
    return value;     
}