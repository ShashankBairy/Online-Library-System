// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';

export const appStore = configureStore({
  reducer: {
    books: booksReducer,
  },
});
