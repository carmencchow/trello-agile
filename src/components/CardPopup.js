import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrFormClose } from "react-icons/gr";
import io from "socket.io-client";
import { FiEdit2 } from 'react-icons/fi'
import "./CardPopup.css";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";
import ArchiveCard from './ArchiveCard';


const socket = io.connect("http://localhost:5000");

  

const CardPopup = ({ open, onClose, id, handleFetchData, listId }) => {
  const [color, setColor] = useState("green");
  const [cardData, setCardData] = useState(null);
  const [messageReceived, setMessageReceived] = useState("");
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


  const sendMessage = () => {
    socket.emit("send_message", { message: "hello" });
  };

  useEffect(() => {
    const socket = io.connect("http://localhost:5000");
    socket.on("receive_message", (data) => {
      console.log(data.message);
      setMessageReceived(data.message);
    });
  }, []);

  // (1) GET card by id

  // Display card modal info

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

              <p>{messageReceived}</p>
              <input placeholder="send message"></input>
              <button onClick={sendMessage}>send message</button>
              <p className="archive" onClick={handleArchive}>
                Archive this card
              </p>
              <p className="edit">
                <EditCard />


              <p className="archive">
                <ArchiveCard
                  handleFetchData={handleFetchData}
                  id={id}
                  onClose={onClose}
                />

              </p>

            <div className="input-field">
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
