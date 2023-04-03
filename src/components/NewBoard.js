import React, { useState } from "react";
import "./AddCard.css";
import SaveCardBtn from "./SaveCardBtn";

const NewBoard = ({ open, listId, id, handleFetchData, onClose }) => {

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

      {/* <Create
        input={input}
        listId={listId}
        onCardSaved={handleCardSaved}
        id={id}
        handleFetchData={handleFetchData}
        onClose={onClose}
      /> */}

      <button className="create-btn" onClick={createBoard}>Create</button>

    </div>
  );
};

export default NewBoard;
