
import React, { useState, useContext } from "react";
import "./AddCard.css";
import SaveCardBtn from "./SaveCardBtn";
import { DataContext } from '../context/DataContext'

// const AddCard = ({ handleFetchData }) => {
//   const { input, setInput, open, listId, id, onClose } = useContext(DataContext);

const AddCard = ({ open, listId, id,  onClose }) => {
  const [input, setInput] = useState("");
  
  if (!open) return null;

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  
  const handleCardSaved = () => {
    setInput("");
    handleFetchData();
        
  };

  const handleClose = () => {
    console.log('Close input')
    onClose();
  }

  return (
    <div className="input-container">
      <div onClick={onClose}>
        <input
          type="text"
          className="card"
          value={input}
          placeholder="Enter a title for this card..."
          onChange={handleInput}
          onClose={onClose}
        />
      </div>

      <div className="save-cancel-btns">
        <SaveCardBtn
          input={input}
          listId={listId}
          // onChange={handleInput}
          onCardSaved={handleCardSaved}
          id={id}          
          onClose={onClose}
        />

        <button className="cancel-btn" onClick={onClose}>X</button>
      
      </div>
    </div>
  );
};

export default AddCard;
