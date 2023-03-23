import React from "react";
// import { AiFillCloseSquare } from "react-icons";
import "./AddCard.css";

const AddCard = ({ open }) => {
  if (!open) return null;
  return (
    <div className="list-modal">
      <div className="overlay">
        {/* <div onClick={(e) => { e.stopPropagation()}}> */}

        <div className="modal-heading">
          <input type="text" className="card"></input>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default AddCard;
