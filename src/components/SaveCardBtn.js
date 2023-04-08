import React, { useContext } from "react";
import axios from "axios";
import './SaveCardBtn.css'
import { DataContext } from '../context/DataContext'
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/thunks/fetchList";

// const SaveCardBtn = ({ listId, input, onCardSaved, id, onClose }) => {

const SaveCardBtn = ({ listId, onCardSaved, id }) => {
  const { input } = useContext(DataContext);

  const dispatch = useDispatch();

  const handleFetchData = () => {
    dispatch(fetchData({ id }));
  };

  const handleSave = async (e, id) => {
  console.log("saving card", e.target.value);

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
