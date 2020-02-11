#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>
// Struct of a single Sample
struct sample {
	// An array of length n
		// Where n is the number of channels
	int *audioData;
	// Pointer to the next sample, because this is a linked list
	struct sample *next;
};
// Sample Heads are a place to store information
struct sampleHead {
	// Total number of samples
	int total;
	// Number of Channels
		// Channel 0 is Left
		// Channel 1 is Right
	int channels;
	// Sample Rate is number of samples played per second
	int sampleRate;
	// Bits Per Sample is how many bits there are per sample
		// Bits Per Sample / 8 = Bytes per Sample
	int bitsPerSample;
	// A pointer to the start and end of the linked list
	struct sample *firstSample;
	struct sample *lastSample;
};
// A struct that stores info about a file in one place
struct fileInfo {
	// Size of file
	size_t size;
	// and a pointer to the file
	unsigned char *file;
};
// Adds a sample to the end of the linked list that starts at headSample and data of audioData
void addSample(struct sampleHead *headSample, int *audioData, struct sample *before, struct sample *after){
	struct sample *tempSample = (struct sample *) malloc(sizeof(struct sample));
	tempSample->audioData = audioData;
	tempSample->next = NULL;
	// Place the first
	if(before == NULL && after == NULL){
		headSample->firstSample = tempSample;
		headSample->lastSample = tempSample;
	// Place at the start
	} else if(before == NULL){
		tempSample->next = headSample->firstSample;
		headSample->firstSample = tempSample;
	// Place at the end
	} else if(after == NULL) {
		before->next = tempSample;
		headSample->lastSample = tempSample;
	// Place
	} else {
		before->next = tempSample;
		tempSample->next = after;
	}
	headSample->total++;
}
// Removes a sample from headSample with the help of the sampleBefore and the sampleAfter
void removeSample(struct sampleHead *headSample, struct sample *sampleBefore, struct sample *sampleToBeRemoved){
	if(sampleToBeRemoved == headSample->firstSample){
		headSample->firstSample = sampleToBeRemoved->next;
		free(sampleToBeRemoved->audioData);
		free(sampleToBeRemoved);
		headSample->total--;
	} else {
		sampleBefore->next = sampleToBeRemoved->next;
		free(sampleToBeRemoved->audioData);
		free(sampleToBeRemoved);
		headSample->total--;
	}
}
// Clears a list without total
void removeList(struct sampleHead *headSample){
	struct sample *temp = headSample->firstSample;
	while((temp = headSample->firstSample) != NULL){
		headSample->firstSample = headSample->firstSample->next;
		free(temp->audioData);
		free(temp);
	}
	free(headSample);
}
// Creates a sampleHead and assigns the correct information
struct sampleHead *createSampleHead(int channels){
	struct sampleHead *returnHead = (struct sampleHead *) malloc(sizeof(struct sampleHead));
	returnHead->channels = channels;
	returnHead->total = 0;
	returnHead->firstSample = NULL;
	returnHead->lastSample = NULL;
	return returnHead;
}
// Uses printf to print a whole file
void printList(struct sampleHead *headSample){
	printf("Channels:\t\t%d\nBitsPerSample:\t\t%d\nSampeRate:\t\t%d\nTotalSamples:\t\t%d\n", headSample->channels, headSample->bitsPerSample, headSample->sampleRate, headSample->total);
	struct sample *tempSample = headSample->firstSample;
	for(int i = 0; i < headSample->total; i++){
		printf("%d\t\t", i);
		for(int j = 0; j < headSample->channels; j++){
			printf("%d\t", tempSample->audioData[j]);
		}
		printf("%p\n", tempSample->next);
		tempSample = tempSample->next;
	}
}
// Prints a sample to a file
void printSample(FILE *file, long int position, int sample, int sampleLength){
	// Set the file to the position stated
	fseek(file, position, SEEK_SET);
	// 
	for(int i = 0; i < sampleLength; i++){
		int remainder = sample % 16;
		int lastRemainder = (sample / 16) % 16;
		sample = sample/256;
		int numToPlace = (lastRemainder * 16) + remainder;
		if(numToPlace){
			fputc(numToPlace, file);
		} else {
			fputc(00, file);
		}
	}
}



FILE *createAudioFile(struct sampleHead *headSample, char *fileName){
	FILE *returnFile = fopen(fileName, "w");
	if(!returnFile){
		printf("ERROR with opening %s to write\n", fileName);
		fclose(returnFile);
		return NULL;
	}
	// Printing

// Opening info Chunk
	fputc('R', returnFile);fputc('I', returnFile);fputc('F', returnFile);fputc('F', returnFile);
	// Chunk Size
	printSample(returnFile, ftell(returnFile), headSample->total * (headSample->bitsPerSample/8) + 36, 4);
	fputc('W', returnFile);fputc('A', returnFile);fputc('V', returnFile);fputc('E', returnFile);
	
	
	



// fmt Chunk
	fputc('f', returnFile);fputc('m', returnFile);fputc('t', returnFile);fputc(32, returnFile);
	// Chunk Size
	printSample(returnFile, ftell(returnFile), 16, 4);
	// PCM
	printSample(returnFile, ftell(returnFile), 1, 2);
	// Channels
	printSample(returnFile, ftell(returnFile), headSample->channels, 2);
	// Sample Rate
	printSample(returnFile, ftell(returnFile), headSample->sampleRate, 4);
	// Byte Rate
	printSample(returnFile, ftell(returnFile), headSample->channels * (headSample->bitsPerSample/8) * headSample->sampleRate, 4);
	// Bytes per Sample Chunk
	printSample(returnFile, ftell(returnFile), headSample->channels * headSample->bitsPerSample/8, 2);
	// Bits per Sample
	printSample(returnFile, ftell(returnFile), headSample->bitsPerSample, 2);



// Data chunk
	fputc('d', returnFile);
	fputc('a', returnFile);
	fputc('t', returnFile);
	fputc('a', returnFile);
	// Data Size
	printSample(returnFile, ftell(returnFile), (headSample->bitsPerSample/8) * headSample->total * headSample->channels, 4);
// Data
	struct sample *tempSample = headSample->firstSample;
	for(int i = 0; i < headSample->total; i++){
		for(int j = 0; j < headSample->channels; j++){
			printSample(returnFile, ftell(returnFile), tempSample->audioData[j], headSample->bitsPerSample/8);
		}
		tempSample = tempSample->next;
	}
	return returnFile;
}

unsigned int getAddedBytes(unsigned int offset, int length, unsigned char *dataArray){
	unsigned int total = 0;
	for(int counter = 0; counter < length; counter++ ){
		total += dataArray[offset+counter]*pow(16,2*counter);
	}
	return total;
}
struct fileInfo *openFileWithMemMap(char *fileName){
	struct fileInfo *returnStruct = (struct fileInfo *) malloc(sizeof(struct fileInfo));

	int musicFile;
	struct stat sb;

	musicFile = open(fileName, O_RDONLY);
	if (musicFile == -1){
		printf("Error Opening %s\n", fileName);
		exit(0);
	}

	if (fstat(musicFile, &sb) == -1){
		printf("Error with Obtaining File Size\n");
		exit(0);
	}
	returnStruct->size = sb.st_size;

	returnStruct->file = mmap(NULL, returnStruct->size, PROT_READ, MAP_SHARED, musicFile, 0);
	if (returnStruct->file == MAP_FAILED){
		printf("Error with Memory Map\n");
		exit(0);
	}
	close((int)returnStruct->file);
	return returnStruct;
}

struct sampleHead *readFileIntoLinkedList(char *fileName){
	struct fileInfo *openedFile = openFileWithMemMap(fileName);
	struct sampleHead *returnHead = createSampleHead(getAddedBytes(22, 2, openedFile->file));
	returnHead->sampleRate = getAddedBytes(24, 4, openedFile->file);
	returnHead->bitsPerSample = getAddedBytes(34, 2, openedFile->file);
	int dataStart = 36;
	for(int i = 0; i < 10; i++){
		if(getAddedBytes(dataStart, 1, openedFile->file) == 'd' && getAddedBytes(dataStart+1, 1, openedFile->file) == 'a' && getAddedBytes(dataStart+2, 1, openedFile->file) == 't' && getAddedBytes(dataStart+3, 1, openedFile->file) == 'a'){
			break;
		} else {
			dataStart += getAddedBytes(dataStart+4, 4, openedFile->file) + 8;
		}
	}
	returnHead->total = getAddedBytes(dataStart+4, 4, openedFile->file) / ((returnHead->bitsPerSample / 8) * returnHead->channels);
	int total = returnHead->total;
	for(int i = 0; i < total; i++){
		int *audioData = (int *) malloc(sizeof(int) * returnHead->channels);
		for(int j = 0; j < returnHead->channels; j++){
			audioData[j] = getAddedBytes((i*((returnHead->bitsPerSample / 8) * returnHead->channels)) + (j*(returnHead->bitsPerSample / 8)) + dataStart + 8, (returnHead->bitsPerSample / 8), openedFile->file);
		}
		addSample(returnHead, audioData, returnHead->lastSample, NULL);
	}
	returnHead->total = total;
	munmap(openedFile->file, openedFile->size);
	free(openedFile);
	return returnHead;
}
int main(int argc, char **argv){
	int channels = 2;
	int sampleRate = 8000;
	double time = 3.0;
	int bitsPerSample = 16;
	int volume = 4000;
	int freq1 = 220;
	int freq2 = 880;

	printf("Reading File  %s\n", argv[1]);
	struct sampleHead *readAudio = readFileIntoLinkedList(argv[1]);
	printf("Read the File %s\n", argv[1]);
// This is where modifications to the file go

	readAudio->sampleRate /= 16 ;

	printf("Creating File %s\n", argv[2]);
	FILE *mesFile = createAudioFile(readAudio, argv[2]);
	printf("Made the File %s\n", argv[2]);
	printf("Closing File  %s\n", argv[2]);
	fclose(mesFile);
	printf("Closed File   %s\n", argv[2]);
	printf("Freeing Memory\n");
	removeList(readAudio);
	printf("Memory   Freed\n");
}

/*	Remove every other sample in a file	
	int total = readAudio->total;
	struct sample *ahead = readAudio->firstSample;
	struct sample *behind = NULL;
	for(int i = 0; i < total; i++){
		if(i%2){
			removeSample(readAudio, behind, ahead);
		}
		behind = ahead;
		ahead = ahead->next;
	}
*/

/* Keeps every 1/10 notes. REst are replaced with  0
	int total = readAudio->total;
	struct sample *ahead = readAudio->firstSample;
	struct sample *behind = NULL;
	for(int i = 0; i < total; i++){
		if(i%12 > 1){
			free(ahead->audioData);
			int *audioData = (int *) malloc(sizeof(int) * channels);
			for(int j = 0; j < readAudio->channels; j++){
				audioData[j] = 0;
			}
			ahead->audioData = audioData;
		}
		behind = ahead;
		ahead = ahead->next;
	}
	*/

	/* Creates 2 Sin waves, one on each channel
	struct sampleHead *testAudio = createSampleHead(channels);
	testAudio->sampleRate = sampleRate;
	testAudio->bitsPerSample = bitsPerSample;
	for(int i = 0; i < sampleRate * time; i++){
		int *audioData = (int *) malloc(sizeof(int) * channels);
		for(int j = 0; j < channels; j++){
			double second = (double) i / sampleRate;
			if(j == 0){
				audioData[j] = volume*(sin(freq1*second*M_PI*2));
			} else {
				audioData[j] = volume*(sin(freq2*second*M_PI*2));
			}
		}
		addSample(testAudio, audioData);
	}
	printList(testAudio);
	FILE *testFile = createAudioFile(testAudio, argv[1]);
	fclose(testFile);
	removeList(testAudio);
	printf("A\n");
	*/

	/* Create Left Right Audio Switch
		int total = readAudio->total;
	struct sample *ahead = readAudio->firstSample;
	struct sample *behind = NULL;
	int topDivisor = (readAudio->sampleRate*2)/10;
	int botDivisor = readAudio->sampleRate/10;
	for( int i = 0;i < total; i++){
		int *audioData = (int *) malloc(sizeof(int) *readAudio->channels);
		if((i % topDivisor)/botDivisor){
			audioData[0] = ahead->audioData[0];
			audioData[1] = 0;
			free(ahead->audioData);
			ahead->audioData = audioData;
		} else {
			audioData[1] = ahead->audioData[1];
			audioData[0] = 0;
			free(ahead->audioData);
			ahead->audioData = audioData;
		}
		behind = ahead;
		ahead = ahead->next;
	}
	*/
	/* Revrse Song
		struct sampleHead *testAudio = createSampleHead(readAudio->channels);
	struct sample *current = readAudio->firstSample;
	testAudio->sampleRate = readAudio->sampleRate;
	testAudio->bitsPerSample = readAudio->bitsPerSample;
	for(int i = 0; i < readAudio->total; i++){
		int *audioData = (int *) malloc(sizeof(int) * readAudio->channels);
		for(int j = 0; j < readAudio->channels; j++){
			audioData[j] = current->audioData[j];
		}
		if(current->next){
		current = current->next;
		}
		addSample(testAudio, audioData, NULL, testAudio->firstSample);
	}
	FILE *testFile = createAudioFile(testAudio, argv[3]);
	fclose(testFile);
	removeList(testAudio);
	printf("Song reverse and saved as %s\n", argv[3]);
	*/

	/* Volume Changer
		int total = readAudio->total;
	struct sample *ahead = readAudio->firstSample;
	struct sample *behind = NULL;
	int volumeScale = 8;
	for(int i = 0; i < total; i++){
		for(int j = 0; j < readAudio->channels; j++){
			if(ahead){
				if(ahead->audioData[j] > 32768){
					ahead->audioData[j] -= 65536;
				}
				ahead->audioData[j] /= volumeScale; 
			}
		}
		behind = ahead;
		ahead = ahead->next;
	}
	*/

	/* Change KBPS
	int total = readAudio->total;
	struct sample *ahead = readAudio->firstSample;
	struct sample *behind = NULL;
	for(int i = 0; i < total; i++){
		for(int j = 0; j < readAudio->channels; j++){
			if(ahead->audioData[j] > 32768){
				ahead->audioData[j] -= 65536;
			}
				ahead->audioData[j] *= 65536;
		}
		behind = ahead;
		ahead = ahead->next;
	}
	readAudio->bitsPerSample *= 2 ;
	*/