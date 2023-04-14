import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Workspaces.css";

const AddBoard = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [error, setError] = useState('Board already exists');

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const createBoard = async () => {
    console.log('Creating board')
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post('http://localhost:5000/api/board',

        { title: `${input}` },
        { method: "POST", headers: { "Content-Type": "application/json",}, }      
      
      );

      // GET new id from MongoDB
      const data = res.data;
      console.log('New board', data);
      setInput('');
      navigate(`/board/${data.newBoard._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="board-name">
      <input 
        type="text" 
        value={input}
        className="newboard-input"
        placeholder="New board title"
        onChange={handleInput}
      />
      <button className="createBtn" onClick={createBoard}>Create</button>
    
    </div>
  )
}

export default AddBoard
