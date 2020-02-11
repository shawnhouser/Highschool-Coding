#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <typeinfo>
#include "ArrayList.h"
//using namespace std;

ArrayList::ArrayList(size_t iCapacity){
	this->_size = 0;
	this->_capacity = iCapacity;
	this->_array = (void**) malloc(iCapacity * sizeof(void*));
};

size_t ArrayList::size(){
	return this->_size;
}

size_t ArrayList::capacity(){
	return this->_capacity;
}

void ArrayList::grow(size_t amount){
	if(!amount){
		amount = this->_capacity/2;
	}
	this->_capacity += amount;
	size_t newByteSize = this->_capacity * sizeof(void*);
	this->_array = (void**) realloc(this->_array, newByteSize);
}

void ArrayList::set(void *item, size_t index){
	this->_array[index] = item;
}

void ArrayList::add(void *item){
	if(this->_size >= this->_capacity){
		this->grow();
	}
	ArrayList::set(item, this->_size);
	this->_size++;
}

void *ArrayList::get(size_t index){
	return this->_array[index];
}

void ArrayList::trim(){
	size_t newByteSize = this->_size * sizeof(void*);
	this->_array = (void**) realloc(this->_array, newByteSize);
	this->_capacity = this->_size;
}

void **ArrayList::toArray(){
	ArrayList::trim();
	return this->_array;
}

int main (int argc, char **argv){
	ArrayList a;
	for(int i = 0; i < 110; i++){
		int *q = (int*) malloc(4);
		*q = i;
		a.add(q);
	}
	a.toArray();
	printf("%s\n", typeid(a).name());
	printf("%lu - %lu\n", a.size(), a.capacity());
	for(int i = 0; i < a.size(); i++){	
		printf("%u | ", * (int*) a.get(i));
	}

	printf("\n");
	return 1;
}