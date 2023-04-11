import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'
import { BiArchive } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { GoThreeBars } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi"; 
import { BsFolder2 } from "react-icons/bs";
import { DataContext } from '../context/DataContext'
import SaveCommentBtn from "./SaveCommentBtn";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";
import "./CardPopup.css";

const CardPopup = ({ open, onClose }) => {
  const [color, setColor] = useState('');
  const [openInput, setOpenInput] = useState(false);
  const { listId, handleFetchData,
  cardId, cardData, comment, setComment, archiveBtn, setArchiveBtn, 
  } = useContext(DataContext)

  const colorArr = [
    "orangered",
    "orange",
    "yellow",
    "lightgreen",
    "lightskyblue",
    "plum",
    "pink",
    "burlywood",
    "white",
  ];

  const toggleArchive = async () => {
    try {
      console.log('Toggling archive')
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(`Archiving card, ${listId}`)
      const res = await axios.get(`http://localhost:5000/api/card/archive/${listId}/`)
      console.log(res.data.card.title, res.data.card.status)
      toast.success(`Card is now archived`)
      setArchiveBtn(!archiveBtn)
      handleFetchData();
    } catch (error) {
      console.log(error)
    }
  };

  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };
  
  const clearComment = () => {
    setComment('');
  };

  const handleColorChange = async (e) => {
    e.preventDefault();
    console.log('Change color:', color);
    setColor(color);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.put(
        `http://localhost:5000/api/card/${cardId}/color`,
        { 
          color: `${color}` 
        },
      );
    } catch (err) {
      console.log(err);
    }
  }
  
  if (!open || cardData === null) return null;

  return (
    <div className="card-background">
      <div className="card-popup">
        <div className="card-popup-heading" 
          style={{ backgroundColor: color }}>
          <h2>{cardData.card.title}</h2>
          <div className="right-side">
            <GrFormClose className="close-btn" onClick={onClose} />
          </div>
        </div>

        <div className="card-content">
          <div className="card-right">
            <p className="color-text">
            <BsFolder2 className="card-icon"/>
            Label color</p>
            <p className="color-row">
              {colorArr.map((color) => {
                return (
                  <span id="color-box"
                    className={`${color}`}
                    onClick={() => setColor(`${color}`)}
                  ></span>
                );
              })}
              <button className="change-color" onClick={handleColorChange}>
                Save color
              </button>
            </p>
          </div>

          <div className="options">
            <p className="activity-label"><GoThreeBars className="activity-icon"/>Activity: </p>
            <div className="activity">
              <input 
                type="text" 
                value={comment}
                className="comments-input"
                placeholder="Write a comment"
                onChange={handleCommentInput}
              />
              <div className="save-comment-btn">
                <div className="save">
                  <SaveCommentBtn
                    input={comment}
                    listId={listId}
                    // clearComment={clearComment}
                    id={cardId}
                  />
                </div>
              </div>
            </div>

            <div className="comment-container">
            {comment ? <h5>Comments:</h5> : null}
              {cardData.card.comments.map((comment) => {
                console.log(comment)
                return (
                  <div className="comments">
                    <p className="displayed-comments">{comment}</p>
                  </div>
                  )
                })}
            </div>
          </div>

          <div className="edit">
            <EditCard
              open={openInput}
              listId={listId}
              id={cardId}
              onClose={onClose}
            />

            {!openInput ? (
              <h4 className="edit-card" onClick={() => {
                  setOpenInput(true);
                }}>
                  <span className="edit-icon"><FiEdit2 /></span> Edit this card 
              </h4>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className="bottom-buttons">
          <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
          <span onClick={toggleArchive} className="archive-card"><BiArchive className="archive-icon"/> 
            {archiveBtn ? "Archive card" : "Unarchive card" }
          </span>

          <p className="delete-card">
            <DeleteCard
              id={cardId}
              onClose={onClose}
            />
          </p>
        </div>
        </div>
      </div>
    );
  };

export default CardPopup;
