const static = require('./static.js');
module.exports = {
	doCharacters: function(string){
		const chunkSize = static.blockSize * 3 / 2;
		let returnArray = [];
		for(let i = 0; i < string.length; i += chunkSize + 1){
			const subStringAnswers = this.dechipherSubString(string.substring(i, i + chunkSize));
			returnArray.push(subStringAnswers);
		}
		return returnArray;
	},

	doNumbers: function(number){
		const chunkSize = static.blockSize * 3;
		let returnArray = [];
		for(let i = 0; i < number.length; i += chunkSize){
			const subStringAnswer = this.number_subString(string.substring(i, i + chunkSize));
			returnArray.push(subStringAnswers);
		}
		return returnArray;
	},

	dechipherSubString: function(letters){
		const allPossible = this.characters_number(letters);
		const number_subString = this.number_subString
		const allAnswers = allPossible.map(function(element){
			return number_subString(element)
		}).filter(function(element){
			return element;
		});
		return allAnswers;
	},

	characters_number: function(letters){
		let returnNumberStrings = [];
		recurse(letters, '');
		return returnNumberStrings;

		function recurse(string, numberString){
			const currentLetter = string.charAt(0);
			const restOfLetters = string.substring(1);
			const currentLetterIndex = static.characters.indexOf(currentLetter);
			if(!currentLetter) { 
				returnNumberStrings.push(numberString);
				return;
			}
			if(currentLetterIndex === -1) {
				console.log('ERROR - unknown character');
				return;
			}

			for(let i = currentLetterIndex; i < 99; i += static.characters.length) {
				recurse(restOfLetters, numberString + static.pad(i, 2));
			}
		}
	},

	number_subString: function(number){
		let returnString = [];
		for(let i = 0; i < static.blockSize; i++){
			for(var j = 0; j < static.primes.length; j++){
				const newNumber = number / static.primes[j];
				if(Number.isInteger(newNumber)){
					const position = j % static.blockSize;
					const character = static.characters[Math.floor(j / static.blockSize)];

					if(returnString[position]) return ''; // no repeats

					returnString[position] = character;
					number = newNumber;
					break;
				}
			}
			if(j === static.primes.length)	return '';
		}
		return returnString.join('');
	}
}