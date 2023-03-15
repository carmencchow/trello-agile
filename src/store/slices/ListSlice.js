import { createSlice } from "@reduxjs/toolkit";
import { getList } from "../thunks/fetchList";

const listSlice = createSlice({
  name: 'list',
  initialState: [
    {
      name: 'To Do',
      _id: 0,
      cards: [
        {
          _id: 0,
          title: 'Card 1'
        },
        {
          _id: 1,
          title: 'Card 2'
        }
      ]
    },
    {
      name: 'Doing',
      _id: 1,
      cards: []
    },
    {
      name: 'Done',
      _id: 2,
      cards: []
    }
  ],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getList.fulfilled, (state, action) => {
      console.log(action.payload, 'action payload');
      return action.payload;
    });
  }
});

export const listReducer = listSlice.reducer;