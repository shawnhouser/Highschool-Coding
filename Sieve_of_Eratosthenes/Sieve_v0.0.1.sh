#!/bin/bash

#Warning This takes a long time and is poorly optimized, do not use
#Note I used it anyways

#Does the Sieve of Eratosthenes method for finding primes, kinda
#https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
#Date 27-28/11/15

#Exactly what you think, gets the show rolling and makes the text document for the numbers to be taken out of.
#If I knew what I was talking about id say this will kill your hard drive. Pretty sure it doesn't keep a lot of things in RAM.
function makeSieveNumbers {
	#Start number
	a=1
	while [ $a -lt 10000 ]
		do
			#Puts the Numbers into a text document.
			echo $a >> sieve.txt
			((a=a+1))
	done
}

#Marks the numbers for deletion, could be a bonus, but will show how many times they are refferenced from numbers before.
function deleteSieveNumbers {
	#Couldnt reuse $a I think, wanted to be sure. Another start number for how many PASSES it has gone through.
	b=1
	while [ $b -lt 100 ] ; do
			((b=b+1))

			#Where things get tricky
			#self explanitory, for current line in sieve.txt do stuff
			for currentLine in $(cat sieve.txt) ; do
					#If currentLine % PassNumber = 0 & currentLine != PassNumber then do stuff
					if [ $(( $currentLine % $b )) -eq 0 ] && [ ! $currentLine -eq $b ] ; then
						#Reasure it's not dead
						echo $currentLine is being processed
						#Add an r to current line at the end
						sed -i "${currentLine}s/$/ r/" sieve.txt
					fi
			done
	done
}
#Remove old file so it doesn't get added onto the end, could proboably have it moved instead
rm sieve.txt
echo "sieve.txt removed"
#Make the File
makeSieveNumbers
echo "sieve.txt made"
#Mark the Numbers for deletion
deleteSieveNumbers
echo "sieve.txt modified"
#sed '/r/d' sieve.txt >> someprimes.txt
#Above will actually delete the marked lines and put them into a new file

#Didn't test this, moves the file into final position so will not be lost when run twice.
mv sieve.txt sievefinal.txt
