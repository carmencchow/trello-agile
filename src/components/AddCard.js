import React, { useState } from "react";
import SaveCardBtn from "./SaveCardBtn";
import "./AddCard.css";

const AddCard = ({ open, listId, id,  onClose }) => {
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  
  if (!open) return null;

  return (
    <div className="input-container">
      <input
        type="text"
        className="cards"
        value={input}
        placeholder="Enter a title for this card..."
        onChange={handleInput}
        onClose={onClose}
      />

    <div className="save-cancel-btns">
      <SaveCardBtn
        input={input}
        listId={listId}
        id={id}          
        onClose={onClose}
      />

      <button className="cancel-btn" onClick={onClose}>X</button>
      
      </div>
    </div>
  );
};

export default AddCard;