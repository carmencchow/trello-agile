import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import io from "socket.io-client";
import { store } from "../store";
import { Provider } from "react-redux";
import AddCard from '../components/AddCard'
import List from '../components/List'
import "./Board.css";

const socket = io.connect("http://localhost:3001");

const Board = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageReceived, setMessageReceived] = useState("");

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

  const sendMessage = () => {
    socket.emit("send_update", { message });
    setMessageReceived(message);
    setMessages([...messages, message]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_update", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
      <Navbar />
      <div>
        <input
          value={message}
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        ></input>
        <button onClick={sendMessage}>Send</button>
      </div>
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
  );
};

export default Board;
