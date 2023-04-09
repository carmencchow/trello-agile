import React, { useContext } from "react";
import { DataContext } from '../context/DataContext'
import { useDispatch } from "react-redux";
import { fetchData } from "../store/thunks/fetchList";
import UpdateCardBtn from "./UpdateCardBtn";
import './EditCard.css';
import "./CardPopup.css";

// const EditCard = ({ open, onClose, id, handleFetchData, listId }) => {
//   const [name, setName] = useState("");
//   if (!open) return null;

const EditCard = ({ id }) => {
  const { open, onClose, cardId, name, setName, listId } = useContext(DataContext);
  const dispatch = useDispatch();

  if (!open) return null;  

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleFetchData = () => {
    dispatch(fetchData({ cardId }));
    // dispatch(fetchData({ listId }));
  };

  const handleUpdateName = () => {
    console.log(name);
    setName("");
  };

  return (
    <div className="row">
      <div className="edit-input">
        <div className="">
          <input
            type="text"
            className="name"
            value={name}
            placeholder="Enter new card name"
            onChange={handleInput}
          />
        </div>
        <div className="update">
          <UpdateCardBtn
            input={name}
            onCardSaved={handleUpdateName}
            id={id}
            handleFetchData={handleFetchData}
            listId={listId}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCard;
