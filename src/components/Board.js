import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import io from "socket.io-client";
import { TrelloList } from "./TrelloList";
import { store } from "../store";
import { Provider } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import ListModal from "../components/ListModal";
import AddCard from "../components/AddCard";
import "./Board.css";

const socket = io.connect("http://localhost:3001");

const Board = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageReceived, setMessageReceived] = useState("");

  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [openNewCard, setOpenNewCard] = useState(false);
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
    const getBoardData = async () => {
      const res = await axios.get(`http://localhost:5000/api/board/${id}`);
      // console.log(list);
      setBoard(res.data.board);
      console.log("Board info:", res.data);
      // console.log("List info:", res.data.board.lists[0].cards);
    };

    getBoardData();
  }, [id]);

  if (!board) {
    return <div>Loading...</div>;
  }

  const toggleModal = () => {
    setOpenModal(!openModal);
    console.log("open modal");
  };

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
        {board.lists &&
          board.lists.map((list) => {
            return (
              <div key={list._id} className="list">
                <span className="list-header">
                  <p className="list-name">{list.name}</p>

                  <span className="dots" onClick={() => toggleModal()}>
                    <BsThreeDots />
                  </span>
                </span>

                <ListModal
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                />

                {list.cards.map((card) => (
                  <div key={card._id} className="cards">
                    {card.title}
                  </div>
                ))}

                <div></div>

                <span className="add-card" onClick={() => setOpenNewCard(true)}>
                  {" "}
                  + Add a card
                  <AddCard open={openNewCard} />
                </span>
              </div>
            );
          })}
        <div>
          <h1>Activity:</h1>
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <ul>
                  <li>{message}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Board;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./Navbar";
// import io from "socket.io-client";
// import { TrelloList } from "./TrelloList";
// import { store } from "../store";
// import { Provider } from "react-redux";
// import { BsThreeDots } from "react-icons/bs";
// import ListModal from "../components/ListModal";
// import AddCard from "../components/AddCard";
// import { getBoardData } from "../store/thunks/api" // import the getBoardData function
// import "./Board.css";

// const socket = io.connect("http://localhost:3001");

// const Board = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [messageReceived, setMessageReceived] = useState("");

//   const { id } = useParams();
//   const [openModal, setOpenModal] = useState(false);
//   const [openNewCard, setOpenNewCard] = useState(false);
//   const [board, setBoard] = useState(null);

//   const sendMessage = () => {
//     socket.emit("send_update", { message });
//     setMessageReceived(message);
//     setMessages([...messages, message]);
//     setMessage("");
//   };

//   useEffect(() => {
//     socket.on("receive_update", (data) => {
//       setMessageReceived(data.message);
//     });
//   }, [socket]);

//   useEffect(() => {
//     const fetchBoard = async () => {
//       try {
//         const boardData = await getBoardData(id);
//         setBoard(boardData.board);
//         console.log("Board info:", boardData);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBoard();
//   }, [id]);

//   const toggleModal = (listName) => {
//     setOpenModal(!openModal);
//     // setListName(listName);
//     console.log("open modal");
//   };

//   if (!board) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="board-container">
//       <Navbar />
//       <div>
//         <input
//           value={message}
//           placeholder="Message..."
//           onChange={(event) => {
//             setMessage(event.target.value);
//           }}
//         ></input>
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <h3>{board.title}</h3>

//       <div className="container">
//         {board.lists &&
//           board.lists.map((list) => {
//             return (
//               <div key={list._id} className="list">
//                 <span className="list-header">
//                   <p className="list-name">{list.name}</p>

//                   <span className="dots" onClick={() => toggleModal()}>
//                     <BsThreeDots />
//                   </span>
//                 </span>

//                 <ListModal
//   open={openModal}
//   onClose={() => setOpenModal(false)}
//   // listName={listName}
// />

//                 {list.cards.map((card) => (
//                   <div key={card._id} className="cards">
//                     {card.title}
//                   </div>
//                 ))}

//                 <div></div>

//                 <span className="add-card" onClick={() => setOpenNewCard(true)}>
//                   {" "}
//                   + Add a card
//                   <AddCard open={openNewCard} />
//                 </span>
//               </div>
//             );
//           })}
//         <div>
//           <h1>Activity:</h1>
//           <ul>
//             {messages.map((message, index) => {
//               return (
//                 <li key={index}>{message}</li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </div>
//   )};

// export default Board;
