import React from 'react'
import { GrClose } from 'react-icons/gr'
import './CancelCard.css'

const CancelCard = () => {

  const closeCard = () => {
    console.log('Cancel card')
  }

  return (
    <div>
      <button className="cancel" onClick={closeCard}><GrClose/></button>
    </div>
  )
}

export default CancelCard