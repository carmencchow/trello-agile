import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import { TrelloList } from "./TrelloList";
import { store } from "../store";
import { Provider } from "react-redux";
import { BsThreeDots } from 'react-icons/bs'
import { GrTemplate } from 'react-icons/gr'
import ListModal from '../components/ListModal'
import AddCard from '../components/AddCard'
import "./Board.css";

const Board = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openNewCard, setOpenNewCard] = useState(false);

  const { id } = useParams();
  const [board, setBoard] = useState({
    board: { 
      _id: '', 
      title: '', 
      user: [], 
      lists: []},
    message: ''
  });

  // const [list, setLists] = useState([])

  const getBoard = async () => {
    const res = await axios.get(`http://localhost:5000/api/board/${id}`)
    setBoard(res.data.board)
    console.log('Board info:', res.data)
    console.log('List info:', res.data.board.lists)
    }

  useEffect (() => {
    getBoard();
  }, [])

  return (
    <div>
      <Navbar/>
      <h3>{board.board && board.board.title}</h3>

      <div className="container">
        {board.lists && board.lists.map((list, idx) => {
          return (
          
            <div key={list._id} className="list">
              <span className="list-header">
                <p className="list-name">{list.name}List Name</p>
                <span className="dots" onClick={() => setOpenModal(true)}><BsThreeDots/>
                <ListModal 
                  open={openModal} 
                  onClose={() => setOpenModal(false)}/>
                </span>
              </span>

              <div className="cards">trello_card:{list.cards} 1</div>
              <div className="cards">trello_card:{list.cards} 2</div>
              <div className="cards">trello_card:{list.cards} 3</div> 
              
              <div>
                <span className="add-card" onClick={() => setOpenNewCard(true)}>+ Add a card
                <AddCard open={openNewCard}/>
                </span>
              </div>
            </div>
            )
          })}
        </div>
      </div>
      )
    }

export default Board
