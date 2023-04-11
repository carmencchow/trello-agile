import React, { useContext } from "react";
import { DataContext } from '../context/DataContext'
import UpdateCardBtn from "./UpdateCardBtn";
import './EditCard.css';
import "./CardPopup.css";

const EditCard = ({ id }) => {
  const { open, onClose, name, setName, listId } = useContext(DataContext);

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleUpdateName = () => {
    setName("");
  };

  if (!open) return null;  

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
            handleUpdateName={handleUpdateName}
            id={id}
            listId={listId}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCard;
