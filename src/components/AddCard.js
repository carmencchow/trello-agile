import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { DataContext } from '../context/DataContext'
import { fetchData } from "../store/thunks/fetchList";
import SaveCardBtn from "./SaveCardBtn";
import "./AddCard.css";

const AddCard = ({ open, listId, id,  onClose }) => {
  const { boardId, handleFetchData } = useContext(DataContext)
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  // const handleFetchData = () => {
  //   dispatch(fetchData({ id : boardId }));
  // };

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  
  const handleCardSaved = (e) => {
    setInput("");
    handleFetchData();
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