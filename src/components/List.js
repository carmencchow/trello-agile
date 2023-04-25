import React, { useState, useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import { DataContext } from '../context/DataContext'
import AddCard from "../components/AddCard";
import CardPopup from "./CardPopup";
import "./List.css";

const List = ({ cards, listId, listname }) => {
  const [ openAddCard, setOpenAddCard ] = useState(false);
  const { cardId, setCardId, handleFetchData } = useContext(DataContext)

  return (
    <div className="list">
      <span className="list-header">
        <p className="list-name">{listname}</p>
        <p className="dots"><BsThreeDots/></p>    
      </span>

      <Droppable droppableId={listId}>
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
                      console.log('Card id:', card._id)
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
          openModal={cardId !==null}
          onCloseModal={() => {setCardId(null)
          handleFetchData()}
        }/>
      )}

      <div className="input-field">
        <AddCard
          openAddCard={openAddCard}
          listId={listId}
          onClose={() => {setOpenAddCard(false)}}
        />

        {!openAddCard ? (
          <div
            className="add-card"
            onClick={() => {
              setOpenAddCard(true);
            }}
          ><p className="add-card-text">+ Add a card</p>
          </div>
        ) : (
          <div className="card-btns"></div>
        )}
      </div>
    </div>
  );
};

export default List;
