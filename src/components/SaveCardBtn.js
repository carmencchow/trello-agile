import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DataContext } from '../context/DataContext';
import { fetchData } from "../store/thunks/fetchList";
import './SaveCardBtn.css';

const SaveCardBtn = ({ listId, onCardSaved, id, input }) => {

  // const { boardId } = useContext(DataContext)

  const dispatch = useDispatch();

  const handleFetchData = () => {
    dispatch(fetchData({ id }));
    // dispatch(fetchData({ id : boardId }));
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
    
      { title: `${input}` },

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      const data = res.data;
      console.log('List id is:', listId)
      console.log(data);
      onCardSaved();
      handleFetchData();
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
