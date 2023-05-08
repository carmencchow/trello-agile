import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { RiInboxUnarchiveFill, RiArchiveFill } from "react-icons/ri";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { fetchData } from "../store/thunks/fetchList";
import { DataContext } from "../context/DataContext";
import Searchbar from "../components/Searchbar";
import List from "../components/List";
import Navbar from "./Navbar";
import "./Board.css";

const Board = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setBoardId } = useContext(DataContext);
  const [showArchived, setShowArchived] = useState(false);
  const [email, setEmail] = useState();
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

    const sourceListIndex = lists.findIndex(
      (list) => list._id === source.droppableId
    );
    const destinationListIndex = lists.findIndex(
      (list) => list._id === destination.droppableId
    );
    if (source.droppableId !== destination.droppableId) {
      // Make copies of the source and destination lists
      let sourceList = { ...lists[sourceListIndex] };
      let destinationList = { ...lists[destinationListIndex] };

      let removedItem;
      if (
        sourceList?.cards &&
        source.index >= 0 &&
        source.index < sourceList.cards.length
      ) {
        removedItem = sourceList.cards[source.index];
        sourceList.cards = [
          ...sourceList.cards.slice(0, source.index),
          ...sourceList.cards.slice(source.index + 1),
        ];
      }

      if (
        destinationList?.cards &&
        destination.index >= 0 &&
        destination.index <= destinationList.cards.length
      ) {
        destinationList.cards = [
          ...destinationList.cards.slice(0, destination.index),
          removedItem,
          ...destinationList.cards.slice(destination.index),
        ];
      }

      // Update the lists array
      const newLists = [...lists];
      newLists[sourceListIndex] = sourceList;
      newLists[destinationListIndex] = destinationList;

      setTBoard({ ...tBoard, lists: newLists });
      axios
        .put(`http://localhost:5000/api/board/${id}`, { lists: newLists })
        .then((res) => {})
        .catch((err) => console.log(err));
    } else {
      setTBoard({
        ...tBoard,
        lists: tBoard.lists.map((li, i) => {
          if (sourceListIndex === i) {
            return {
              ...li,
              cards: rearangeArr(
                tBoard.lists[i].cards,
                source.index,
                destination.index
              ),
            };
          } else {
            return li;
          }
        }),
      });
    }
  };

  const showCards = (list) => {
    if (!list) {
      return [];
    }
    return list.cards.filter((card) =>
      showArchived ? card.isArchived : !card.isArchived
    );
  };

  const toggleCards = () => {
    setShowArchived(!showArchived);
  };

  const handleStarredBoard = async () => {
    try {
      console.log(id, email);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.put(
        `http://localhost:5000/api/board/${id}/starred`,
        {
          email: `${email}`,
        }
      );
      console.log("add board to starred list", id, email);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (boardId) => {
    console.log("Deleting board:", id);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.delete(`http://localhost:5000/api/board/${id}`);
      setUserInfo(res.data);
      setEmail(res.data.email);
      console.log("Deleting board");
      navigate("/workspaces");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    dispatch(fetchData({ id }));
  }, [dispatch, id]);

  const board = useSelector((state) => state.data.board);
  console.log("Board data", board.user);

  useEffect(() => {
    if (board) {
      setTBoard(board);
    }
  }, [board]);

  useEffect(() => {
    if (id) {
      setBoardId(id);
    }
  }, []);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="board-container"
      style={{
        backgroundImage: `url(${"/assets/" + board.background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navbar />
      <div className="board-title">
        <p className="p-title">{board.title}</p>
        <span className="star">
          <StarBorderIcon />
          <span className="filled-star">
            <StarIcon onClick={handleStarredBoard} />
          </span>
        </span>

        <div className="archive-toggle">
          {board.user.map((user) => (
            <div key={user._id}>
              <p className="user">{user.username.charAt(0).toUpperCase()}</p>
            </div>
          ))}
          <Searchbar />
          <div className="archive-icons" onClick={toggleCards}>
            {showArchived ? <RiArchiveFill /> : <RiInboxUnarchiveFill />}
          </div>

          <AiOutlineDelete className="delete-board" onClick={handleDelete} />
        </div>
      </div>

      <DragDropContext onDragEnd={(result) => onDragEnd(result, tBoard.lists)}>
        <div className="list-container">
          {tBoard &&
            tBoard.lists &&
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
