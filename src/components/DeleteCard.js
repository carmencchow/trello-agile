import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast'
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { DataContext } from '../context/DataContext'
import { fetchData } from "../store/thunks/fetchList";
import "./CardPopup.css";

const DeleteCard = ({ id, onClose }) => {
  const { boardId, handleFetchData } = useContext(DataContext)
  // const dispatch = useDispatch();

  // const handleFetchData = () => {
  //   dispatch(fetchData({ id : boardId }));
  // };

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
        }}><span><RiDeleteBin6Line /></span>
        <p>Delete this card</p>

      </div>
    </div>
  );
};

export default DeleteCard;
