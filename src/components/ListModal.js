import React from 'react'
import { GrFormClose } from 'react-icons/gr'
import './ListModal.css'

const ListModal = ({ open, onClose, listName }) => {
  if(!open) return null;

  return (
    <div className="main">
      <div className="list-modal">
        <div onClick={onClose} className="overlay">
          <div className="list-modal-heading">
            <p>{listName}</p>        
            <GrFormClose className="close" onClick={onClose}/>
          </div>
          <p>Add card ...</p>
          <p>Delete card ...</p>
          <p>Sort by ...</p>
        </div>
      </div>
    </div>
  )
}

export default ListModal;