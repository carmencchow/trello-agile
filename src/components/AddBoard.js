import React, { useState } from "react";
import "./AddCard.css";
import CreateCardBtn from "./CreateCardBtn";

const AddBoard = ({ open, listId, id, handleFetchData, onClose }) => {

  const [input, setInput] = useState("");

  if (!open) return null;

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const createBoard = () => {
    
  }
  
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
          placeholder="Enter a board name"
          onChange={handleInput}
          onClose={onClose}
        />
      </div>

      <CreateCardBtn
        input={input}
        listId={listId}
        onCardSaved={handleCardSaved}
        id={id}
        handleFetchData={handleFetchData}
        onClose={onClose}
      />

    </div>
  );
};

export default AddBoard;
