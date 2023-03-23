import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import ListModal from '../components/ListModal'
import AddCard from '../components/AddCard'
import SaveCardBtn from './SaveCardBtn'
import './List.css'

const List = ({ name, cards }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openNewCard, setOpenNewCard] = useState(false)

  const toggleModal = () => {
    setOpenModal(!openModal)
  }

  const handleSave = () => {
    console.log('saving card')
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
    
    <div className="input-field">
      <AddCard open={openNewCard}/>
    </div>

    <div className="card-btns">
      <button className="add-card" onClick={() => { setOpenNewCard(true) }}>Add a card</button>
      <SaveCardBtn/>    
    </div>
  
  </div>
    
    )
  }

export default List

