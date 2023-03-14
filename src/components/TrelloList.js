import TrelloCard from './TrelloCard';
import './TrelloList.css';

const TrelloList = ({title}) => {
  return (
    <div className='list-container'>
      <h3>{title}</h3>
      <TrelloCard />
      </div>
  )
};

export default TrelloList;