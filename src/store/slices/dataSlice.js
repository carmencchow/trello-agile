// import { createSlice } from "@reduxjs/toolkit";
// import { FetchData } from "../thunks/fetchList";

// export const dataSlice = createSlice({
//   name: 'data',
//   initialState: {
//     lists: [],
//     boards: [],
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(FetchData.fulfilled, (state, action) => {
//         state.lists = action.payload.lists;
//         state.boards = action.payload.boards;
//       })
//   },
// });

import { createSlice } from "@reduxjs/toolkit";
import { FetchList } from "../thunks/fetchList";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    boards: [],
    lists: {},
    cards: {},
  },
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    addList: (state, action) => {
      const { id, boardId } = action.payload;
      state.lists[id] = {
        id,
        boardId,
        cardIds: [],
      };
    },
    addCard: (state, action) => {
      const { id, listId } = action.payload;
      state.cards[id] = {
        id,
        listId,
        title: action.payload.title,
        description: action.payload.description,
      };
      state.lists[listId].cardIds.push(id);
    },
    moveCard: (state, action) => {
      const { cardId, sourceListId, destinationListId, destinationIndex } =
        action.payload;
      const sourceList = state.lists[sourceListId];
      const destinationList = state.lists[destinationListId];
      const sourceCardIndex = sourceList.cardIds.indexOf(cardId);

      // Remove card from source list
      sourceList.cardIds.splice(sourceCardIndex, 1);

      // Add card to destination list
      destinationList.cardIds.splice(destinationIndex, 0, cardId);

      // Update the card object
      state.cards[cardId].listId = destinationListId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchList.fulfilled, (state, action) => {
      state.boards = action.payload.boards;
      action.payload.lists.forEach((list) => {
        state.lists[list.id] = list;
        list.cardIds.forEach((cardId) => {
          state.cards[cardId] = action.payload.cards.find(
            (card) => card.id === cardId
          );
        });
      });
    });
  },
});

export const { addBoard, addList, addCard, moveCard } = dataSlice.actions;

export default dataSlice.reducer;