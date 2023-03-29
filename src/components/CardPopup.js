import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrFormClose } from "react-icons/gr";
import { GoThreeBars } from "react-icons/go";
import {  } from "react-icons/gr";
// import io from "socket.io-client";
import { FiEdit2 } from "react-icons/fi";
import "./CardPopup.css";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";
import ArchiveCard from "./ArchiveCard";
import SaveCommentBtn from "./SaveCommentBtn";
import EditCommentBtn from "./EditCommentBtn";
import DeleteCommentBtn from "./DeleteCommentBtn";
// const socket = io.connect("http://localhost:5000");

const CardPopup = ({ open, cards, onClose, id, handleFetchData, listId }) => {
  const [comment, setComment] = useState('')
  const [color, setColor] = useState("green");
  const [cardData, setCardData] = useState(null);
  // const [messageReceived, setMessageReceived] = useState("");
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

  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };
  
  const handleComment = (e) => {
    setComment(e.target.value);;
  };

  // const sendMessage = () => {
  //   socket.emit("send_message", { message: "hello" });
  // };

  // useEffect(() => {
  //   const socket = io.connect("http://localhost:5000");
  //   socket.on("receive_message", (data) => {
  //     console.log(data.message);
  //     setMessageReceived(data.message);
  //   });
  // }, []);

  // (1) GET card by ID and display info in modal
  const getCard = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/card/${id}`);
    console.log("Card Info: ", res.data);
    setCardData(res.data);
  };
  useEffect(() => {
    getCard(id);
  }, [id]);

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);
  // const handleDelete = async () => {
  //   await axios.delete(`http://localhost:5000/api/card/${id}`).then((res) => {
  //     console.log(`Card deleted`);
  //     onClose();
  //   });
  //   handleFetchData();

  if (!open || cardData === null) return null;

  return (
    <div className="card-background">
      <div className="card-popup">
        <div className="card-popup-heading" 
          style={{ backgroundColor: color }}>
          <h2>{cardData.card.title}</h2>
          <div className="right-side">
            <GrFormClose className="close" onClick={onClose} />
          </div>
        </div>

        <div className="card-content">
          <div className="card-right">
            <p className="color-text">Change label color</p>
            <p className="color-row">
              {colorArr.map((color) => {
                return (
                  <span
                    className={`${color}`}
                    onClick={() => setColor(`${color}`)}
                  ></span>
                );
              })}
            </p>
          </div>

          <div className="options">
            <p className="activity-label"><GoThreeBars/>Activity: </p>
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
                    onCommentSaved={handleComment}
                    id={id}
                    handleFetchData={handleFetchData}
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
                    <p>{comment}</p>
                    <div className="edit-row">
                      <EditCommentBtn
                        input={comment}
                        listId={listId}
                        onCommentSaved={handleComment}
                        id={id}
                        handleFetchData={handleFetchData}
                      />
                      <DeleteCommentBtn
                        input={comment}
                        listId={listId}
                        onCommentSaved={handleComment}
                        id={id}
                        handleFetchData={handleFetchData}
                      />
                    </div>
                  </div>
                  )
                })}
            </div>
          </div>

       
<br></br>
          <div className="edit">
            <EditCard
              open={openInput}
              listId={listId}
              id={id}
              handleFetchData={handleFetchData}
              onClose={onClose}
            />

            {!openInput ? (
              <h4
                className="edit-card"
                onClick={() => {
                  setOpenInput(true);
                }}
              >
                {" "}
                <span className="edit-icon"><FiEdit2 /></span> Edit this card 
              </h4>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <p className="archive-card">
          <ArchiveCard
            handleFetchData={handleFetchData}
            id={id}
            onClose={onClose}
          />
        </p>

        <p className="delete-card">
          <DeleteCard
            handleFetchData={handleFetchData}
            id={id}
            onClose={onClose}
          />
        </p>

        </div>
      </div>
    );
  };

export default CardPopup;
