import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils";
import "./Workspaces.css";

const AddBoard = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const createBoard = async () => {
    console.log("Creating board");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const res = await api.post("/board", {
        title: `${input}`,
      });

      // GET new id from MongoDB
      const data = res.data;
      console.log("New board", data);
      setInput("");
      navigate(`/board/${data.newBoard._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="board-name">
      <input
        type="text"
        value={input}
        className="newboard-input"
        placeholder="New board title"
        onChange={handleInput}
      />
      <button className="createBtn" onClick={createBoard}>
        Create
      </button>
    </div>
  );
};

export default AddBoard;
