import React, { useState, useEffect } from 'react'
import { GrFormClose } from 'react-icons/gr'
import './CardPopup.css'
import axios from 'axios'

const CardPopup = ({ open, onClose, _id }) => {
  const [color, setColor] = useState("green")
  const [cardData, setCardData] = useState(null)
  const [removedCard, setRemovedCard] = useState(null)

  const colorArr = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown"]
  
  const fetchCardInfo = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/card/${id}`)    
    console.log('Open modal: ', res.data)
    setCardData(res.data)
  }

  // Archive list, get list from db and remove from view
  const handleArchive = async (id) => {
    const card = await axios.get(`http://localhost:5000/api/card/${id}`)
    setRemovedCard(card.data)
    console.log('Archiving card')
  }


  // Edit
  const handleEdit = async (id) => {
    console.log('Editing card')
  }

  useEffect(() =>{
    fetchCardInfo(_id)
  }, [])

  if(!open || cardData === null) return null;

  return (
    <div className="card-background">
      <div className="card-popup">
        <div>   
          <div className="card-popup-heading" style={{ backgroundColor: color}}>
            <h2>{cardData.card.title} </h2>  
            <div className="right-side">      
              <GrFormClose className="close" onClick={onClose}/>
            </div>
          </div>

          <div className="card-content">
          <p>Click to change  your color</p>

            <div className="color-row"> 
              {colorArr.map((color) => {
                return (
                  <span className={`${color}`} onClick={() => setColor(`${color}`)}></span>
                )
              })}
            </div>

            <p>Label: {cardData.card.labels}</p>
            <p>Activity: </p>
            <p>Activity: </p>
            <p className="archive" onClick={handleArchive}>Archive this card</p>
            <p className="edit" onClick={handleEdit}>Edit this card</p>
            <p>Members{cardData.card.members}</p>
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default CardPopup