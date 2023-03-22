// import { createSlice } from "@reduxjs/toolkit";
// import { getBoards } from "../thunks/fetchList";

// const boardSlice = createSlice({
//   name: "boards",
//   initialState: [
//     { _id: '32878675',
//       title: "list 1",
//       lists: [
//         '1244hvuh',
//         '5353425gdhgfh',
//         'fwquyhuofr7'
//       ],
//     }
//   ],
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(getBoards.fulfilled, (state, action) => {
//       console.log(action.payload, "action payload of boards");
//       return action.payload
//     });
//   },
// });

// export const boardReducer = boardSlice.reducer;