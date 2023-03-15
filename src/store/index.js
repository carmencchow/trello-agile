import { configureStore } from '@reduxjs/toolkit';
import { listReducer } from './slices/ListSlice';

export const store = configureStore({
  reducer: {
    lists: listReducer
  },
});

