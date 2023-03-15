import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: 'list',
  initialState: {
    title: 'to do',
    _id: 0,
    cards: [
      {
      id: 0,
      }
    ],
  },
})

export const listReducer = listSlice.reducer;