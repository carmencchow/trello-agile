import React, { useState } from "react";
import { GrClose } from 'react-icons/gr'
import "./AddCard.css";
import SaveCardBtn from "./SaveCardBtn";

const AddCard = ({ open, close, listId, id, onClose }) => {
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
      <div onClick={close} className="new-card">
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
      />
       {/* <button className="cancel" onClick={onClose}><GrClose/></button> */}
    </div>
  );
};

export default AddCard;
