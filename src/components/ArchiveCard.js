import React, { useState } from 'react'
import { BiArchive } from "react-icons/bi";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'
import "./CardPopup.css";

// TEST CARD: 641b2a96949aa1ed20103ad5 (Calculus) 

const ArchiveCard = ({ id, onClose, onCardSaved, handleFetchData, listId }) => { 

  const [status, setStatus] = useState('archived')

  const handleArchive = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(`Archiving card, ${id}`)
      const res = await axios.get(`http://localhost:5000/api/card/archive/${id}`)
      console.log('status:', res.data.card.status)
      setStatus(res.data.card.status)
      handleFetchData();
      onClose();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="row">
      <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
      <div className="archive-card" onClick={() => {
          handleArchive();
          toast.success(`Card is now archived`)
        }}><span><BiArchive /></span>
        <p>Archive this card</p>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default ArchiveCard;
