
import React, { useState } from "react";
import "./AddCard.css";
import SaveCardBtn from "./SaveCardBtn";

const AddCard = ({ open, listId, id, handleFetchData, onClose }) => {

  const [input, setInput] = useState("");

  if (!open) return null;

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  
  const handleCardSaved = () => {
    setInput("");
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
          onCardSaved={handleCardSaved}
          id={id}
          handleFetchData={handleFetchData}
          onClose={onClose}
        />

        <button className="cancel-btn" onClick={onClose}>X</button>
      
      </div>
    </div>
  );
};

export default AddCard;
