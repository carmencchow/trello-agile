import { configureStore } from "@reduxjs/toolkit";
// import { listReducer } from "./slices/ListSlice";
// import { boardReducer } from "./slices/boardSlice";
import { dataSlice } from "./slices/dataSlice";
// import { fetchData } from "./thunks/fetchList";

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  },
});


// store.dispatch(fetchData());

export * from "./thunks/fetchList";
