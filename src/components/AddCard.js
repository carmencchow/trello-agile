import React, { useState, useContext } from "react";
import axios from 'axios'
import { DataContext } from '../context/DataContext'
import "./AddCard.css";

const AddCard = ({ open, listId, onClose }) => {
  const [input, setInput] = useState('');
  const { handleFetchData, handleCardSaved, clearInput } = useContext(DataContext);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

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
  
  
  if (!open) return null;

  return (
    <div className="input-container">
      <input
        type="text"
        className="cards"
        value={input}
        placeholder="Enter a title for this card..."
        onChange={handleInput}
        onClose={onClose}
      />

      <div className="save-cancel-btns">
        <button className="cancel-btn" onClick={onClose}>X</button>
        <button className="save-card-btn" onClick={handleSave}>Save
      </button>
      
      </div>
    </div>
  );
};

export default AddCard;