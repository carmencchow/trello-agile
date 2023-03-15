import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getList = createAsyncThunk(
  'list/getList',
  async () => {
    const response = await axios.get('http://localhost:5000/api/list/');
    console.log(response.data, 'initial fetch');
    return response.data;
  }
);