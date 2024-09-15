// src/redux/booksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    // Other reducers like removeBook, updateBook can be added here
  },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;
