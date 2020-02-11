#!/bin/bash
#Simplifies a number that is under a radical to its smallest form

#The Idea
#	y=$numberUnderRadica/x^2
#	Then to table

#make a new function
function simplify {
	#Opening Text
	echo What is the number that you wish to simplify
	echo "--------"
	#Assign $rootNumber to the number under the radical
	read rootNumber
	echo "--------"

	#Checks to make sure it is a number. This won't work with Letters
	re='^[0-9]+$'
	if ! [[ $rootNumber =~ $re ]] ; then
		echo "error: Not a number, or a number < 1" >&2; exit 1
	fi

	#Assigns $xCount, counting for the value of X on a graph
	xCount=1

	#While X is less than Number under Radical
	while [ $xCount -lt $((rootNumber)) ] ; do
		#Assign number to be under denominator. Had trouble assigning it in one go.
		denom=0
		((denom=xCount**2))

		#Bash uses integers by default. Pipes This \/ into bc to get the number in decimal (floating point?) to be exact.
		radicalInFloat=$(echo "scale=20;(($rootNumber/$denom))" | bc)
		
		#Needed a floor function of the above, cheaper to just do math again in integers because it automaticly floors is.
		radicalOutFloat=$(((rootNumber/denom)))

		#Adds a . and 20 0's to the floored because I couldn't remove the 0's. Instead of removing enough, I added more to match.
		#ROFS = Radical Out Float String
		ROFS="$radicalOutFloat"".00000000000000000000"
		#If the ROFS and RIF are equal, eg 4.00* and 4.00*  NOT  4.00* and 4.001
		if [ $ROFS == $radicalInFloat ] ; then
			#echo the simplified version such as 4*sqrt(6)
			echo $xCount"*sqrt("$radicalOutFloat")"
		fi

		#Exit if less than one so it doesn't take ages 
		if [ $radicalOutFloat -lt 1 ] ; then
			exit
		fi
		#And so we don't get stuck
		((xCount=xCount+1))
	done
}
simplify
