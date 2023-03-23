import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import ListModal from '../components/ListModal'
import AddCard from '../components/AddCard'

const List = ({ name, cards }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openNewCard, setOpenNewCard] = useState(false)

  const toggleModal = () => {
    setOpenModal(!openModal)
  }

  return (

    <div className="list">
      <span className="list-header">
      <p className="list-name">{name}</p>
      <span className="dots" onClick={() => toggleModal()}><BsThreeDots/></span>
      </span>

      <ListModal open={openModal} onClose={() => setOpenModal(false)}/>

      {cards.map((card) => (
        <div key={card._id} className="cards">
          {card.title}
        </div>
      ))}

      <div>
    </div>
    
    <AddCard open={openNewCard}/>
    
    <button 
      className="add-card" onClick={() => { setOpenNewCard(true) }}>Add a card
    </button>
    
    </div>
    
    )
  }

export default List

