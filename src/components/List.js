import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import ListModal from "./ActivityModal";
import AddCard from "../components/AddCard";
import SaveCardBtn from "./SaveCardBtn";
import CancelCard from "./CancelCard";
import "./List.css";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ name, cards, _id }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openNewCard, setOpenNewCard] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

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
        <span className="dots" onClick={() => toggleModal()}>
          <BsThreeDots />
        </span>
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
                  >
                    {card.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <CardPopup 
        open={openModal}
        onClose={() => setOpenModal(false)}/>
      
      <div>
        {openModal && <ListModal toggleModal={toggleModal} />}
      </div>

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
            <CancelCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default List;