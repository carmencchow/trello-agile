import React, { useContext, useState } from "react";
import { api } from "../utils";
import { DataContext } from "../context/DataContext";
import "./EditCard.css";

const EditCard = ({ openInput, setOpenInput }) => {
  const [input, setInput] = useState("");
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
      const res = await api.put(`/card/${cardId}`, { title: `${input}` });
      const data = res.data;
      console.log(data);
      handleFetchData();
      setOpenInput(false);
      setInput("");
    } catch (err) {
      console.log(err);
    }
  };

  if (!openInput) return null;

  return (
    <div className="name-change-input">
      <input
        type="text"
        className="change-input"
        value={input}
        placeholder=" "
        onChange={handleInput}
      />
      <button className="update-btn" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default EditCard;
