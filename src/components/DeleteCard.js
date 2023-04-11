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
  };

  return (
    <div className="row">
      <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
      <div className="delete-card" onClick={() => {
        handleDelete();
        toast.success(`Card deleted`)
        }}><span className="delete-icon"><RiDeleteBin6Line /></span>
        <p>Delete this card</p>

      </div>
    </div>
  );
};

export default DeleteCard;
