import TrelloCard from "./TrelloCard";
import "./TrelloList.css";
import { Draggable } from 'react-beautiful-dnd';

export const TrelloList = ({ name, cards }) => {

  console.log(cards, 'check cards');
  return (
    <div className='list-div'>
      <h2>{name}</h2>
      {cards?.map((card, index) => (
        <Draggable key={card._id} draggableId={`${card._id}`} index={index}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <TrelloCard title={card.title} description={card.description} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};