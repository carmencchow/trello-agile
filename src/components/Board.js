import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import Navbar from "./Navbar";
import List from "../components/List";
import Archived from './Archived'
// import io from "socket.io-client";
// import { store } from "../store";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/thunks/fetchList";
import { useSelector } from "react-redux";
import "./Board.css";

// const socket = io.connect("http://localhost:5000");

const Board = () => {
  const dispatch = useDispatch();
  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [setMessageReceived] = useState("");

  const { id } = useParams();

  // const sendMessage = () => {
  //   socket.emit("send_update", { message });
  //   setMessageReceived(message);
  //   setMessages([...messages, message]);
  //   setMessage("");
  // };

  // const sendMessage = () => {
  //   socket.emit('H')
  // }

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

  // This function will be passed through props to all functions using CRUD.
  const handleFetchData = () => {
    dispatch(fetchData({ id }));
  };

  const board = useSelector((state) => state.data.board);
  console.log(board, "state board board.js");

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board-container">
      <Navbar />
      <div></div>
      {/* <div>
        <input
          value={message}
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        ></input>
        <button onClick={sendMessage}>Send</button>
      </div> */}
      <h3>{board.title}</h3>
      
      <Archived
        id={id}
      />
      
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
                handleFetchData={handleFetchData}
              />
            ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
