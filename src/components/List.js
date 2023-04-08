import React, { useState, useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import AddCard from "../components/AddCard";
import CardPopup from "./CardPopup";
import "./List.css";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { DataContext } from '../context/DataContext'

const List = ({ cards, listId }) => {
  const [openNewCard, setOpenNewCard] = useState(false);

  const { cardId, setCardId, name } = useContext(DataContext)

  return (
    <div className="list">
      <span className="list-header">
        <p className="list-name">{name}</p>
        <p className="dots"><BsThreeDots/></p>    
      </span>

      <Droppable droppableId={cardId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {cards.map((card, index) => (
              <Draggable key={card._id} draggableId={card._id} index={index}>
                {(provided) => (
                   <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={card._id}
                    className="cards"
                    onClick={() => {
                      console.log(card._id)
                      setCardId(card._id);
                    }}
                  >

                    <div className={`${card.color}`}></div>
                    <p className="card-title">{card.title}</p>
                   </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
     
      {cardId !== null && ( 
        <CardPopup
          open={cardId !==null}
          onClose={() => setCardId(null)}
        />
      )}

      <div className="input-field">
        <AddCard
          open={openNewCard}
          listId={listId}
          id={cardId}
        />

        {!openNewCard ? (
          <div
            className="add-card"
            onClick={() => {
              setOpenNewCard(true);
            }}
          >
            + Add a card
          </div>
        ) : (
          <div className="card-btns"></div>
        )}
      </div>
    </div>
  );
};

export default List;
