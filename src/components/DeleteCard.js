import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import "./CardPopup.css";

const DeleteCard = ({ id, handleFetchData, onClose }) => {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/card/${id}`).then((res) => {
      console.log(`Card deleted`);
      onClose();
    });
    handleFetchData();
  };

  return (
    <div className="row">
      <div className="delete-card" onClick={() => {
          handleDelete();
        }}><span><RiDeleteBin6Line /></span>
        <p>Delete this card</p>
      </div>
    </div>
  );
};

export default DeleteCard;
