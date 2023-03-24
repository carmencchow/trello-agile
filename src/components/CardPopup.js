import React from 'react'
import { GrFormClose } from 'react-icons/gr'
import './CardPopup.css'

const CardPopup = ({ open, onClose }) => {
  if(!open) return null;

  return (
    <div className="list-modal">
      <div onClick={onClose} className="overlay">
      
          <div className="list-modal-heading">
            <p>List actions</p>        
            <GrFormClose className="close" onClick={onClose}/>
          </div>

          <p>Add card ...</p>
          <p>Delete card ...</p>
          <p>Sort by ...</p>

        </div>
      </div>
    )
  }

export default CardPopup