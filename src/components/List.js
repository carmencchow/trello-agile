import React, { useState, useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import AddCard from "../components/AddCard";
import CardPopup from "./CardPopup";
import "./List.css";
import { AppContext } from '../context/AppContext'
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ name, cards, id, listId, onClose, handleFetchData }) => {
  const [openNewCard, setOpenNewCard] = useState(false);
  const [cardId, setCardId] = useState(null);

  return (
    <div className="list">
      <span className="list-header">
        <p className="list-name">{name}</p>
        <p className="dots"><BsThreeDots/></p>    
      </span>

      <Droppable droppableId={id}>
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

      {/* Display modal */}
      {cardId !== null && (
        <CardPopup
          open={cardId !== null}
          onClose={() => setCardId(null)}
          id={cardId}
          listId={listId}
          handleFetchData={handleFetchData}
          cards={cards}
        />
      )}

      <div className="input-field">
        <AddCard
          open={openNewCard}
          listId={listId}
          id={id}
          handleFetchData={handleFetchData}
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
