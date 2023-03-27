// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { DragDropContext } from "react-beautiful-dnd";
// import axios from "axios";
// import Navbar from "./Navbar";
// import List from "../components/List";
// // import io from "socket.io-client";
// // import { store } from "../store";
// import { useDispatch } from "react-redux";
// import "./Board.css";
// import { fetchData } from "../store/thunks/fetchList";
// import { useSelector } from "react-redux";

// // const socket = io.connect("http://localhost:3001");

// const Board = () => {
//   const dispatch = useDispatch();
//   const [lists, setLists] = useState([]);
//   // const [message, setMessage] = useState("");
//   // const [messages, setMessages] = useState([]);
//   // const [setMessageReceived] = useState("");

//   const { id } = useParams();

//   // const sendMessage = () => {
//   //   socket.emit("send_update", { message });
//   //   setMessageReceived(message);
//   //   setMessages([...messages, message]);
//   //   setMessage("");
//   // };

//   const onDragEnd = (result, lists) => {
//     if (!result.destination) {
//       return;
//     }
  
//     const { source, destination } = result;
//     console.log('source', source);
//     console.log('destination', destination);
//     console.log('lists', lists);
  
//     const sourceList = lists.find((list) => list.id === source.droppableId);
//     console.log('sourceList', sourceList);
  
//     const destinationList = lists.find(
//       (list) => list.id === destination.droppableId
//     );
//     console.log('destinationList', destinationList);
  
//     const item = sourceList.items.splice(source.index, 1)[0];
//     destinationList.items.splice(destination.index, 0, item);
  
//     axios
//       .put(`/api/board/${id}/lists/${sourceList.id}/cards`, {
//         sourceListId: sourceList.id,
//         destinationListId: destinationList.id,
//         cardId: item.id,
//         sourceIndex: source.index,
//         destinationIndex: destination.index,
//       })
//       .then((res) => {
//         // dispatch an action to update the card order within the list
//         dispatch(fetchData({ id }));
//       })
//       .catch((err) => console.log(err));
//   };

//   // useEffect(() => {
//   //   socket.on("receive_update", (data) => {
//   //     setMessageReceived(data.message);
//   //   });
//   // }, [socket]);

//   useEffect(() => {
//     dispatch(fetchData({ id }));
//   }, [dispatch, id]);

//   // This function will be passed through props to all functions using CRUD.
//   const handleFetchData = () => {
//     dispatch(fetchData({ id }));
//   };

//   const board = useSelector((state) => state.data.board);
//   console.log(board, "state board board.js");

//   if (!board) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="board-container">
//       <Navbar />
//       <div></div>
//       {/* <div>
//         <input
//           value={message}
//           placeholder="Message..."
//           onChange={(event) => {
//             setMessage(event.target.value);
//           }}
//         ></input>
//         <button onClick={sendMessage}>Send</button>
//       </div> */}
//       <h3>{board.title}</h3>

//       <DragDropContext onDragEnd={(result) => onDragEnd(result, board.lists)}>
//         <div className="container">
//           {board.lists &&
//             board.lists.map((list) => (
//               <List
//                 key={list._id}
//                 name={list.name}
//                 cards={list.cards}
//                 id={list._id}
//                 listId={list._id}
//                 handleFetchData={handleFetchData}
//               />
//             ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default Board;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import Navbar from "./Navbar";
import List from "../components/List";
import { useDispatch } from "react-redux";
import "./Board.css";
import { fetchData } from "../store/thunks/fetchList";
import { useSelector } from "react-redux";

const Board = () => {
  const dispatch = useDispatch();
  const [lists, setLists] = useState([]);
  const { id } = useParams();

  const onDragEnd = async (result, board) => {
    const { source, destination, draggableId } = result;
  
    if (!destination) {
      return;
    }
    console.log( source, destination, 'source desti')
  
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
  //  const lists =  board.lists 
  
    // const destinationList = destination === destination.droppableId;
  
    // if (!destinationList) {
    //   console.log(board.lists,"onDragEnd - destination list not found");
    //   return;
    // }
  
    const card = board.lists.cards.find((card) => card.id === draggableId);
  
    const updatedSourceCards = Array.from(board.lists.cards);
    updatedSourceCards.splice(source.index, 1);
  
    // const updatedDestinationCards = Array.from(destinationList.cards);
    // updatedDestinationCards.splice(destination.index, 0, card);
  
    // setLists((prevLists) => {
    //   const updatedLists = prevLists.map((list) => {
    //     if (list.id === source.droppableId) {
    //       return { ...list, cards: updatedSourceCards };
    //     } else if (list.id === destination.droppableId) {
    //       // return { ...list, cards: updatedDestinationCards };
    //     } else {
    //       return list;
    //     }
    //   });
    //   return updatedLists;
    // });
  
    const updatedCard = { ...card, list_id: destination.droppableId };
    await axios.put(`http://localhost:5000/api/card/${updatedCard.id}`, updatedCard);
  };

  useEffect(() => {
    dispatch(fetchData({ id }));
  }, [dispatch, id]);

  const handleFetchData = () => {
    dispatch(fetchData({ id }));
  };

  const board = useSelector((state) => state.data.board);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board-container">
      <Navbar />
      <h3>{board.title}</h3>

      <DragDropContext onDragEnd={(result) => onDragEnd(result, board)}>
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
