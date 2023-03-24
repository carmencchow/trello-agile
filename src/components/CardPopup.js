import React from 'react'
import { GrFormClose } from 'react-icons/gr'
import ColorBar from '../components/ColorBar'
import './CardPopup.css'

const CardPopup = ({ open, onClose }) => {
  if(!open) return null;

  const changeColor = () => {
    console.log('changing color')
  }

  return (
    <div className="card-background">
      <div className="card-popup">
        <div>    
          <div className="card-popup-heading">
            <p>CARD NAME:_____________</p>  
            <div className="right-side">      
              <GrFormClose className="close" onClick={onClose}/>
              <span className="color" onClick={changeColor}>Color</span>
            </div>

          </div>

          <div className="card-content">
          <ColorBar/>

            <p>Description</p>
            <span></span>
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