import React from 'react'
import { GrFormClose } from 'react-icons/gr'
import './ActivityModal.css'

const ActivityModal = ({ open, onClose }) => {
  if(!open) return null;

  // const toggleModal = () => {
  //   setOpenModal(!openModal);
  //   console.log("open modal");
  // };


  return (
    <div className="main">
    <div className="list-modal">
      <div onClick={onClose} className="overlay">
      
          <div className="list-modal-heading">
            <p>List actions</p>        
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

export default ActivityModal