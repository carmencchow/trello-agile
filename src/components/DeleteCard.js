import React, { useContext } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataContext } from '../context/DataContext'
import "./CardPopup.css";

const DeleteCard = ({ id, onClose }) => {
  const { handleFetchData } = useContext(DataContext)

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/card/${id}`).then((res) => {
      console.log(`Card deleted`, res.data);
      onClose();
    });
    handleFetchData();
    onClose();
  };

  return (
    <div className="">      
      <h4 className="edit-card" onClick={() => {
        handleDelete();
        toast.success(`Card deleted`)
        }}>
        <span className="edit-icon"><RiDeleteBin6Line />Delete</span>
      </h4>
    </div>
  );
};

export default DeleteCard;
