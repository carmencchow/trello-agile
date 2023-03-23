import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import { TrelloList } from "./TrelloList";
import { store } from "../store";
import { Provider } from "react-redux";
import { BsThreeDots } from 'react-icons/bs'
import ListModal from '../components/ListModal'
import AddCard from '../components/AddCard'
import "./Board.css";

const Board = () => {
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

  useEffect(() => {
    const getBoard = async () => {
      const res = await axios.get(`http://localhost:5000/api/board/${id}`);
      // console.log(list);
      setBoard(res.data.board);
      console.log("Board info:", res.data);
      // console.log("List info:", res.data.board.lists[0].cards);
    };

    getBoard();
  }, [id]);

  if (!board) {
    return <div>Loading...</div>;
  }

  const toggleModal = () => {
    setOpenModal(!openModal)
    console.log('open modal')
  }

  return (
    <div className="board-container">
      <Navbar/>
      <h3>{board.title}</h3>

      <div className="container">
        {board.lists && board.lists.map((list) => {
          return (
          
            <div key={list._id} className="list">
              <span className="list-header">
                <p className="list-name">{list.name}</p>

                <span className="dots" onClick={() => toggleModal()}><BsThreeDots/></span>
              </span>

              <ListModal open={openModal} onClose={() => setOpenModal(false)}/>
    
              {list.cards.map((card) => (
                <div key={card._id} className="cards">
                  {card.title}
                </div>
              ))}

            <div>
            </div>
 
            <span className="add-card" onClick={() => setOpenNewCard(true)}> + Add a card
            <AddCard open={openNewCard}/>
            </span>
 
          </div>
          )
        })}
      </div>
    </div>
    )
  }

export default Board;