import React, { useContext, useState } from "react";
import axios from 'axios'
import { DataContext } from '../context/DataContext'
import './EditCard';

const AddComment = ({ commentInput, setCommentInput }) => {
  const [comment, setComment] = useState('');
  const { clearComment, getCard, cardId, handleFetchData } = useContext(DataContext);

  const handleInput = (e) => {
    setComment(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      console.log("New comment", comment)

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        `http://localhost:5000/api/card/${cardId}/comment`,

        { 
          comments: `${comment}` 
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
      // clearComment();
      setCommentInput(false);
      // setComment("")
      } catch (err) {
        console.log(err);
      }
    };

  if (!commentInput) return null;  

  return (
    <div className="row">
      <div className="edit-input">
        <div className="">
          <input
            type="text"
            className="edit-input"
            value={comment}
            placeholder=" "
            onChange={handleInput}
          />
        </div>
        <div className="update">  
          <div className="update-close">
            <button className="update-btn" 
            onClick={handleUpdate}>Update</button>
          </div>          
        </div>
      </div>
    </div>
  );
};

export default AddComment;
