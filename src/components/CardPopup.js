import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GrFormClose } from "react-icons/gr";
import { GoThreeBars } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi"; 
import { BsFolder2 } from "react-icons/bs";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";
import ArchiveCard from "./ArchiveCard";
import SaveCommentBtn from "./SaveCommentBtn";
import EditCommentBtn from "./EditCommentBtn";
import DeleteCommentBtn from "./DeleteCommentBtn";
import "./CardPopup.css";
// const socket = io.connect("http://localhost:5000");
// import io from "socket.io-client";

const CardPopup = ({ open, onClose, id, handleFetchData, listId }) => {
  const [comment, setComment] = useState('')
  const [color, setColor] = useState('');
  const [cardData, setCardData] = useState(null);
  const [openInput, setOpenInput] = useState(false);
  // const [messageReceived, setMessageReceived] = useState("");

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

  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };
  
  const clearComment = () => {
    setComment('');
  };

  const handleColorChange = async (e) => {
    e.preventDefault();
    console.log('New color:', color);
    setColor(color);
    handleFetchData();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.put(
        `http://localhost:5000/api/card/${id}/color`,
        { 
          color: `${color}` 
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
    } catch (err) {
      console.log(err);
    }
  }
  
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
    setCardData(res.data);
  };

  useEffect(() => {
    getCard(id);
  }, [id]);

  useEffect(() => {
    getCard(id);
  }, [color]);

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
            <GrFormClose className="close-btn" onClick={onClose} />
          </div>
        </div>

        <div className="card-content">
          <div className="card-right">
            <p className="color-text">
            <BsFolder2 className="card-icon"/>
            Change label color</p>
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
                    clearComment={clearComment}
                    id={id}
                    getCard={getCard}
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

                    {/* <div className="edit-row">
                      <EditCommentBtn
                        input={comment}
                        listId={listId}
                        // onCommentSaved={handleComment}
                        id={id}
                        handleFetchData={handleFetchData}
                      />
                      <DeleteCommentBtn
                        // input={comment}
                        listId={listId}
                        // onCommentSaved={handleComment}
                        id={id}
                        handleFetchData={handleFetchData}
                      />
                    </div> */}
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
              setOpenInput={setOpenInput} 
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

        <div className="bottom-buttons">
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
      </div>
    );
  };

export default CardPopup;
