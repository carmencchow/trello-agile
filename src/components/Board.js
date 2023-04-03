import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/thunks/fetchList";
import axios from "axios";
import Navbar from "./Navbar";
import List from "../components/List";
import "./Board.css";

const Board = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showArchived, setShowArchived] = useState(false);

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
    .get(`/api/board/${id}/lists`, { lists })
      .then((res) => {
      })
      .catch((err) => console.log(err));
  };

  const showCards = (list) => {
    return list.cards.filter((card) => (showArchived ? card.isArchived : !card.isArchived))
  }

  const toggleCards = () => {
    setShowArchived(!showArchived)
  }

  useEffect(() => {
    dispatch(fetchData({ id }));
  }, [dispatch, id]);

  const handleFetchData = () => {
    dispatch(fetchData({ id }));
  };

  const board = useSelector((state) => state.data.board);
  console.log(board, "state board board.js");
  console.log(board.lists[0]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board-container">
      <Navbar />
      <h3>{board.title}</h3>
      
      <button className="toggle" onClick={toggleCards}>
        {showArchived ? "Showing Archived Cards:" : "Showing Unarchived Cards:"} 
      </button>
      
      <DragDropContext onDragEnd={(result) => onDragEnd(result, board.lists)}>
        <div className="container">
          {board.lists &&
            board.lists.map((list) => (
              <List
                key={list._id}
                name={list.name}
                cards={showCards(list, true)}
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
