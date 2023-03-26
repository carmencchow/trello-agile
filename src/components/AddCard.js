import React, { useState } from "react";
import "./AddCard.css";
import SaveCardBtn from "./SaveCardBtn";

const AddCard = ({ open, listId, id, handleFetchData }) => {

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
      <div>
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
      />
    </div>
  );
};

export default AddCard;
