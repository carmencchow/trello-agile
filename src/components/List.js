import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import AddCard from "../components/AddCard";
import CardPopup from "./CardPopup";
import "./List.css";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ name, cards, id, listId, onClose, handleFetchData }) => {
  const [openNewCard, setOpenNewCard] = useState(false);
  const [cardId, setCardId] = useState(null);

  // const onDragEnd = (result) => {
  //   const { destination, source, draggableId } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   console.log(
  //     `Moving card ${draggableId} from ${source.droppableId} to ${destination.droppableId}`
  //   );

  //   //update the state to move card
  // };

  return (
    <div className="list">
      <span className="list-header">
        <p className="list-name">{name}</p>
        <BsThreeDots />
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
                    {/* <div className="label-color"></div> */}
                    {card.title}


                    // <span className="icon">{<GrFormEdit />}</span>

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
          handleFetchData={handleFetchData}
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
          <button
            className="add-card"
            onClick={() => {
              setOpenNewCard(true);
            }}
          >
            Add a card
          </button>
        ) : (
          <div className="card-btns"></div>
        )}
      </div>
    </div>
  );
};

export default List;
