import React, { useState, useContext } from "react";
import axios from "axios";
import { server } from "../utils";
import { DataContext } from "../context/DataContext";
import "./AddCard.css";

const AddCard = ({ openAddCard, listId, onClose }) => {
  const { handleFetchData } = useContext(DataContext);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        `${server}/api/card/?listId=${listId}`,
        // `https://trello-agile-project.onrender.com/api/card/?listId=${listId}`,

        {
          title: `${input}`,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      handleFetchData();
      setInput("");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  if (!openAddCard) return null;

  return (
    <div className="input-container">
      <input
        type="text"
        className="cards"
        value={input}
        placeholder="  Enter a title for this card..."
        onChange={handleInput}
        onClose={onClose}
      />

      <div className="save-cancel-btns">
        <button className="save-card-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddCard;
