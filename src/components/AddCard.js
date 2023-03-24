import React, { useState } from "react";
import { useEffect } from 'react-router-dom'
import "./AddCard.css";
import SaveCardBtn from './SaveCardBtn'
import CancelCard from './CancelCard'
import axios from 'axios'
import { AiFillCloseSquare } from 'react-icons/ai'

const AddCard = ({ open, close }) => {
  const [input, setInput] = useState('');
  if (!open) return null;

  const handleInput = (e) => {
    setInput(e.target.value)
    console.log(e.target.value)
  }  
  
    return (
      <div className="input-container">
        <div onClick={close} className="new-card">
          {/* <div onClick={(e) => { e.stopPropagation()}}> */}
            {/* <AiFillCloseSquare className="close" onClick={close}/> */}

            <input type="text" 
              className="card" 
              value={input}
              placeholder="Enter a title for this card..."
              onChange={handleInput}/>
          </div>
        </div>
      //  </div>
    )
  }

export default AddCard
