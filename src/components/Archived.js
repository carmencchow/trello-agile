import React, { useEffect } from 'react'
import axios from 'axios'
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/thunks/fetchList";
import Navbar from "./Navbar";
import List from "../components/List";

const Archived = ({ id }) => {
    const dispatch = useDispatch();

    const onDragEnd = (result, lists) => {
      if (!result.destination) {
        return;
      }
    }  

  const getArchived = async () => {
    console.log('Fetching archived cards')
    const res = await axios.get(`http://localhost:5000/api/board/${id}/archived/`)
    console.log(res.data, res)
    return res.data;
  }

    useEffect(() => {
    dispatch(fetchData({ id }));
    }, [dispatch, id]);

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
      
      <button onClick={getArchived} className="archived">
        Show Archived Cards
      </button>

      {/* <DragDropContext onDragEnd={(result) => onDragEnd(result, board.lists)}>
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
      </DragDropContext> */}

    </div>
  )
}

export default Archived