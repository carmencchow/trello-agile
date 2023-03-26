import React, { useState } from 'react'
import './CardPopup.css'
import axios from 'axios'
import { FiEdit2 } from 'react-icons/fi'

const EditCard = ({ onCardSaved, onClose, id }) => {
  const [input, setInput] = useState('');

  const handleEdit = async (e) => {
    console.log('editing card name', e.target.value);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.put(
        `http://localhost:5000/api/card/${id}`,
        { title: `${input}`},

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
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = () => {}

  return (
    <div>
      <div className="row">
        <h4>Edit this card</h4>
        <span><FiEdit2 onClick={handleEdit}/></span>
      </div>

      <div onClick={onClose} className="">
        <input
          type="text"
          className="name"
          value={input}
          placeholder="Enter a title for this card..."
          onChange={handleInput}
        />
      </div>

    </div>
  );
};

export default EditCard