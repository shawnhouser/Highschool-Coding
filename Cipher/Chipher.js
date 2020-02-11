const cipher = require('./Encode.js');
const decipher = require('./Decode.js');

const message = "somename"
const ciphered = cipher.doCharacters(message);
const answer = decipher.doCharacters(ciphered);

console.log(ciphered);
console.log(answer);
//console.log(decipher.doCharacters('aady_e|gnxvgh|ablcr█|aghh(x|aa~rpe|ak n█:|adto/h|aaasyy|a_dd-x|azih█t|abce h|aar?io|a+bsnh|aadbuo|a~-ou(|ac=\'gr|an -iz|aad cx|aabuhd'))


