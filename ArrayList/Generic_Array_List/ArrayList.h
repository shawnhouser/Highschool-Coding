class ArrayList {
	private:
		size_t _size;
		size_t _capacity;
		void **_array;
	public:
		ArrayList(size_t iCapacity = 10);
		size_t size();
		size_t capacity();
		void grow(size_t = 0);
		void set(void*, size_t);
		void add(void*);
		void *get(size_t);
		void trim();
		void **toArray();
};