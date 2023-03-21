import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../thunks/fetchList";

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    lists: [],
    boards: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.lists = action.payload.lists;
        state.boards = action.payload.boards;
      })
  },
});