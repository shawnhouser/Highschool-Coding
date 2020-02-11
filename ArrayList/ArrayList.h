template <class T>
class ArrayList {
	private:
		size_t _size;
		size_t _capacity;
		T *_array;
	public:
		ArrayList(size_t iCapacity = 10);
		size_t size();
		size_t capacity();
		void grow(size_t = 0);
		void set(T*, size_t);
		void add(T*);
		T *get(size_t);
		void trim();
		T *toArray();
};