#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <math.h>
#include <string.h>
#include <stdbool.h>
unsigned int getAddedBytes(unsigned int offset, int length, unsigned char *dataArray){
	unsigned int total = 0;
	for(int counter = 0; counter < length; counter++ ){
		total += dataArray[offset+counter]*pow(16,2*counter);
	}
	return total;
}
char * getText(unsigned int offset, int length, unsigned char *dataArray){
	static char textOutput[16];
	for(int counter = 0; counter < 16; counter++){
		textOutput[counter]=0;
	}
	if(length > 16){
		printf("Length Requested is Greater than can be Accepted\n");
		exit(1);
	}
	for(int counter = 0; counter < length; counter++){
		textOutput[counter] = dataArray[offset + counter];
	}
	return textOutput;
}
///*

unsigned char * openFileWithMemMap(char *fileName){
	unsigned char *fileData;
	int musicFile;
	struct stat sb;
	size_t fileSize;

	musicFile = open(fileName, O_RDONLY);
	if (musicFile == -1){
		printf("Error Opening %s\n", fileName);
		exit(0);
	}

	if (fstat(musicFile, &sb) == -1){
		printf("Error with Obtaining File Size\n");
		exit(0);
	}
	fileSize = sb.st_size;

	fileData = mmap(NULL, fileSize, PROT_READ, MAP_SHARED, musicFile, 0);
	if (fileData == MAP_FAILED){
		printf("Error with Memory Map\n");
		exit(0);
	}
	return fileData;
}
int main(int argc, char *argv[]){
	unsigned char *data;
	data = openFileWithMemMap(argv[1]);

	printf("Format\t| %s", getText(0, 4, data));
	unsigned int fileSize = getAddedBytes(4, 4, data)+8;
	int fmtChunkSize = getAddedBytes(16, 4, data)+8;
	printf(" %s\nSize\t| %d Bytes\nfmtSize\t| %d Bytes\n", getText(8, 4, data), fileSize, fmtChunkSize ); 
	int compression = getAddedBytes(20, 2, data);
	if(compression != 1){
		printf("Cmpresn\t| Yes\n");
	} else {
		printf("Cmpresn\t| No\n");
	}
	int channels = getAddedBytes(22, 2, data);
	unsigned int sampleRate = getAddedBytes(24, 4, data);
	unsigned int byteRate = getAddedBytes(28, 4, data);
	int bytesPerSample = getAddedBytes(32, 2, data);
	int bytesPerChannelSample = bytesPerSample/channels;
	int bitsPerSample = getAddedBytes(34, 2, data);
	printf("Chanls\t| %d\nSmplR8\t| %d Samples / Second\nByt/Sam\t| %d Bytes\nByteR8\t| %d Bytes / Second\n", channels, sampleRate, bytesPerSample, byteRate);
	int foundData=0;
	unsigned int dataCounter=36;
	while(foundData != 1){
		if(strncmp(getText(dataCounter, 4, data), "data", 4) == 0){
			printf("D8AChnk\t| %d Bytes in\n", dataCounter);
			foundData=1;
			break;
		}
		dataCounter++;
	}
	unsigned int dataSize = getAddedBytes(dataCounter+4, 4, data);
	int time = dataSize/byteRate;
	printf("D8aSize\t| %d Bytes\nTime\t| %d Seconds\n", dataSize, time);
	int padding=1;
	int variance=10000;
	int amount=100;
	int counter=0;
	bool different;
	
	for(int freqCounter=dataCounter+8; freqCounter < fileSize; freqCounter+=bytesPerSample*channels){
		for(int counter=0; counter < channels; counter++){
		}
		if(freqCounter % (sampleRate/amount) == 0){
			int current = getAddedBytes(freqCounter, bytesPerChannelSample, data);
			int next = getAddedBytes(freqCounter+(sampleRate/amount)*bytesPerChannelSample, bytesPerChannelSample, data);
			if(current>variance && current < pow(16, 2*bytesPerChannelSample)-variance && next>variance && next < pow(16, 2*bytesPerChannelSample)-variance ){
				different = current+variance>=next && current-variance<=next;
				if(!different){
					printf("%d\t%d, %d\n", (freqCounter/channels)/amount, current, next);
				}
			}
		}
		//printf("%d\n", getAddedBytes(freqCounter, bytesPerChannelSample, data));
		/*for(int counter=0; counter < channels; counter++){
			printf("%d\t", getAddedBytes(freqCounter+counter*bytesPerChannelSample, bytesPerChannelSample, data));
		}
		//printf("%d\n", getAddedBytes(freqCounter, bytesPerChannelSample, data));
		printf("\n");
		//printf("%d\t%u\n", freqCounter, getAddedBytes(freqCounter, bytesPerChannelSample, data));
		*/
	}

}


//int main(int argc, char *argv[]){
//	char RIFFTAG[5];
	
	
//	char buffer[1000];
	
	
	
	// http://stackoverflow.com/questions/7975008/initializing-variables-in-c
		// This is a problem that has plagued me for a while
		// https://en.wikipedia.org/wiki/Spurious_wakeup
	
	
/*
//	int musicFile;
	FILE *musicFile = fopen(argv[1], "r");
	int numberMusicFile = &musicFile;
	int filesize;
	char *data;
	filesize=getpagesize();
	data = mmap(NULL, filesize, PROT_READ, MAP_SHARED, numberMusicFile, 0);
	printf("working\n%d\n", data);
*/







/*	// RIFF
		fgets(RIFFTAG, 5, musicFile);

	// Size of File-8
		int CHUNKSIZE[1];
		fread(CHUNKSIZE, 4, 1, musicFile);
	
	// WAVE
		char WAVETAG[5];
		fgets(WAVETAG, 5, musicFile);
	
	// fmt 
		fgets(buffer, 5, musicFile);

	// Subchunk1Size-8
		int fmtSize[1];
		fread(fmtSize, 4, 1, musicFile);


	printf("Format\t| %s %s\nSize\t| %d Bytes\nfmtSize\t| %d Bytes\n", RIFFTAG, WAVETAG, CHUNKSIZE[0]+8, fmtSize[0]+8);


	// Audio Format
		// Values > 1 have compression
		int format[1];
		fread(format, 2, 1, musicFile);
		if(format[0] != 1){
			printf("Cmpresn\t| Yes\n");
		} else {
			printf("Cmpresn\t| No\n");
		}
	
	// Number of Channels
		int channels[1];
		fread(channels, 2 , 1, musicFile);

	// Number of Samples per Second
		int sampleRate[1];
		fread(sampleRate, 4, 1, musicFile);

	// Number of Bytes per Second
		fgets(buffer, 5, musicFile);

	// Number of Bytes per Sample
		int bytesPerSample[1];
		fread(bytesPerSample, 2, 1, musicFile);

	// Bits per Sample
		fgets(buffer, 3, musicFile);

	// LIST
		fgets(buffer, 5, musicFile);

	// Extra parameter Size
		int extraParamSize[1];
		fread(extraParamSize, 2, 1, musicFile);

	// Skip over Extra Paramaters
		fgets(buffer, extraParamSize[0]+3, musicFile);

	// Makes sure that this is data
		fgets(buffer, 5, musicFile);
	
	// Reads the rest of the file size
		int fileSize[1];
		fread(fileSize, 4, 1, musicFile);
	printf("Chanls\t| %d\nSmplR8\t| %d Hz\nByt/Sam\t| %d\nXPram\t| %d Bytes\nRemSiz\t| %d Bytes\n", channels[0], sampleRate[0], bytesPerSample[0], extraParamSize[0], fileSize[0]);
	*/
	
//	fclose(musicFile);

//}

