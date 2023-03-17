import { TrelloList } from './TrelloList';
import { Grid } from '@mui/material';
import './Columns.css'


export const Board = ({ lists }) => {
  return (
    <Grid container spacing={2}>
      {lists.map((list) => (
        <Grid key={list._id} item xs={12} sm={6} md={4} lg={3}>
          <TrelloList key={list._id} name={list.name} cards={list.cards} />
        </Grid>
      ))}
    </Grid>
  );
};