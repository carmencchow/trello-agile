import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../thunks/fetchList";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    lists: [
      {
        name: "List 1",
        cards: [
          {
            _id: 0,
            title: "Card 1",
          },
          {
            _id: 1,
            title: "Card 2",
          },
        ],
      },
      { name: "List 2", cards: [] },
      { name: "List 3", cards: [] },
    ],
    boards: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      if (action.payload.lists) {
        state.lists = action.payload.lists;
      }
      if (action.payload.boards) {
        state.boards = action.payload.boards;
      }
    });
  },
});