import React, { useState } from 'react'
import './ColorBar.css'

const ColorBar = () => {
  const [bgColor, setBgColor] = useState("yellow")

  const colorChange = (e) => {
    console.log('change color to classname', e.target.value)
    setBgColor(e.target.value)
  }

  return (
    <div className="color-container">
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
    </div>
  )
}

export default ColorBar