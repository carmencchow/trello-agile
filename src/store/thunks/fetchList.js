import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchLists, fetchBoards } from './api'

export const getList = createAsyncThunk("list/getList", async () => {
  const response = await axios.get("http://localhost:5000/api/list/");
  console.log(response.data.lists, "initial fetch data.lists");
  return response.data.lists;
});

export const getBoards = createAsyncThunk("list/getList", async () => {
  const response = await axios.get("http://localhost:5000/api/board/");
  console.log(response.data, "initial fetch data boards");
  return response.data;
});

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    const [listData, boardData] = await Promise.all([
      fetchLists(),
      fetchBoards(),
    ]);
    return { listData, boardData };
  }
);