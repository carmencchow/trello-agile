import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/thunks/fetchList";
import { DataContext } from '../context/DataContext'
import SaveCardBtn from "./SaveCardBtn";
import "./AddCard.css";

const AddCard = () => {
  const { input, setInput, open, listId, id, onClose } = useContext(DataContext);

// const AddCard = ({ open, listId, id,  onClose }) => {
//   const [input, setInput] = useState("");

  const dispatch = useDispatch();

  if (!open) return null;

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleFetchData = () => {
    dispatch(fetchData({ id }));
  };

  const handleCardSaved = () => {
    setInput("");
    handleFetchData();
  };

  return (
    <div className="input-container">
      <div onClick={onClose}>
        <input
          type="text"
          className="card"
          value={input}
          placeholder="Enter a title for this card..."
          onChange={handleInput}
          onClose={onClose}
        />
      </div>

      <div className="save-cancel-btns">
        <SaveCardBtn
          input={input}
          listId={listId}
          onCardSaved={handleCardSaved}
          id={id}          
          onClose={onClose}
        />

        <button className="cancel-btn" onClick={onClose}>X</button>
      
      </div>
    </div>
  );
};

export default AddCard;
