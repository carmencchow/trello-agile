import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from 'react-icons/ai';
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchData } from "../store/thunks/fetchList";
import DataContext from '../context/DataContext'
import Navbar from "./Navbar";
import List from "../components/List";
import "./Board.css";

const Board = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setBoardId } = useContext(DataContext);
  const [showArchived, setShowArchived] = useState(false);
  const [tBoard, setTBoard] = useState(null);
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();

  const rearangeArr = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);
    return arrCopy;
  };

  const onDragEnd = (result, lists) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // Find the source and destination lists
    const sourceListIndex = lists.findIndex(list => list._id === source.droppableId);
    const destinationListIndex = lists.findIndex(list => list._id === destination.droppableId);
    if (source.droppableId !== destination.droppableId) {


      // Make copies of the source and destination lists
      let sourceList = { ...lists[sourceListIndex] };
      let destinationList = { ...lists[destinationListIndex] };

      let removedItem;
      if (sourceList?.cards && source.index >= 0 && source.index < sourceList.cards.length) {
        removedItem = sourceList.cards[source.index];
        sourceList.cards = [...sourceList.cards.slice(0, source.index), ...sourceList.cards.slice(source.index + 1),];
      }

      if (destinationList?.cards && destination.index >= 0 && destination.index <= destinationList.cards.length) {
        destinationList.cards = [...destinationList.cards.slice(0, destination.index), removedItem, ...destinationList.cards.slice(destination.index),];
      }

      // Update the lists array with the modified lists
      const newLists = [...lists];
      newLists[sourceListIndex] = sourceList;
      newLists[destinationListIndex] = destinationList;

      setTBoard({ ...tBoard, lists: newLists })
      axios
        .put(`http://localhost:5000/api/board/${id}`, { lists: newLists })
        .then((res) => {
        })
        .catch((err) => console.log(err));
    } else {
      setTBoard({
        ...tBoard, lists: tBoard.lists.map((li, i) => {
          if (sourceListIndex === i) {
            return { ...li, cards: rearangeArr(tBoard.lists[i].cards, source.index, destination.index) }
          } else {
            return li
          }
        })
      });
    }
  };
  
  const showCards = (list) => {
    if (!list) {
      return [];
    }
    return list.cards.filter((card) => (showArchived ? card.isArchived : !card.isArchived))
  }

  const toggleCards = () => {
    setShowArchived(!showArchived)
  }

  // Delete the board
  const handleDelete = async (boardId) => {
    console.log('Deleting board:', id);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.delete(`http://localhost:5000/api/board/${id}`);
      setUserInfo(res.data);
      console.log('Deleting board')
      navigate("/workspaces");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    dispatch(fetchData({ id }));
  }, [dispatch, id]);

  const board = useSelector((state) => state.data.board);
  
  useEffect(() => {
    if (board) {
      setTBoard(board)
    }
  }, [board])

  useEffect(() => {
    if (id){
      setBoardId(id)
    }
  }, [])


  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board-container">
      <Navbar />
      <h3>{board.title}</h3>
      
      <div className="buttons">
        <button className="toggle" onClick={toggleCards}>
          {showArchived ? "Showing Archived Cards:" : "Showing Unarchived Cards:"} 
        </button>
        <p className="delete-icon" onClick={handleDelete}><AiOutlineDelete/><span>Delete board</span></p>
      </div>

      <DragDropContext onDragEnd={(result) => onDragEnd(result, tBoard.lists)}>
        <div className="container">
          {tBoard && tBoard.lists &&
            tBoard.lists.map((list) => (
              <List
                key={list._id}
                cards={showCards(list)}
                id={list._id}
                listId={list._id}
                listname={list.name}
              />
            ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
