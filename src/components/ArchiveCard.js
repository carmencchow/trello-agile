import React from 'react'
import { BiArchive } from "react-icons/bi";
import axios from "axios";
import "./CardPopup.css";

// TEST CARD: 641b2a96949aa1ed20103ad5 (Calculus) 

const ArchiveCard = ({ id, onClose, onCardSaved, handleFetchData, listId }) => { 

  const handleArchive = async () => {
    try {
      console.log(`Archiving card, ${id}`)
      const res = await axios.get(`http://localhost:5000/api/card/filter/${id}`)
      console.log('returning filtered list', res.data)
      onClose();
      // onCardSaved();
      handleFetchData();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="row">
      <h4
        onClick={() => {
          handleArchive();
        }}
      >
        Archive this card
      </h4>
      <span>
        <BiArchive
          onClick={() => {
            handleArchive();
          }}
        />
      </span>
    </div>
  );
};

export default ArchiveCard;
