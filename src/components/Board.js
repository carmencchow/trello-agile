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

  // const listName = await List.findOne({ list });
  // if (listName){
  //   res.status(400).send({ message: 'List already exists. Please use a different name.'});
  // } 




  const [list, setLists] = useState([])
  // const [list, setLists] = useState([
  //   board: '',
  //   cards: [{
  //     labels: [],
  //     members: [],
  //     owner: [],
  //     parentList: [],
  //     _id: '',
  //     title: '',
  //     name: '',
  //   }],
  // ])

// For drag and drop feature
  const [cards, setCards] = useState([])
  const dragItem = useRef()
  const dragOverItem = useRef()
 
 // ********* TEST CARDS (DRAG & DROP WORKS): **********

  const [item, setItem] = useState(['test_card 1', 'test_card 2', 'test_card 3', 'test_card 4', 'test_card 5', 'test_card 6', 'test_card 7', 'test_card 8', 'test_card 9'])
  
  const drop = (e) => {
    const copyItems = [...item];
    const dragItemContent = copyItems[dragItem.current];
    copyItems.splice(dragItem.current, 1);
    copyItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItem(copyItems);
  };

  const dragStart = (e, position) => {
    dragItem.current = position
    console.log('Dragging item: ', e.target.innerHTML);
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position
    console.log('Dragging over item: ', e.target.innerHTML)
  }

// ************************************************

// ********** TRELLO CARDS (DRAG NOT WORKING) ******:
  const dropTrelloCards = (e) => {
    const copyCards = [...cards];
    const dragCardContent = copyCards[dragItem.current];
    copyCards.splice(dragItem.current, 1);
    copyCards.splice(dragOverItem.current, 0, dragCardContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setCards(copyCards);
  };

  const getBoard = async () => {
    const res = await axios.get(`http://localhost:5000/api/board/${id}`)
    setBoard(res.data.board)
    console.log('Board info:', res.data)
    console.log('List info:', res.data.board.lists)
    // setLists(res.data.board.board)
    }

  useEffect (() => {
    getBoard();
  }, [])

  return (
    <div>
      <Navbar/>
      <h3>{board.board && board.board.title}</h3>


  {/* ********* TEST CARDS (DRAG & DROP WORKS): *********/}
      {/* <div className="test-container">
          {item && item.map((x, idx) => (
          <div className="test-draggable-container">
            <div className="test-draggable-item"
              onDragStart={(e) => dragStart(e, idx)}
              onDragEnter={(e) => dragEnter(e, idx)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={drop}
              key={idx}
              draggable>
              {x}
            </div>
          </div>
        ))}
      </div> */}

  {/* *****************************************************/}

  {/* ***************** TRELLO CARD ***********************/}
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

              <div 
                className="cards"
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={dropTrelloCards}
                // key={idx}
                draggable>
                  trello_card:{list.cards} 1
              </div>

              <div 
                className="cards"
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={dropTrelloCards}
                // key={idx}
                draggable>
                  trello_card:{list.cards} 2
              </div>

              <div 
                className="cards"
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={dropTrelloCards}
                // key={idx}
                draggable>
                  trello_card:{list.cards} 3
              </div> 
              
              <div>
                <span className="add-card" onClick={() => setOpenNewCard(true)}>+ Add a card
                <AddCard 
                  open={openNewCard} 
                  // onClose={() => openNewCard(false)}
                  />
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
