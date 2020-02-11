const static = require('./static.js');
module.exports = {
	doCharacters: function(message){
		const chunkSize = static.blockSize * 3 / 2;
		const number = this.string_number(message);
		let ciphered = this.number_characters(number);
		for(let i = chunkSize; i < ciphered.length; i += chunkSize + 1){
			ciphered =  ciphered.slice(0, i) + static.breakCharacter + ciphered.slice(i, ciphered.length)
		}
		return ciphered;
	},

	doNumbers: function(message){
		return number = this.string_number(message);
	},

	number_characters: function(numberString){
		let returnString = '';
		for(let i = 0; i < numberString.length; i += 2){
			const currentNumber = parseInt(numberString.substring(i, i+2));
			returnString += static.characters[currentNumber % static.nstcDifficulty];
		}
		return returnString;
	},

	string_number: function(string){
		let numberString = '';
		for(let i = 0; i < string.length; i += static.blockSize){
			const partString = string.substring(i, i + static.blockSize);
			const number = subString_number(partString) % static.nDifficulty;
			numberString += static.pad(number, static.blockSize * 3);
		}
		return numberString;

		function subString_number(subString){
			let returnNumber = 1;
			for(let i = 0; i < static.blockSize; i++){
				const currentLetter = subString.charAt(i) || static.characters[static.characters.length - 1];
				/* if character is not found, set to last character in the array */
				const currentLetterIndex = (static.characters.indexOf(currentLetter) + 1 || static.characters.length) - 1;
				const position = static.blockSize * currentLetterIndex + i;

				returnNumber *= static.primes[position];
			}
			return returnNumber;
		}
	}
}