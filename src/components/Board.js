import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TrelloList } from "./TrelloList";
import { Grid } from "@mui/material";
import "./Columns.css";
import { store } from "../store";
import { Provider } from "react-redux";

export const Board = ({ lists }) => {
  const onDragEnd = () => {
    //handle the logic for dropping an item
  };
// console.log(lists, 'lists not funct')
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Provider store={store}>
        <Grid container spacing={2}>
          {lists.map((list) => (
            <Grid key={list._id} item xs={12} sm={6} md={4} lg={3}>
              <Droppable droppableId={list.name}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TrelloList
                      key={list._id}
                      name={list.name}
                      cards={list.cards}
                    />
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
