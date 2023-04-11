import React, { useContext } from "react";
import axios from "axios";
import { DataContext } from '../context/DataContext';
import './SaveCardBtn.css';

const SaveCardBtn = ({ listId, input, onClose }) => {
  const { handleFetchData, clearInput, handleCardSaved } = useContext(DataContext)
  
  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.post(
      `http://localhost:5000/api/card/?listId=${listId}`,
    
      { 
        title: `${input}` 
      },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      const data = res.data;
      console.log(data);
      handleFetchData();
      onClose();
      handleCardSaved();
      clearInput();
    } catch (err) {
      console.log(err);
    }
  };

    return (
      <div>
        <button className="save-card-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    );
  };

export default SaveCardBtn;
