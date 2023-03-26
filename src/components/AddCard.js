import React, { useState } from "react";
// import { GrClose } from "react-icons/gr";
import "./AddCard.css";
import SaveCardBtn from "./SaveCardBtn";

const AddCard = ({ open, close, listId, id, onClose, handleFetchData }) => {

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
      <div onClick={onClose} className="">
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
      {/* <button className="cancel" onClick={onClose}><GrClose/></button> */}
    </div>
  );
};

export default AddCard;
