import React from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import './ListModal.css'

const ListModal = ({ open, onClose }) => {
  if(!open) return null;

  return (
    <div className="list-modal">
      <div onClick={onClose} className="overlay">
        <div onClick={(e) => { e.stopPropagation()}}>
      
          <div className="modal-heading">
            <p>List actions</p>        
            <AiFillCloseSquare className="close" onClick={onClose}/>
          </div>

          <p>Add card ...</p>
          <p>Delete card ...</p>
          <p>Sort by ...</p>

        </div>
      </div>
    </div>
  )
}

export default ListModal