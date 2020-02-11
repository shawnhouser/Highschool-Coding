// Good practice --- Always Leave and enter through stored data --- Remember This
	var items = [];
		

	
// What it really does ATM is count times the function has been called
// Storing the output in localStorage.itemCount	
	function itemCount() {
		// If the value is a number then
		if(localStorage.itemCount) {
			// Set the number to itself + 1, Counting
			localStorage.itemCount = Number(localStorage.itemCount)+1;
			// Return that Number
			return Number(localStorage.itemCount);
		// If its NaN
		} else {
			// Set it to 1
			localStorage.itemCount = 1;
			// And return 1 so it doesn't look funky
			return 1;
		}
	}



// Adds the value of the box to an array in the number currentItemNumber
	// AddBoxToArray(curretnItemNumber)
	function ABTA() {
		if(document.getElementById("inputText").value.toLowerCase()) {
			CUIN = itemCount();
			// If a storage of items Exsists then make that the current
			// Always enter through stored data
			if(localStorage["items"]) {
				items = JSON.parse(localStorage["items"]);
			}
			// Set items[$CUIN] to the value of the field
			items[CUIN] = document.getElementById("inputText").value.toLowerCase();
			// Append to the log the important stuff With onclicks and onmouseout's all the good stuff
			// if you can never touch this stuff
			document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + 
			"<div class='item' onmouseover='displayRemove("+ CUIN +")' onmouseout='undisplayRemove("+CUIN+")' id='item" + CUIN + "'>" + items[CUIN] + 
			"<div id='remove" + CUIN + "' class='removeButton' onclick='removeItem("+CUIN+")'></div></div>";
	
			// Always Leave in Stored Data
			// Set [itemList] in local storage with JSON.stringify
			localStorage["items"] = JSON.stringify(items);
			// Set itemHTML = the log's HTML
			localStorage.itemHTML = document.getElementById('log').innerHTML;
	
		}
	}
			
			
			
// Displays the value of something in the array with the value of the box
// Good for something like "what is your 15th item?"
// ATM Unused
	function displayBoxValue(boxValue) {
		// Always Enter through Stored data
		var itemStored = JSON.parse(localStorage["items"]);
		document.getElementById("result").innerHTML = itemStored[boxValue];
	}
	
	
	
// Load the page to make it the same as last time
	function loadPage() {
		// If itemsHTML has something
		if(localStorage.itemHTML) {
			// Display it
			document.getElementById('log').innerHTML = localStorage.itemHTML;
			calcItemInfo();
		}
	}
	
	
	
	
	
	
	function calcItemInfo() {
		// Don't have it keep adding Reset it
		var weight = 0;
		var AC = 0;
		// Always start from Stored Data
		var itemStored = JSON.parse(localStorage["items"]);
		
		for (var itemInfoCounter = 1; itemInfoCounter - 1 < localStorage.itemCount; itemInfoCounter++) {
			var currentWrokingItem = itemStored[itemInfoCounter];
			if(itemValue.hasOwnProperty(currentWrokingItem)) {
				weight = weight + itemValue[currentWrokingItem].weight;
				AC = AC + itemValue[currentWrokingItem].AC;
				document.getElementById('item'+itemInfoCounter).classList.add(itemValue[currentWrokingItem].class); 
			}
		}
		document.getElementById('weight').innerHTML = "Your Weight is " + weight + "kg";
		document.getElementById('AC').innerHTML = "Your AC is "+AC;
	}
	
	
	function displayRemove(CUIN) {
		document.getElementById("remove"+CUIN).style.display = "block";
	}
	function undisplayRemove(CUIN) {
		document.getElementById("remove"+CUIN).style.display = "none";
	}
	
	
	function removeItem(CUIN){
		if(localStorage["items"]) {
			items = JSON.parse(localStorage["items"]);
		}
		items[CUIN] = 0;
		localStorage["items"] = JSON.stringify(items);
		calcItemInfo();
		
		
		document.getElementById("item"+CUIN).parentNode.removeChild(document.getElementById("item"+CUIN));
		localStorage.itemHTML = document.getElementById('log').innerHTML;
	}