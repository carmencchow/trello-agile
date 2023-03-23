import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLists, fetchBoards, fetchCards } from './api'


export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { dispatch }) => {
    dispatch({ type: 'data/fetchData/pending' });
    try {
      const listData = await fetchLists();
      const boardData = await fetchBoards();
      // const cardData = await fetchCards();
      console.log(listData, 'listData fetch');
      console.log(boardData, 'boardData fetch');
      // console.log(cardData, 'cardData fetch');
      dispatch({ 
        type: 'data/fetchData/fulfilled', 
        payload: { listDataPayload: listData,
           boardDataPayload: boardData,
            // cardDataPayload: cardData 
        } 
      });
    } catch (error) {
      dispatch({ type: 'data/fetchData/rejected', error });
    }
  }
);