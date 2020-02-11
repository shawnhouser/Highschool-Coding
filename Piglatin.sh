#!/bin/bash
#Duh the Function
function pigLatinWord {
	#Userinput
	read wordToPig
	#Echo (wordFrom1st)(fixToFirstLetr)ay
	echo ${wordToPig:1}${wordToPig:0:1}ay
}

pigLatinWord
