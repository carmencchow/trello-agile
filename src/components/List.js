import React, { useState, useEffect } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import AddCard from '../components/AddCard'
import SaveCardBtn from './SaveCardBtn'
import CardPopup from './CardPopup'
import { GrEdit } from 'react-icons/gr'
import './List.css'
import { GrClose } from 'react-icons/gr'
import "./AddCard.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const List = ({ name, cards, close, onClose }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openNewCard, setOpenNewCard] = useState(false)
  const [input, setInput] = useState('');
  const { id } = useParams();

  const [list, setList] = useState('');

  // if (!open) return null;

  const openCard = () => {
    console.log('opening card')
    setOpenModal(!openModal)
  }

  const handleInput = (e) => {
    setInput(e.target.value)
  }  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const getList = async () => {
      const res = await axios.get(`http://localhost:5000/api/list/${id}`);
      // console.log(list);
      setList(res.data.board);
      console.log("Board info:", res.data);
      // console.log("List info:", res.data.board.lists[0].cards);
    };

    getList();
  }, [id]);

  return (
    <div className="list">
      <div className="list-header">
        <p className="list-name">{name}</p>
        <span className="dots"><BsThreeDots/></span>
      </div>

      {cards.map((card) => (
        <div key={card._id} 
          className="cards"
          onClick={() => openCard()}>
          {card.title}
          <span className="icon">{<GrEdit/>}</span>
        </div>
      ))}

      <CardPopup 
        open={openModal}
        onClose={() => setOpenModal(false)}
        name={name}
        cards={cards}
      />

      {/* <div></div> */}
      {/* <div className="input-field">
    
      <AddCard 
        open={openNewCard}
        onClose={() => setOpenNewCard(false)}/> */}
      
        { openNewCard ? (
          <div className="input-container">
            {/* <div className="new-card"> */}
            <div onClick={onClose} className="new-card">
              <input type="text" 
                className="card" 
                value={input}
                placeholder="Enter a title for this card..."
                onChange={handleInput}/>

                <div className="card-btns">
                  <SaveCardBtn/>  
                  <button className="cancel" onClick={onClose}><GrClose/></button>
                </div>

                {/* <button className="add-card" 
                  onClick={() => { setOpenNewCard(true) }}>
                    Add a card</button> : 
                <div className="card-btns">
                    <SaveCardBtn/>  
                </div> */}
        
              </div>
            </div> 
    
            ) : (

            <div className="input-field">
              <button className="add-card" 
                onClick={() => { setOpenNewCard(true) }}>
                  Add a card
              </button>
            </div>
          )}
        </div>
      )
    }

  export default List

