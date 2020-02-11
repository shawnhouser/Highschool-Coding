	// Counts the letters in a piece of text and returns a svg of the percentage for each letter
//
//  argv[1] is input argv[2] is output
//
// Standard
#include <stdio.h>
// Required for exiting
#include <stdlib.h>
// Required to use boolean Values
#include <stdbool.h>

// Wow it starts the thing I wouldn't have guessed
int main(int argc, char *argv[]) {
	// Determines how big you want the graph to be up and down
	const int SCALINGCONSTANT = 5000;
	// Determines how big you want the graph to be left and right
	const int STROKEWIDTH = 10;
	// Determines how big you want the letters to be in and out
	const int FONTSIZE = 10;
	// Importnant variables
		// currentLetter holds the currentLetter
		// total holds the total number of letters
		// bigestNum holds the bigestNumber
		// printedCheck holds the number of times that it has been through the svg creation loop
		// letterCount holds the count for each character
			// Keep this at 256, it doesn't like to be at 127
	int currentLetter, total, bigestNum, printedCheck, letterCount[256];
	// Open the file called "argv[1]" with read permissions and make a pointer called theFilesInnards_ptr point to it
	FILE *theFilesInnards_ptr = fopen(argv[1], "r");
	// If you can't open it, Don't
	if(theFilesInnards_ptr==NULL){
		printf("Can't Open File%s\n", argv[1]);
		exit(1);
	} else {
		// If you can say you opened it
		printf("Reading the File %s\n", argv[1]);
	}
	// while forever do this
	while(1) {
		currentLetter=fgetc(theFilesInnards_ptr);
		if(currentLetter == EOF) {
			break;
		}
		// Make the value in letterCount for the currentLetter increase by one
			// Doing it this simply is why I have to keep letterCount at 256
		letterCount[currentLetter]++;
	}
	// Close the file because we don't want it open forever
	fclose(theFilesInnards_ptr);
	// If you've made it this far say we've made it this far
	printf("Read the File %s\n\n", argv[1]);

	// For 0 to 127 ( because these are the numbers we care about do this )
	for(int counter=0; counter <= 127; counter++){
		// Make sure it's not these numbers because we hate these numbers and they make our graph look un pretty
		bool boolCheck = counter == 10 || counter == 33 || counter == 34 || counter == 39 || counter == 32 || (counter >=44 && counter <= 59) || counter == 63 || (counter >= 65 && counter <= 90) || (counter >= 97  && counter <= 122);
		// This is where it really check for those numbers
		if(boolCheck) {
			// Now we only count the total of the numbers we want. The others we don't care about
			total+=letterCount[counter];
		}
	}

	// Open the file to write to
	FILE *newTheFilesInnards = fopen(argv[2], "w");
	// Say that we've opened it
	printf("Making the file %s\n", argv[2]);
	// Print the standard opening line of a SVG file
	fprintf(newTheFilesInnards, "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">");
	// For 0 to 127 on only the numbers we want again
	for(int counter = 0; counter <=127; counter ++){
		bool boolCheck = counter == 10 || counter == 33 || counter == 34 || counter == 39 || counter == 32 || (counter >=44 && counter <= 59) || counter == 63 || (counter >= 65 && counter <= 90) || (counter >= 97  && counter <= 122);
		if(boolCheck) {
			// Printing the meat of the file which is a line with a height up to a max of SCALINGCONSTANT
			fprintf(newTheFilesInnards, "<line x1=\"%d\" y1=\"0\" x2=\"%d\" y2=\"%d\" stroke=\"black\" stroke-width=\"%d\" />\n", printedCheck*STROKEWIDTH, printedCheck*STROKEWIDTH, (SCALINGCONSTANT*letterCount[counter])/total, STROKEWIDTH);
			// and Print some text that shows what letter it is
			fprintf(newTheFilesInnards, "<text x=\"%d\" y=\"20\" style=\"font-family: Arial;font-size: %d;stroke: #ff00ff;fill: #ff00ff;\"> %c </text>", (printedCheck*STROKEWIDTH)-3, FONTSIZE, counter);
			// Add one to printedCheck so that everything lines up neatly
			printedCheck++;
		}
	}
	// Print the last bit of XML for the SVG
	fprintf(newTheFilesInnards, "</svg>");
	// Close the file
	fclose(newTheFilesInnards);
	// Say that we have closed the file
	printf("Made the file %s\n", argv[2]);
}