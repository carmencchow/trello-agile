import TrelloCard from "./TrelloCard";
import "./TrelloList.css";


export const TrelloList = ({ name, cards }) => {
  return (
    <div>
      <h2>{name}</h2>
      {cards?.map((card) => (
        <TrelloCard
          key={card._id}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};
