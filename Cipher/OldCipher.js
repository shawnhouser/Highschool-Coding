var primes = {
	'a': 02,
	'b': 03,
	'c': 05,
	'd': 07,
	'e': 11,
	'f': 13,
	'g': 17,
	'h': 19,
	'i': 23,
	'j': 29,
	'k': 31,
	'l': 37,
	'm': 41,
	'n': 43,
	'o': 47,
	'p': 53,
//	'q': 00 replace with ku
	'r': 59,
	's': 61,
	't': 67,
	'u': 71,
	'v': 73,
//	'w': 00 replace with uu
	'x': 79,
	'y': 83,
	'z': 89,
	'.': 97
}
var primeNumbers = [02, 03, 05, 07, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

var jump = 4
//var message = "Hello World! This is a simple cipher that I built. I still need to work on getting text back from the ciphered version, but from the raw numbers it works";
var message = "aaab"
console.log('Message -\t'+message+'\n');
console.log('Number  -\t'+stringToNumberString(message)+'\n\n');
console.log('Cipher  -\n'+cipher(stringToNumberString(message))+'\n\n');
console.log('Solved  -\n'+numberStringToString(stringToNumberString(message))+'\n\n');

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function stringToNumberString(text){
	text = text.toLowerCase();
	text = text.replace(/w/i, 'uu').replace(/q/i, 'ku');

	var returnString = '';
	for(var i = 0; i < text.length; i+=jump){
		var section = text.substring(i, i+jump);
		var number = 1;
		for(var j = 0; j < jump; j++){
			number *= primes[section.charAt(j)] || primes['.'];
		}
		returnString += pad(number, 2*jump, '0');
	}
	return returnString
}

function cipher(numberString){
	var returnString = '';
	for(var i = 0; i < numberString.length; i+=2){
		var curNum = parseInt(numberString.charAt(i) + numberString.charAt(i+1));
		returnString += (i/2)%jump?'':'\n';
		returnString += Object.keys(primes)[curNum % 25];
	}
	return returnString.substring(1);
}

function numberStringToString(numberString){
	var returnString = '';
	for(var i = 0; i < numberString.length; i+=2*jump){
		var currentString = numberString.substring(i, i+2*jump);
		var currentNumber = parseInt(currentString);
		returnString += jumpRegionToString(currentNumber)+'\n';
	}
	return returnString;
}

function jumpRegionToString(number){
	if(number === 1){
		return '';
	} else {
		for(var i = 0; i < 25; i++){
			var currentPrime = Object.values(primes)[i];
			if(Number.isInteger(number/currentPrime)){
				var currentLetter = Object.keys(primes)[primeNumbers.indexOf(currentPrime)];
				return currentLetter + jumpRegionToString(number/currentPrime);
			}
		}
		return 'ERROR';
	}
}