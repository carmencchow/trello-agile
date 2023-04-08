import React, { useState, useContext } from "react";
import "./CardPopup.css";
import UpdateCardBtn from "./UpdateCardBtn";
import { DataContext } from '../context/DataContext'
import './EditCard.css';

const EditCard = ({ open, onClose, onCardSaved, id, handleFetchData, listId }) => {
  const [name, setName] = useState("");
  if (!open) return null;

// const EditCard = ({ handleFetchData }) => {
//   const { open, onClose, onCardSaved, id, name, setName, listId } = useContext(DataContext);
//   if (!open) return null;  

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleUpdateName = () => {
    console.log(name);
    setName("");
  };

  return (
    <div className="row">
      <div className="edit-input">
        <div className="">
          <input
            type="text"
            className="name"
            value={name}
            placeholder="Enter new card name"
            onChange={handleInput}
          />
        </div>
        <div className="update">
          <UpdateCardBtn
            input={name}
            onCardSaved={handleUpdateName}
            id={id}
            handleFetchData={handleFetchData}
            listId={listId}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCard;
