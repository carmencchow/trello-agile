import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TrelloList } from "./TrelloList";
import { Grid } from "@mui/material";
import "./Columns.css";
import { store } from "../store";
import { Provider, useSelector } from "react-redux";
import { useState} from "react";

export const Board = ({ lists }) => {
  const [currentLists, setLists] = useState(lists);
  const onDragEnd = (result) => {

    if (!result.destination) {
      return;
    }

    const sourceList = currentLists.find((list) => list._id.toString() === result.source.droppableId);
    const destinationList = currentLists.find((list) => list._id.toString() === result.destination.droppableId);    

    const card = sourceList.cards.find((card) => card._id === parseInt(result.draggableId));

//filter cards
    const newSourceCards = sourceList.cards.filter((c) => c._id !== card._id);

//new destination for cards
    const newDestCards = [...destinationList.cards];
    newDestCards.splice(result.destination.index, 0, card);
//map new list with destination
    const newList = currentLists.map(list => {
      if (list.name === sourceList.name) {
        return {...list, cards: newSourceCards};
      }
      if (list.name === destinationList.name) {
        return {...list, cards: newDestCards};
      }
      return list;
    });
    setLists(newList);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Provider store={store}>
        <Grid container spacing={2}>
          {currentLists.map((list) => (
            <Grid key={list.name} item xs={12} sm={6} md={4} lg={3}>
              <Droppable droppableId={`${list._id}`}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TrelloList name={list.name} cards={list.cards} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </Provider>
    </DragDropContext>
  );
};