import React from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import './AddCard.css'

const AddCard = ({ open }) => {
  if (!open) return null;
  return (
    <div>
      <div className="overlay">
        <div className="modal-heading">
          <input type="text" className="card" placeholder="Enter a title for this card..."></input>
        </div>
      </div>
    </div>
  )
}

export default AddCard