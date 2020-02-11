function getRangeInputForms() {
	var forms = document.getElementsByClassName("rangeInput");
    var finalReturnInfo = [];
	for(var i = 0; i < forms.length; i++){
		var currentBlock = forms[i];

        var returnInfo = {};
		returnInfo.xStart = 0;
		returnInfo.xEnd = 0;

		returnInfo.yStart = 0;
		returnInfo.yEnd = 0;

		returnInfo.comparison = "";
		returnInfo.xName = "";
		returnInfo.yName = "";
				
		for(var j = 0; j < currentBlock.length; j++){
			if(currentBlock[j].value){
				if(currentBlock[j].className.includes("xStart")){
					returnInfo.xStart = parseFloat(currentBlock[j].value);
				} else if(currentBlock[j].className.includes("xEnd")){
					returnInfo.xEnd = parseFloat(currentBlock[j].value);
				} else if(currentBlock[j].className.includes("yStart")){
					returnInfo.yStart = parseFloat(currentBlock[j].value);
				} else if(currentBlock[j].className.includes("yEnd")){
					returnInfo.yEnd = parseFloat(currentBlock[j].value);
				} else if(currentBlock[j].className.includes("comparison")){
					returnInfo.comparison = currentBlock[j].value;
				} else if(currentBlock[j].className.includes("xName")){
					returnInfo.xName = currentBlock[j].value;
				} else if(currentBlock[j].className.includes("yName")){
					returnInfo.yName = currentBlock[j].value;
				}
			}
        }
        finalReturnInfo[i] = returnInfo;
    }
    return finalReturnInfo;
}
function getFirstForm() {
	var forms = document.getElementsByClassName("totalInput");
	var currentBlock = forms[0];

    var returnInfo = {};
	returnInfo.xPrecision = 0;
	returnInfo.xScale = 0;

	returnInfo.yPrecision = 0;
	returnInfo.yScale = 0;

	returnInfo.color = "";

    returnInfo.lowDark = "";
    returnInfo.lineDirection = "";
				
	for(var j = 0; j < currentBlock.length; j++){
		if(currentBlock[j].value){
			if(currentBlock[j].className.includes("xPrecision")){
				returnInfo.xPrecision = parseFloat(currentBlock[j].value);
			} else if(currentBlock[j].className.includes("xScale")){
				returnInfo.xScale = parseFloat(currentBlock[j].value);
			} else if(currentBlock[j].className.includes("yPrecision")){
				returnInfo.yPrecision = parseFloat(currentBlock[j].value);
			} else if(currentBlock[j].className.includes("yScale")){
				returnInfo.yScale = parseFloat(currentBlock[j].value);
			} else if(currentBlock[j].className.includes("jscolor")){
				returnInfo.color = currentBlock[j].value;
			} else if(currentBlock[j].className.includes("lowDark")){
				returnInfo.lowDark = parseInt(currentBlock[j].value);
			} else if(currentBlock[j].className.includes("lineDirection")){
				returnInfo.lineDirection = currentBlock[j].value;
			}
		}
    }
    return returnInfo;
}

function mapFormsToTree(inputTree){
	var objectCounter = 0;
	var arrayOfForms = getRangeInputForms();
	/* --------------------------------*/
	function doMapFormsToTree(treeBranch){
		var numberOfBranches = getJSONLength(treeBranch);
		for(var i = 0; i < numberOfBranches; i++){
			var currentBranchType = whatIsIt(treeBranch[i])
			if(currentBranchType == "Branch"){
				doMapFormsToTree(treeBranch[i]);
			} else {
				treeBranch[i] = arrayOfForms[objectCounter];
				objectCounter++;
			}
		}
	}
	/* --------------------------------*/
	doMapFormsToTree(inputTree);
}

function addTBComparisons(inputTree, htmlNode){
    if(htmlNode.childNodes[0].tagName != "FORM" && htmlNode.childNodes[0].tagName != "OPTION" &&
    htmlNode.tagName != "SELECT"){
		var numberOfBranches = getJSONLength(inputTree);
        for(var i = 0; i < numberOfBranches; i++){
            var childNodeNumber = 0;
            if(i > 0){
                childNodeNumber = i*2;
            }
            inputTree.comparison = htmlNode.childNodes[1].value
            addTBComparisons(inputTree[i], htmlNode.childNodes[childNodeNumber])
        }
    }
}