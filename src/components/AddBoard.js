import React, { useState, useContext } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from '../context/DataContext'
import "./Workspaces.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/thunks/fetchList";

// const AddBoard = ({ handleFetchData }) => {
//   const [input, setInput] = useState('');

const AddBoard = () => {
  const { input, setInput, id } = useContext(DataContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const handleFetchData = () => {
    dispatch(fetchData({ id }));
  };

  const createBoard = (id) => {
    console.log('Creating board')
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = axios.post('http://localhost:5000/api/board/',

        { title: `${input}` },
        { method: "POST", headers: { "Content-Type": "application/json",}, }
      
      );

      // GET new id from MongoDB
      // const id = res.data.id; 
      navigate(`/board/${id}`);
      const data = res.data;
      console.log('New board', data);
      handleFetchData();
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
