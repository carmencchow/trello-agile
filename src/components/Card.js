import React, { useState } from "react";
import { GrClose, GrEdit } from "react-icons/gr";
import CardPopup from "./CardPopup";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./Card.css";

const Card = ({ title, name, cards, _id }) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div>
      { cards.map((card) => {
        return (
          <div key={card._id}
          onClick={() => toggleModal}>
            {/* <p>{card.title} create popup</p> */}
            <p>{card.name} create popup</p>
            <span className="icon">{<GrEdit/>}</span>
          </div>
        )
      })} 
    </div>
  )
}

export default Card