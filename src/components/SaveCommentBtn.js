import React, { useState } from "react";
import axios from "axios";
import "./SaveCommentBtn.css";

const SaveCommentBtn = ({ listId, input, addComment, id, handleFetchData, getCard }) => {

  const [comment, setComment] = useState('');

  const handleSaveComment = async (e) => {
    console.log("saving comments:", input);
    setComment(input);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `http://localhost:5000/api/card/${id}/add-comment`,
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
      // onCommentSaved();
      addComment();
      getCard();
      // handleFetchData();
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div className="save-row"> 
        <h4 className="save" onClick={handleSaveComment}>Save</h4>
      </div>
    );
  };

export default SaveCommentBtn;
