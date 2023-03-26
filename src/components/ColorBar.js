import React, { useState } from 'react'

const ColorBar = () => {
  const [color, setColor] = useState("green")

  const colorArr = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown"]


  return (
    <div>
      <div className="card-popup-heading" style={{ backgroundColor: color}}>
            <h2>{cardData.card.title} </h2>  
            <div className="right-side">      
              <GrFormClose className="close" onClick={onClose}/>
            </div>
          </div>

          <div className="card-content">
          <p>Click to change  your color</p>

            <div className="color-row"> 
              {colorArr.map((color) => {
                return (
                  <span className={`${color}`} onClick={() => setColor(`${color}`)}></span>
                )
              })}
            </div>
            </div>
          </div>
  )
}

export default ColorBar