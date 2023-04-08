import React, { useState, useContext } from "react";
import axios from "axios";
import "./SaveCommentBtn.css";
import DataContext from "../context/DataContext";


const SaveCommentBtn = ({ listId, input, clearComment, id, handleFetchData, getCard }) => {

// const SaveCommentBtn = ({ handleFetchData }) => {
//   const { listId, input, clearComment, id, getCard } = useContext(DataContext);


  const handleSaveComment = async (e) => {
    console.log("saving comments:", input);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `http://localhost:5000/api/card/${id}/comment`,
        { 
          comments: `${input}` 
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
      clearComment();
      await getCard(id);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div className="comment-row"> 
        <h4 className="save-comment-btn" onClick={handleSaveComment}>Save</h4>
      </div>
    );
  };

export default SaveCommentBtn;
