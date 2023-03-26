import React from 'react'
import axios from 'axios'
import './UpdateCardBtn.css';

const UpdateCardBtn = ({ listId, input, onClose, onCardSaved, id, handleFetchData }) => {

  const handleUpdate = async (e, input, id, listId) => {
    console.log("new card title", input);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.put(
      `http://localhost:5000/api/card/?listId=${listId}`,
      { title: `${input}` },

      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = res.data;
    console.log(data);
    onCardSaved();
    onClose();
    handleFetchData();
  } catch (err) {
    console.log(err);
  }
};

return (
  <div>
    <button className="update" onClick={handleUpdate}>
      Update
    </button>
  </div>
);
};


export default UpdateCardBtn