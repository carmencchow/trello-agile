import React, { useState } from 'react'
import { GrFormClose } from 'react-icons/gr'
import './CardPopup.css'
import ColorBar from './ColorBar'

const CardPopup = ({ open, onClose }) => {
  if(!open) return null;

  const colorChange = (e) => {
    console.log('change color to classname', e.target.value)
  }

  return (
    <div className="card-background">
      <div className="card-popup">
        <div onClick={onClose}>   
          <div className="card-popup-heading">
            <p>CARD NAME: </p>  
            <div className="right-side">      
              <GrFormClose className="close" onClick={onClose}/>
              <span className="color" onClick={colorChange}>Color</span>
            </div>
          </div>

          <div className="card-content">
            <div className="color-row">
              <span className="red" onClick={colorChange}></span>
              <span className="orange"></span>
              <span className="yellow"></span>
              <span className="green"></span>
              <span className="blue"></span>
              <span className="purple"></span>
              <span className="pink"></span>
              <span className="brown"></span>
            </div>
          
            <ColorBar/>

            <p>Description</p>
            <p>Activity</p>
            <p>Archive</p>
            <p>Members</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CardPopup