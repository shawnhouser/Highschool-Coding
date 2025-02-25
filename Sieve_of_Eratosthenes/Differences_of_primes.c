/* Compile with this
gcc diffPrimes.c -o difpr -lm
*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {

    int lines_allocated = 10000000;
    int max_line_len = 100;

    /* Allocate lines of text */
    char **words = (char **)malloc(sizeof(char*)*lines_allocated);
    if (words==NULL){
        fprintf(stderr,"Out of memory (1).\n");
        exit(1);
    }

    FILE *fp = fopen("first10kprimes.txt", "r");
    if (fp == NULL){
        fprintf(stderr,"Error opening file.\n");
        exit(2);
     }

    int i;
    for (i=0;1;i++) {
        int j;

        /* Have we gone over our line allocation? */
        if (i >= lines_allocated) {
            int new_size;

            /* Double our allocation and re-allocate */
            new_size = lines_allocated*2;
            words = (char **)realloc(words,sizeof(char*)*new_size);
            if (words==NULL) {
                fprintf(stderr,"Out of memory.\n");
                exit(3);
            }
            lines_allocated = new_size;
        }
        /* Allocate space for the next line */
        words[i] = malloc(max_line_len);
        if (words[i]==NULL){
            fprintf(stderr,"Out of memory (3).\n");
            exit(4);
        }
        if (fgets(words[i],max_line_len-1,fp)==NULL)
            break;

        /* Get rid of CR or LF at end of line */
        for (j=strlen(words[i])-1;j>=0 && (words[i][j]=='\n' || words[i][j]=='\r');j--)
            ;
        words[i][j+1]='\0';
    }
    /* Close file */
    fclose(fp);

    int j;
    for(j = 1; j < i; j++){
		int val = atoi(words[j])-atoi(words[j-1]); // atoi = Ascii TO Int
        printf("%d\n", val);
}
    /* Good practice to free memory */
    for (;i>=0;i--)
        free(words[i]);
    free(words);
    return 0;
    }