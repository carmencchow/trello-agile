import React from 'react'
import { GrFormClose } from 'react-icons/gr'
import './CardPopup.css'

const CardPopup = ({ open, onClose }) => {
  if(!open) return null;

  return (
    <div className="card-background">
      <div className="card-popup">
        <div onClick={onClose} className="overlay">    
          <div className="card-popup-heading">
            <p>List actions</p>        
            <GrFormClose className="close" onClick={onClose}/>
          </div>

          <div className="card-content">
            <p>Add card ...</p>
            <p>Delete card ...</p>
            <p>Sort by ...</p>
          </div>

          </div>
        </div>
      </div>
    )
  }

export default CardPopup