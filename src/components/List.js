import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import AddCard from '../components/AddCard'
import SaveCardBtn from './SaveCardBtn'
import CardPopup from './CardPopup'
import { GrEdit } from 'react-icons/gr'
import './List.css'

const List = ({ name, cards }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openNewCard, setOpenNewCard] = useState(false)

  const openCard = () => {
    console.log('opening card')
    setOpenModal(!openModal)
  }

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
      <div>
    </div>
    
    <div className="input-field">
    
      <AddCard 
        open={openNewCard}
        onClose={() => setOpenNewCard(false)}/>
      
        { !openNewCard ? 
          <button className="add-card" 
            onClick={() => { setOpenNewCard(true) }}>
              Add a card</button> : 
          <div className="card-btns">
              <SaveCardBtn/>  
          </div>
        }
      
      </div>
    </div>
    
    )
  }

export default List

