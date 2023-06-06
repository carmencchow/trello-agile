import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../thunks/fetchList";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    board: {
      _id: "",
      title: "",
      user: [],
      lists: [],
    },
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // console.log(action.payload,'action payload');
      state.board = action.payload;
    });
  },
});
