/* Compile with this
gcc sieve.c -o sieve -lm
*/
/* The variable to change if you want more or less is rotCounter */

/*
Does the Sieve of Eratosthenes method for finding primes, kinda
https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
Date 3-4/12/15
*/
#include <stdlib.h>

#include <stdio.h>
/* Adds the Math */
#include <math.h>
/* The start to every file?
	Why doesn't it have a ';' */

int main(int argc, char *argv[]) {
/* I assume that this says its a function 
I don't have any idea what it actually means
I think i don't need what is inside the parentheses */


	/*Declares the counters used*/
	int inCounter,outCounter,finCounter;
	/* I could have used 1 counter correct? */
	int rotCounter = 10000;

	int *sieve = malloc( sizeof(int) * rotCounter );
	/* It was meant to be squareRotCounter, somewhere I messed up and just went with it. */
	int sqRT = sqrt( rotCounter );
	/* Because variable sqrt() you have to add -lm to the console to compile it */


 
 	/* Had a lot of trouble with this, ended up copying, dissecting, and making what I wanted */
	
	/* Fills up the Sieve array in a for loop */
	for ( inCounter = 0; inCounter < rotCounter; inCounter++ ) {
		/* Set sieve[IC] to something something */
		sieve[ inCounter ] = inCounter;
	}

	/* Marks the non primes with a value of 0 */
	/* ldl is how many loops through the whole array have been done. It should be the square root. Having it over will not affect anything. I hope */
	int loopDLoop = 2;
	while ( loopDLoop < sqRT ) {
		/* Output each array  value */
		for (outCounter = 1; outCounter < rotCounter; outCounter++ ) {
			/* if ldl != outCounter $$ outCounter % ldl is == 0 */
			if ( loopDLoop != outCounter && sieve[outCounter] % loopDLoop == 0 ) {
				/* The Holy place, sets the current outCounter in sieve to 0 */
				sieve[outCounter] = 0;
			}
		}
		/* Don't get stuck.exe */
		loopDLoop++;
	}

	/* The Outputter EP 2: The Returnening */
	/* Another counter, I don't know if I could get by with one */
	for ( finCounter = 0; finCounter < rotCounter; finCounter++ ) {
		/* If the value isn't 0 read off the counter. */
		if ( sieve[finCounter] != 0 ) {
			printf("%d\n", finCounter);
		}
	}

	return 0;
	free(sieve);
	/* Why is this needed? */
}

/* Doesn't have to call the function, is that because it is "int main()" */
