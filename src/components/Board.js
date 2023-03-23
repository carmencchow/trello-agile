import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { BsThreeDots } from "react-icons/bs";
import ListModal from "../components/ListModal";
import AddCard from "../components/AddCard";
import "./Board.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Provider } from "react-redux";
import { store } from "../store";

const Board = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openNewCard, setOpenNewCard] = useState(false);
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

  useEffect(() => {
    const getBoard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.get(`http://localhost:5000/api/board/${id}`);
      setBoard(res.data.board);
    };
    getBoard();
  }, [id]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <h3>{board.board && board.board.title}</h3>

        <div className="container">
          {board.lists &&
            board.lists.map((list, idx) => {
              return (
                <div key={list._id} className="list">
                  <span className="list-header">
                    <p className="list-name">{list.name}List Name</p>
                    <span className="dots" onClick={() => setOpenModal(true)}>
                      <BsThreeDots />
                      <ListModal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                      />
                    </span>
                  </span>

                  <Droppable droppableId={list._id} key={list._id}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {list.cards.map((card, index) => (
                          <Draggable key={card._id} draggableId={card._id} index={index}>
                            {(provided) => (
                              <div
                                className="cards"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                {card.title}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <div>
                    <span
                      className="add-card"
                      onClick={() => setOpenNewCard(true)}
                    >
                      + Add a card
                      <AddCard open={openNewCard} />
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Provider>
  );
};

export default Board;
