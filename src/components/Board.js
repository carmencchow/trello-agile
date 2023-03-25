import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import Navbar from "./Navbar";
import io from "socket.io-client";
// import { store } from "../store";
import { useDispatch } from "react-redux";
// import AddCard from "../components/AddCard";
import List from "../components/List";
import "./Board.css";
import { fetchData } from "../store/thunks/fetchList";
import { useSelector } from "react-redux";

const socket = io.connect("http://localhost:3001");

const Board = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [setMessageReceived] = useState("");

  const { id } = useParams();

  const sendMessage = () => {
    socket.emit("send_update", { message });
    setMessageReceived(message);
    setMessages([...messages, message]);
    setMessage("");
  };

  const onDragEnd = (result, lists) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destinationList = lists.find(
      (list) => list.id === destination.droppableId
    );
    const item = sourceList.items.splice(source.index, 1)[0];
    destinationList.items.splice(destination.index, 0, item);

    axios
      .put(`/api/board/${id}/lists`, { lists })
      .then((res) => {
        //dispatch here to update list
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   socket.on("receive_update", (data) => {
  //     setMessageReceived(data.message);
  //   });
  // }, [socket]);

  useEffect(() => {
    dispatch(fetchData({ id }));
  }, [dispatch, id]);

  const board = useSelector((state) => state.data.board);
  console.log(board, "state board board.js");

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

      <DragDropContext onDragEnd={(result) => onDragEnd(result, board.lists)}>
        <div className="container">
          {board.lists &&
            board.lists.map((list) => (
              <List
                key={list._id}
                name={list.name}
                cards={list.cards}
                id={list._id}
                listId={list._id}
              />
            ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
