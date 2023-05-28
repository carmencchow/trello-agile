import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { RiInboxUnarchiveFill, RiArchiveFill } from "react-icons/ri";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../utils";
import StarBorderIcon from "@mui/icons-material/StarBorder";
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
  const [currentBoard, setCurrentBoard] = useState(null);
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();

  const board = useSelector((state) => state.data.board);

  useEffect(() => {
    if (board) {
      setCurrentBoard(board);
    }
  }, [board]);

  // Rearrange array of cards by moving a card from the source index to destination index
  const rearrangeCards = (cardsArray, sourceIndex, destIndex) => {
    // create copy of original cards array
    const arrCopy = [...cardsArray];
    // Only remove one item from array starting at the sourceIndex
    const removed = arrCopy.splice(sourceIndex, 1)[0];
    // const [removed] = arrCopy.splice(sourceIndex, 1);

    // Add 'removed' card at the destination index
    arrCopy.splice(destIndex, 0, removed);
    return arrCopy;
  };

  // onDragEnd function for the drag and drop action
  // result object (source, droppableId, index, destination)
  const onDragEnd = (result, lists) => {
    // Check for valid destination for dropped item
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // Find indexes of source and destination lists
    const sourceListIndex = lists.findIndex(
      (list) => list._id === source.droppableId
    );
    const destinationListIndex = lists.findIndex(
      (list) => list._id === destination.droppableId
    );

    // Update list if source and destination lists are different
    if (source.droppableId !== destination.droppableId) {
      let sourceList = { ...lists[sourceListIndex] };
      let destinationList = { ...lists[destinationListIndex] };

      let removedItem;

      // If source list has a 'cards' property and valid source index ...
      if (
        sourceList?.cards &&
        source.index >= 0 &&
        source.index < sourceList.cards.length
      ) {
        // ... remove item at the source index
        removedItem = sourceList.cards[source.index];
        sourceList.cards = [
          ...sourceList.cards.slice(0, source.index),
          ...sourceList.cards.slice(source.index + 1),
        ];
      }

      // If destination list has a 'cards' property and valid destination index ...
      if (
        destinationList?.cards &&
        destination.index >= 0 &&
        destination.index <= destinationList.cards.length
      ) {
        // ... insert item at the source index
        destinationList.cards = [
          ...destinationList.cards.slice(0, destination.index),
          removedItem,
          ...destinationList.cards.slice(destination.index),
        ];
      }

      // Update the lists array by creating a new array. Replace old lists with updated lists
      const newLists = [...lists];
      newLists[sourceListIndex] = sourceList;
      newLists[destinationListIndex] = destinationList;

      // Update backend server
      setCurrentBoard({ ...currentBoard, lists: newLists });
      axios
        .put(`${server}/api/board/${id}`, {
          lists: newLists,
        })
        .then((res) => {})
        .catch((err) => console.log(err));

      // If source and destination droppableId are the same
    } else {
      setCurrentBoard({
        ...currentBoard,
        lists: currentBoard.lists.map((list, i) => {
          // if current index matches sourceListIndex:
          if (sourceListIndex === i) {
            return {
              ...list,
              cards: rearrangeCards(
                currentBoard.lists[i].cards,
                source.index,
                destination.index
              ),
            };
          } else {
            return list;
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
      // const res = await axios.put(`${server}/api/board/${id}/starred`, {
      const res = await axios.put(
        `https://trello-agile-project.onrender.com/api/board/${id}/starred`,
        {
          email: `${email}`,
          background: `${board.background}`,
        }
      );
      navigate("/starred");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (boardId) => {
    console.log("Deleting board:", boardId);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.delete(`${server}/api/board/${id}`);
      setUserInfo(res.data);
      setEmail(res.data.email);
      navigate("/workspaces");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    dispatch(fetchData({ id }));
  }, [dispatch, id]);

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
        <div className="left-side">
          <p className="p-title">{board.title}</p>
          <StarBorderIcon className="star" onClick={handleStarredBoard} />
        </div>

        <div className="archive-toggle">
          {board.user.map((user) => (
            <div className="user" key={user._id}>
              <p>{user.username.charAt(0).toUpperCase()}</p>
            </div>
          ))}
          <Searchbar className="search-bar" />

          <div className="archive-icons" onClick={toggleCards}>
            {showArchived ? <RiArchiveFill /> : <RiInboxUnarchiveFill />}
          </div>

          <AiOutlineDelete className="delete-board" onClick={handleDelete} />
        </div>
      </div>

      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, currentBoard.lists)}
      >
        <div className="list-container">
          {currentBoard &&
            currentBoard.lists &&
            currentBoard.lists.map((list) => (
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
