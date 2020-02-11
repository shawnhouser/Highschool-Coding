#!/bin/bash

#The Prompt
#Collatz Conjecture - Start with a number n > 1. Find the number of steps it takes to reach one using the following process: If n is even, divide it by 2. If n is odd, multiply it by 3 and add 1.

function collatz {
	#Before Intro
	echo "--------"
	#Intro
	echo "Put in your starting number for the Collatz Conjecture. It has to be a number > 1. If it is even it will be divided by 2. If it is odd, it will be multiplied by 3 and 1 will be added."
	#Get users number
	read startNumber

	#Stole this, Checks to see if it's a Number
	re='^[0-9]+$'
	if ! [[ $startNumber =~ $re ]] ; then
		echo "error: Not a number, or a number < 1" >&2; exit 1
	fi

	#Giant buffer from the start to the finish
	echo "--------"
	#Declaring some stuff
	stepCounter=0
	declare -i a
	currentNumber=$startNumber
	
	#The Engine, While current number != 1 do stuff
	while [ $currentNumber -gt 1 ]
		do
			#Checks to see if Even, Had a lot of trouble, also kinda stole it didn't realize I should make the modulo a variable.
			if [ $(( $currentNumber % 2 )) -eq 0 ] ; then
				#Fancy Text of currentNumber
				echo -e "$currentNumber"
				#Divides it by two
				((currentNumber=currentNumber/2))
			else
				#Fancy Text of currentNumber
				echo -e "$currentNumber"
				#Divides it by two
				((currentNumber=currentNumber*3+1))			
			fi
		#Adds to the Counter for how Lond
		((stepCounter=stepCounter+1))
	done
	#The Finial pull together with quit Fancy text and shows how many steps from where
	echo -e "Went from $startNumber to 1 in $stepCounter steps"
	#Finial Buffer
	echo "--------"
}
#Start That OMITTED
collatz
