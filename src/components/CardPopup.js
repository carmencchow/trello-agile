import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrFormClose } from "react-icons/gr";
import { FiEdit2 } from 'react-icons/fi'
import "./CardPopup.css";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";
import ArchiveCard from './ArchiveCard';
import SaveCommentBtn from "./SaveCardBtn";

const CardPopup = ({ open, onClose, id, handleFetchData, listId }) => {
  const [comment, setComment] = useState('')
  const [color, setColor] = useState("green");
  const [cardData, setCardData] = useState(null);
  const [openInput, setOpenInput] = useState(false);
  
  const colorArr = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "brown",
  ];

  const handleInput = (e) => {
    setComment(e.target.value);
  };
  
  const handleCardSaved = () => {
    setComment("");
  };



  // Display card modal info
  const getCard = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/card/${id}`);
    console.log("Card Info: ", res.data);
    setCardData(res.data);
  };
  useEffect(() => {
    getCard(id);
  }, [id]);


  if (!open || cardData === null) return null;

  return (
    <div className="card-background">
      <div className="card-popup">
        <div>
          <div className="card-popup-heading" style={{ backgroundColor: color }}>
            <h2>{cardData.card.title} </h2>
            <div className="right-side">
              <GrFormClose className="close" onClick={onClose} />
            </div>
          </div>

          <div className="card-content">
          <p>Click a square to change the background color</p>

            <div className="color-row"> 
              {colorArr.map((color) => {
                return (
                  <span
                    className={`${color}`}
                    onClick={() => setColor(`${color}`)}
                  ></span>
                );
              })}
            </div>

            <div className="options">
              <p>Label: {cardData.card.labels}</p>
              <p>Activity: </p>

              <div className="activity">
                <div className="comment-container">
                  <div className="initials">{cardData.card.members}</div>
                  <input 
                    type="text" 
                    value={comment}
                    className="comments-input"
                    placeholder="Write a comment"
                    onChange={handleInput}
                  />
                  <SaveCommentBtn
                    input={comment}
                    listId={listId}
                    onCardSaved={handleCardSaved}
                    id={id}
                    handleFetchData={handleFetchData}
                  />
                </div>



              </div>

              <p className="archive">
                <ArchiveCard
                  handleFetchData={handleFetchData}
                  id={id}
                  onClose={onClose}
                />
              </p>

            <div className="edit">
              <EditCard
                open={openInput}
                listId={listId}
                id={id}
                handleFetchData={handleFetchData}
                onClose={onClose}
              />

                {!openInput ? (
                  <h4 className="edit-card" onClick={() => {
                      setOpenInput(true);
                    }}> Edit this card <FiEdit2/></h4>
                  ) : (
                    <div></div>
                  )}
              </div>
            </div>

              <p className="delete">
                <DeleteCard
                  handleFetchData={handleFetchData}
                  id={id}
                  onClose={onClose}
                />
              </p>

              <p>View members{cardData.card.members}</p>
  
            </div>
          </div>
     
      </div>
    </div>

  );
};

export default CardPopup;
