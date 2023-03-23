import React, { useState } from "react";
import { useEffect } from 'react-router-dom'
import "./AddCard.css";
import axios from 'axios'

const AddCard = ({ open, onClose }) => {
  const [input, setInput] = useState('');
  if (!open) return null;

  const handleInput = (e) => {
    setInput(e.target.value)
    console.log(e.target.value)
  }  
  
    return (
      <div>
        <div className="overlay">
           <div className="modal-heading">
             <input type="text" 
               className="card" 
               value={input}
               placeholder="Enter a title for this card..."
               onChange={handleInput}
                >
             </input>
             <button>Save</button>
           </div>
         </div>
      </div>
    )
  }

export default AddCard
