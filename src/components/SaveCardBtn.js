import React from 'react'
import './SaveCardBtn.css'

const SaveCardBtn = () => {
  
  const handleSave = () => {
    console.log('saving card')
  }
  
  return (
  
    <div>
      <button className="save" onClick={handleSave}>Save</button>
    </div>
  )
}

export default SaveCardBtn