import { TrelloList } from './TrelloList'

export const Board = ({ lists }) => {
  return (
    <div>
      {lists.map(list => (
        <TrelloList key={list._id} name={list.name} cards={list.cards} />
      ))}
    </div>
  );
};