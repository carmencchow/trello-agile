import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import { TrelloList } from "./TrelloList";
import { store } from "../store";
import { Provider } from "react-redux";
import AddCard from '../components/AddCard'
import List from '../components/List'
import "./Board.css";

const Board = () => {
  const { id } = useParams();
  const [board, setBoard] = useState({
    board: {
      _id: "",
      title: "",
      user: [],
      lists: [],
    },
    message: "",
  });

  useEffect(() => {
    const getBoard = async () => {
      const res = await axios.get(`http://localhost:5000/api/board/${id}`);
      // console.log(list);
      setBoard(res.data.board);
      console.log("Board info:", res.data);
      // console.log("List info:", res.data.board.lists[0].cards);
    };

    getBoard();
  }, [id]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (

    <div className="board-container">
      <Navbar/>
      <h3>{board.title}</h3>

      <div className="container">
        {board.lists && board.lists.map((list) => {
          return (

            <List
              key={list._id}
              name={list.name}
              cards={list.cards}
            />
          
          )
        })}
      </div>
    </div>
    )
  }

export default Board;
