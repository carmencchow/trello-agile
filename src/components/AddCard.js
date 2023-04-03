
import React, { useState } from "react";
import "./AddCard.css";
import SaveCardBtn from "./SaveCardBtn";

const AddCard = ({ open, listId, id, onCardSaved, handleFetchData, onClose }) => {

  const [input, setInput] = useState("");

  if (!open) return null;

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  
  const handleCardSaved = () => {
    setInput("");
  };

  return (
    <div className="input-container">
      <div className={onClose}>
        <input
          type="text"
          className="card"
          value={input}
          placeholder="Enter a title for this card..."
          onChange={handleInput}
        />
      </div>

      <SaveCardBtn
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

export default AddCard;
