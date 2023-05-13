import React, { useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { server } from "../utils";
import "./EditCard.css";

const AddComment = ({ commentInput, setCommentInput }) => {
  const [comment, setComment] = useState("");
  const { getCard, cardId, handleFetchData } = useContext(DataContext);

  const handleInput = (e) => {
    setComment(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        // `${server}/api/card/${cardId}/comment`,
        `https://trello-agile-project.onrender.com/api/card/${cardId}/comment`,
        {
          comment: `${comment}`,
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
      getCard(cardId);
      setCommentInput(false);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  if (!commentInput) return null;

  return (
    <div className="comment-input">
      <input
        type="text"
        className="add-input"
        value={comment}
        placeholder=" "
        onChange={handleInput}
      />
      <button className="comment-btn" onClick={handleUpdate}>
        Save
      </button>
    </div>
  );
};

export default AddComment;
