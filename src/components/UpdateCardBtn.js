import React, { useContext } from 'react'
import axios from 'axios'
import { DataContext } from '../context/DataContext'
import './UpdateCardBtn.css';

const UpdateCardBtn = () => {
  const { handleFetchData, handleCardSaved, input, id } = useContext(DataContext)

  const handleUpdate = async () => {
    try {
      console.log("New card title", input);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.put(
        `http://localhost:5000/api/card/${id}`,

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
      handleCardSaved();
      handleFetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="update-close">
      <button className="update" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateCardBtn