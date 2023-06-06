import React, { useContext } from "react";
import { api } from "../utils";
import { DataContext } from "../context/DataContext";
import "./CardPopup.css";

const DeleteCard = ({ id, onClose }) => {
  const { handleFetchData } = useContext(DataContext);

  const handleDelete = async () => {
    await api.delete(`/card/${id}`).then((res) => {
      console.log(`Card deleted`, res.data);
      onClose();
    });
    handleFetchData();
    onClose();
  };

  return (
    <div className="">
      <h4
        className="edit-card"
        onClick={() => {
          handleDelete();
        }}
      >
        <span className="edit-icon">Delete</span>
      </h4>
    </div>
  );
};

export default DeleteCard;
