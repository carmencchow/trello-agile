// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { fetchLists, fetchBoards } from './api'

// export const getList = createAsyncThunk("list/getList", async () => {
//   const response = await axios.get("http://localhost:5000/api/list/");
//   console.log(response.data.lists, "initial fetch data.lists");
//   return response.data.lists;
// });

// export const getBoards = createAsyncThunk("list/getList", async () => {
//   const response = await axios.get("http://localhost:5000/api/board/");
//   console.log(response.data, "initial fetch data boards");
//   return response.data;
// });

// export const fetchData = createAsyncThunk(
//   'data/fetchData',
//   async () => {
//     const [listData, boardData] = await Promise.all([
//       fetchLists(),
//       fetchBoards(),
//     ]);
//     return { listData, boardData };
//   }
// );

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoardData } from "./api";

export const FetchList = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBoardData(id);
        setBoard(data);
        console.log("Board info:", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (!board) {
    return <div>Loading...</div>;
  }

  // Render the board using the data received from the API
  return (
    <div>
      <h1>{board.name}</h1>
      <p>{board.description}</p>
      {board.lists.map((list) => (
        <div key={list._id}>
          <h2>{list.name}</h2>
          <ul>
            {list.cards.map((card) => (
              <li key={card._id}>{card.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};