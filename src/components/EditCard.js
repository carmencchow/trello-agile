import React, { useContext, useState } from "react";
import axios from 'axios'
import { DataContext } from '../context/DataContext'
import './EditCard.css';

const EditCard = ({ openInput }) => {
  const [input, setInput] = useState('');
  const { cardId, handleFetchData } = useContext(DataContext);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      console.log("New card title", input);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.put(
        `http://localhost:5000/api/card/${cardId}`,

        { title: `${input}` },
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      handleFetchData();
      setInput('')
    } catch (err) {
      console.log(err);
    }
  };

  if (!openInput) return null;  

  return (
    <div className="row">
      <div className="edit-input">
        <div className="">
          <input
            type="text"
            className="name"
            value={input}
            placeholder="Enter new card name"
            onChange={handleInput}
          />
        </div>
        <div className="update">  
          <div className="update-close">
            <button className="update-btn" 
            onClick={handleUpdate}>Update</button>
          </div>          
        </div>
      </div>
    </div>
  );
};

export default EditCard;
