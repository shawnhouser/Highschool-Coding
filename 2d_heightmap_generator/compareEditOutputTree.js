function get2dWithJSON(inputLeaf, rootValues){
	return make2dArray(
		make1dArray(inputLeaf.xStart, inputLeaf.xEnd, rootValues.xPrecision), 
		make1dArray(inputLeaf.yStart, inputLeaf.yEnd, rootValues.yPrecision),
		inputLeaf.comparison
	);
}
function findOutcomeOf(inputTree, rootValues){
	/*-----------------------------------------*/
	function doFindOutcomeOf(treeBranch){
		var branchType = whatIsIt(treeBranch);
		if(branchType == "Branch"){
			var numberOfBranches = getJSONLength(treeBranch)
			if(numberOfBranches > 1){
				var aReturnArray = doFindOutcomeOf(treeBranch[0]);
				var bReturnArray = doFindOutcomeOf(treeBranch[1]);
				return compare2dArrays(aReturnArray, bReturnArray, treeBranch.comparison);
			} else {
				return doFindOutcomeOf(treeBranch[0])
			}
		} else {
			return get2dWithJSON(treeBranch, rootValues);
		}
	}
	/*-----------------------------------------*/
	return doFindOutcomeOf(inputTree);
}

var biggestID = 1;
function replaceSpotInTree(inputTree, spotId, typeToReplacement){
	/*-----------------------------------------*/
	function doReplaceSpotInTree(treeBranch){
		var numberOfBranches = getJSONLength(treeBranch);
		for(var i = 0; i < numberOfBranches; i++){
			var currentBranchType = whatIsIt(treeBranch[i])
			if(currentBranchType == "Branch"){
				doReplaceSpotInTree(treeBranch[i]);
			} else {
				if(treeBranch[i] == spotId){
					if(biggestID == spotId){
							biggestID--;
					}
					if(typeToReplacement == "Branch"){
						treeBranch[i] = {"0":biggestID+1, "1":biggestID+2};
						biggestID += 2;
						return;
					} else {
						treeBranch[i] = emptyFormData;
						return;
					}
				}
			}
		}
	}
	/*-----------------------------------------*/
	doReplaceSpotInTree(inputTree);
}

function drawFormsWithTree(treeBranch, inputHTMLNode, depth){
	var divList = [];
	var numberOfBranches = getJSONLength(treeBranch)
	var currentBranchType = whatIsIt(treeBranch)
	for(var i = 0; i < numberOfBranches; i++){
		divList[i] = document.createElement('div');
		if(depth % 2){ divList[i].className += "divPadding whiteBackground"; } else { divList[i].className += "divPadding greyBackground"; }
	}
	if( currentBranchType == "Branch"){
		depth++;
		for(var j = 0; j < numberOfBranches; j++){
			if(j != 0){
				addCompForm(treeBranch.comparison, inputHTMLNode);
			}
			
			inputHTMLNode.appendChild(divList[j]);
			drawFormsWithTree(treeBranch[j], divList[j], depth);
		}
	} else if(currentBranchType == "Leaf"){
		createInputForm(treeBranch, inputHTMLNode);
	} else {
		createVariableForm(treeBranch, inputHTMLNode);
	}
}

function createVariableForm(inputID, location){
    location.id = inputID;
    location.innerHTML +=
    '<button onclick="easyUpdate(formData, this.parentNode.id, \'Leaf\', document.getElementById(\'container\'))">Single</button>'+
    '<button onclick="easyUpdate(formData, this.parentNode.id, \'Branch\', document.getElementById(\'container\'))">Variable</button>';
}
function easyUpdate(inputTree, idToReplace, typeToReplace, highestNode){
	replaceSpotInTree(inputTree.tree, idToReplace, typeToReplace);
	while (highestNode.firstChild) {
    	highestNode.removeChild(highestNode.firstChild);
	}
	drawFormsWithTree(inputTree.tree, highestNode, 0);
}

function createInputForm(treeLeaf, location){
    var form = document.createElement("form"); form.className = "rangeInput";
    var textToAdd =
'<div class="table-like">'+
	'<div>'+
        '<span>Name</span>'+
		'<span><input type="text" class="xName "value="'+treeLeaf.xName+'"></input></span>'+
        '<span>From</span>'+
		'<span><input type="number" class="xStart" value="'+treeLeaf.xStart+'"></input></span>'+
        '<span>To</span>'+
        '<span><input type="number" class="xEnd "value="'+treeLeaf.xEnd+'"></input></span>'+
		'<span>Comp</span>'+
        '<span><select class="comparison">';
			if(treeLeaf.comparison == "x+y"){  textToAdd+=	'<option value="x+y" selected="selected">X + Y</option>'; } else { textToAdd+=	'<option value="x+y">X + Y</option>'; }
			if(treeLeaf.comparison == "x-y"){  textToAdd+=	'<option value="x-y" selected="selected">X - Y</option>'; } else { textToAdd+=	'<option value="x-y">X - Y</option>'; }
			if(treeLeaf.comparison == "y-x"){  textToAdd+=	'<option value="y-x" selected="selected">Y - X</option>'; } else { textToAdd+=	'<option value="y-x">Y - X</option>'; }
			if(treeLeaf.comparison == "x*y"){  textToAdd+=	'<option value="x*y" selected="selected">X * Y</option>'; } else { textToAdd+=	'<option value="x*y">X * Y</option>'; }
			if(treeLeaf.comparison == "x/y"){  textToAdd+=	'<option value="x/y" selected="selected">X / Y</option>'; } else { textToAdd+=	'<option value="x/y">X / Y</option>'; }
			if(treeLeaf.comparison == "y/x"){  textToAdd+=	'<option value="y/x" selected="selected">Y / X</option>'; } else { textToAdd+=	'<option value="y/x">Y / X</option>'; }
textToAdd+='</select></span>'+
    '</div><div>'+
		'<span><input type="text" class="yName" value="'+treeLeaf.yName+'"></input></span>'+
    '</div><div>'+
        '<span>From</span>'+
    '</div><div>'+
        '<span><input type="number" class="yStart" value="'+treeLeaf.yStart+'"></input></span>'+
	'</div><div>'+
        '<span>To</span>'+
    '</div><div>'+
		'<span><input type="number" class="yEnd" value="'+treeLeaf.yEnd+'"></input></span>'+
    '</div>'+
'</div>';
	form.innerHTML = textToAdd;
	location.appendChild(form);
}
function addCompForm(comparison, location){
	 var form = document.createElement("select"); form.className = "topBotComp";
	 var textToAdd = "";
	 if(comparison == "t+b"){textToAdd+='<option value="t+b" selected="selected">Top + Bot</option>'} else {textToAdd+='<option value="t+b">Top + Bot</option>'}
	 if(comparison == "t-b"){textToAdd+='<option value="t-b" selected="selected">Top - Bot</option>'} else {textToAdd+='<option value="t-b">Top - Bot</option>'}
	 if(comparison == "b-t"){textToAdd+='<option value="b-t" selected="selected">Bot - Top</option>'} else {textToAdd+='<option value="b-t">Bot - Top</option>'}
	 if(comparison == "t*b"){textToAdd+='<option value="t*b" selected="selected">Top * Bot</option>'} else {textToAdd+='<option value="t*b">Top * Bot</option>'}
	 if(comparison == "t/b"){textToAdd+='<option value="t/b" selected="selected">Top / Bot</option>'} else {textToAdd+='<option value="t/b">Top / Bot</option>'}
	 if(comparison == "b/t"){textToAdd+='<option value="b/t" selected="selected">Bot / Top</option>'} else {textToAdd+='<option value="b/t">Bot / Top</option>'}
	 form.innerHTML = textToAdd;
	 location.appendChild(form);
}

function createFirstForm(inputLeaf, location){
	var form = document.createElement("form"); form.className = "totalInput";
	var textToAdd = 
		'<div class="table-like">'+
    		'<div>'+
        		'<span>Acurcy</span>'
    			if(inputLeaf.xPrecision){ textToAdd +='<span><input type="number" class="xPrecision" value="'+inputLeaf.xPrecision+'"></input></span>'} else { textToAdd +='<span><input type="number" class="xPrecision"></input></span>' }
    textToAdd+='<span>Scale</span>'
				if(inputLeaf.xScale){ textToAdd +='<span><input type="number" class="xScale" value="'+inputLeaf.xScale+'"></input></span>'} else { textToAdd +='<span><input type="number" class="xScale"></input></span>' }
	textToAdd+='<span>Shading</span>'+
				'<span><select class="lowDark">'
    				if(inputLeaf.lowDark == 1){textToAdd+='<option value="1" selected="selected">Low Dark</option>'} else {textToAdd+='<option value="1">Low Dark</option>'}
    				if(inputLeaf.lowDark == 0){textToAdd+='<option value="0" selected="selected">High Dark</option>'} else {textToAdd+='<option value="0">High Dark</option>'}
	textToAdd+='</select></span>'+
				'<span>LineDirct</span>'+
				'<span><select class="lineDirection">'
					if(inputLeaf.lineDirection == 0){textToAdd+='<option value="0" selected="selected">None</option>'} else {textToAdd+='<option value="0">None</option>'}
    				if(inputLeaf.lineDirection == "Low"){textToAdd+='<option value="Low" selected="selected">Folo Low</option>'} else {textToAdd+='<option value="Low">Folo Low</option>'}
    				if(inputLeaf.lineDirection == "High"){textToAdd+='<option value="High" selected="selected">Folo High</option>'} else {textToAdd+='<option value="High">Folo High</option>'}
	textToAdd+='</select></span>'+
			'</div><div>'
				if(inputLeaf.yPrecision){ textToAdd +='<span><input type="number" class="yPrecision" value="'+inputLeaf.yPrecision+'"></input></span>'} else { textToAdd +='<span><input type="number" class="yPrecision"></input></span>' }
textToAdd+='<canvas style="width:0px;height:0px;"></canvas>'+
			'</div><div>'+
				'<span>Scale</span>'+
			'</div><div>'
				if(inputLeaf.yScale){ textToAdd +='<span><input type="number" class="yScale" value="'+inputLeaf.yScale+'"></input></span>'} else { textToAdd +='<span><input type="number" class="yScale"></input></span>' }
textToAdd+='</div><div>'+
				'<span>Color</span>'+
			'</div><div>'
				if(inputLeaf.color){ textToAdd +='<span><input type="text" class="jscolor" value="'+inputLeaf.color+'"></input></span>'} else { textToAdd +='<span><input type="text" class="jscolor" value="FF0000"></input></span>' }
textToAdd+='</div>'+
		'</div>'
	form.innerHTML = textToAdd;
	location.insertBefore(form, location.firstChild);
}