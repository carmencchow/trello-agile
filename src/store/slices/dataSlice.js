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
    cards: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      console.log(action, 'action in fetch data fulfilled');
      console.log(action.payload.listDataPayload, 'listData in fetch data fulfilled');
      console.log(action.payload.boardDataPayload, 'boardData in fetch data fulfilled');
      // console.log(action.payload.cardDataPayload, 'action.payload.cardDatapayload fulfilled');
      state.lists = action.payload.listDataPayload;
      state.boards = action.payload.boardDataPayload;
      // state.cards = action.payload.cardDataPayload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});