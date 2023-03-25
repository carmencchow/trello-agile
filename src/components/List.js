import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { GrClose, GrEdit } from "react-icons/gr";
import AddCard from "../components/AddCard";
import SaveCardBtn from "./SaveCardBtn";
import CardPopup from "./CardPopup";
import "./List.css";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ name, cards, _id }) => {
  // const [openModal, setOpenModal] = useState(false);
  const [openNewCard, setOpenNewCard] = useState(false);
  const [cardId, setCardId] = useState(null);

  // const toggleModal = () => {
  //   setOpenModal(!openModal);
  // };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    console.log(`Moving card ${draggableId} from ${source.droppableId} to ${destination.droppableId}`);

    //update the state to move card
  };

  return (
    <div className="list">
      <span className="list-header">
        <p className="list-name">{name}</p>
        <BsThreeDots />
      </span>

      <Droppable droppableId={_id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {cards.map((card, index) => (
              <Draggable
                key={card._id}
                draggableId={card._id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={card._id}
                    className="cards"
                    onClick={() => {
                      setCardId(card._id)
                      // setOpenModal(true)
                    }}
                  >
                    {card.title}

                    <span className="icon">{<GrEdit/>}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

{/* Model appear in the DOM tree */}
      {cardId !==null && 
        <CardPopup 
          open={cardId !== null}
          onClose={() => setCardId(null)}
          _id={cardId}
        />
        }

      <div className="input-field">
        <AddCard open={openNewCard} />

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
          <div className="card-btns">
            <SaveCardBtn />
          </div>
        )}
      </div>
    </div>
  );
};

export default List;