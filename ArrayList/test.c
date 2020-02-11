#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct ArrayList {
	size_t size;
	size_t capacity;
	void **array;
};

struct ArrayList* ArrayList_SizeInit(int size){
	struct ArrayList *returnStruct = (struct ArrayList*) malloc(sizeof(struct ArrayList));
	returnStruct->size = 0;
	returnStruct->capacity = size;
	returnStruct->array = (void**) malloc(size * sizeof(void*));
	return returnStruct;
}

struct ArrayList* ArrayList_init(){
	return ArrayList_SizeInit(10);
}

void ArrayList_destroy(struct ArrayList *list){
	free(list->array);
	free(list);
	return;
}

void ArrayList_SizeGrow(struct ArrayList *list, size_t amount){
	amount = list->capacity/2;
	list->capacity += amount;
	size_t newByteSize = list->capacity * sizeof(void*);
	list->array = (void**) realloc(list->array, newByteSize);
}

void ArrayList_grow(struct ArrayList *list){
	ArrayList_SizeGrow
	
	if(!amount) {
		amount = list->capacity/2;
	}
	list->capacity += amount;
	size_t newByteSize = list->capacity * sizeof(void*);
	list->array = (void**) realloc(list->array, newByteSize);
}

void ArrayList_add(struct ArrayList *list, void *itemToBeAdded){
	size_t oldSize = list->size++;
	size_t newSize = oldSize + 1;
	if(newSize >= list->capacity){
		ArrayList_grow(list, 0);	
	}
	list->array[oldSize] = itemToBeAdded;
}

void *ArrayList_get(struct ArrayList *list, size_t index){
	size_t size = list->size;
	if(index >= size){
		printf("INVALID\n");
		return NULL;
	}
	return list->array[index];
}

int main (int argc, char **argv){
	struct ArrayList *a = ArrayList_init();
	for(int i = 0; i < 35; i++){
		int *q = malloc(4);
		*q = i;
		
		ArrayList_add(a, q);
	}

	printf("%zu - %zu\n\n", a->size, a->capacity);

	for(int i = 0; i < a->size; i++){
		int val = * (int*) ArrayList_get(a, i);
		printf("%u | ", val);
	}
//printf("%p | ", a->array[i]);
	/*int q = 5;
	ArrayList_add(a, &q);
	printf("%u\n", * (int*) ArrayList_get(a, 0));

	for(int i = 0; i < a->capacity; i++){
		printf("%p | ", a->array[i]);
	}*/
	printf("\n");

	ArrayList_destroy(a);
	return 1;
}