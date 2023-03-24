import React, { useState } from "react";
import { GrClose } from 'react-icons/gr'
import "./AddCard.css";

const AddCard = ({ open, close, onClose }) => {
  const [input, setInput] = useState('');
  if (!open) return null;

  const handleInput = (e) => {
    setInput(e.target.value)
  }  
  
    return (
      <div className="input-container">
        <div onClick={close} className="new-card">
          <input type="text" 
            className="card" 
            value={input}
            placeholder="Enter a title for this card..."
            onChange={handleInput}/>
          
            <button className="cancel" onClick={onClose}><GrClose/></button>

          </div>
        </div>
      )
    }

export default AddCard
