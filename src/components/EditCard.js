import React, { useState } from 'react'
import './CardPopup.css'
import UpdateCardBtn from './UpdateCardBtn'

const EditCard = ({ open, onClose, onCardSaved, id, handleFetchData, listId }) => {
  const [name, setName] = useState('');
  if (!open) return null;

  const handleInput = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleUpdateName = () => {
    setName('');
  };  

  return (
    <div className="row">  
      <div className="edit-input">
        <div onClick={onClose} className="">
          <input
            type="text"
            className="name"
            value={name}
            placeholder="Enter new card name"
            onChange={handleInput}/>
        </div>

      <UpdateCardBtn
        input={name}
        onCardSaved={handleUpdateName}
        id={id}
        handleFetchData={handleFetchData}
        listId={listId}
        onClose={onClose}/>

      </div>
    </div>
  );
};

export default EditCard