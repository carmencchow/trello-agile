import React, { useState } from 'react'
import './SaveCardBtn.css'
import axios from 'axios'

const SaveCardBtn = () => {
  const [input, setInput] = useState('')
  
  const handleSave = async (e) => {
    console.log('saving card', e.target.value)
    setInput(e.target.value);
    try {
      const res = await axios.post('http://localhost:5000/api/card', input,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = res.data;
      console.log(data);
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <button 
        className="save" 
        onClick={handleSave}>Save</button>
    </div>
  )
}

export default SaveCardBtn