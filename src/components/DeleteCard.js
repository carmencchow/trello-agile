import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import "./CardPopup.css";

// Close out modal or redirect user back to their board screen?
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
      <h4
        onClick={() => {
          handleDelete();
        }}
      >
        Delete this card
      </h4>
      <span>
        <RiDeleteBin6Line
          onClick={() => {
            handleDelete();
          }}
        />
      </span>
    </div>
  );
};

export default DeleteCard;
