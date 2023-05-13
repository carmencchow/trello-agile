import React, { useContext } from "react";
import axios from "axios";
import { server } from "../utils";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataContext } from "../context/DataContext";
import "./CardPopup.css";

const DeleteCard = ({ id, onClose }) => {
  const { handleFetchData } = useContext(DataContext);

  const handleDelete = async () => {
    // await axios.delete(`${server}/api/card/${id}`).then((res) => {
    await axios
      .delete(`https://trello-agile-project.onrender.com/api/card/${id}`)
      .then((res) => {
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
        <span className="edit-icon">
          <RiDeleteBin6Line />
          Delete
        </span>
      </h4>
    </div>
  );
};

export default DeleteCard;
