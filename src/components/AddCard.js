import React, { useState, useContext } from "react";
import { DataContext } from '../context/DataContext';
import SaveCardBtn from "./SaveCardBtn";
import "./AddCard.css";

const AddCard = ({ open, listId, id,  onClose }) => {
  const [input, setInput] = useState('');
  // const { handleCardSaved } = useContext(DataContext)

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  
  const handleCardSaved = () => {
    setInput("");
  };

  if (!open) return null;

  return (
    <div className="input-container">
      <input
        type="text"
        className="card"
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
        handleCardSaved={handleCardSaved}
      />

      <button className="cancel-btn" onClick={onClose}>X</button>
      
      </div>
    </div>
  );
};

export default AddCard;