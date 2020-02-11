#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <typeinfo>
#include "ArrayList.h"

template <class T>
ArrayList<T>::ArrayList(size_t iCapacity){
	this->_size = 0;
	this->_capacity = iCapacity;
	this->_array = (T*) malloc(iCapacity * sizeof(T));
};

template <class T>
size_t ArrayList<T>::size(){
	return this->_size;
}

template <class T>
size_t ArrayList<T>::capacity(){
	return this->_capacity;
}

template <class T>
void ArrayList<T>::grow(size_t amount){
	if(!amount){
		amount = this->_capacity/2;
	}
	this->_capacity += amount;
	size_t newByteSize = this->_capacity * sizeof(T);
	this->_array = (T*) realloc(this->_array, newByteSize);
}

template <class T>
void ArrayList<T>::set(T *item, size_t index){
	this->_array[index] = *item;
}

template <class T>
void ArrayList<T>::add(T *item){
	if(this->_size >= this->_capacity){
		this->grow();
	}
	ArrayList::set(item, this->_size);
	this->_size++;
}

template <class T>
T *ArrayList<T>::toArray(){
	return this->_array;
}





int main (int argc, char **argv){
	ArrayList<int> a;
	for(int i = 0; i < 11; i++){
		a.add(&i);
	}
	
	for(int i = 0; i < a.size(); i++){
		printf("%d | ", a.toArray()[i]);
	}

	printf("\n");
	return 1;
}