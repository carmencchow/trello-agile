import React, { useState } from "react";
import "./AddCard.css";

const AddCard = ({ open, close }) => {
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
          </div>
        </div>

      )
    }

export default AddCard
