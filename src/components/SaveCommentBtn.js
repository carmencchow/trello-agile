import React, { useContext } from "react";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import "./SaveCommentBtn.css";

const SaveCommentBtn = ({ input }) => {
  const { clearComment, cardId, getCard, handleFetchData } = useContext(DataContext);

  const handleSaveComment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const res = await axios.post(
        `http://localhost:5000/api/card/${cardId}/comment`,
        { 
          comments: `${input}` 
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      handleFetchData();
      getCard(cardId);
      clearComment();
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
