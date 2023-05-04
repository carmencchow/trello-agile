import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BiArchive, BiCommentDetail } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { FiEdit2 } from "react-icons/fi";
import { BsFolder2, BsChatLeftQuote } from "react-icons/bs";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { DataContext } from "../context/DataContext";
import AddComment from "./AddComment";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";
import "./CardPopup.css";

const CardPopup = ({ openModal, onCloseModal }) => {
  const { handleFetchData, getCard, cardId, cardData } =
    useContext(DataContext);
  const [color, setColor] = useState("");
  const [openInput, setOpenInput] = useState(false);
  const [commentInput, setCommentInput] = useState(false);
  const [archiveBtn, setArchiveBtn] = useState(true);

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
      console.log("Toggling archive");
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.get(
        `http://localhost:5000/api/card/archive/${cardId}/`
      );
      console.log(res.data.card.title, res.data.card.status);
      toast.success(`Card is now archived`);
      setArchiveBtn(!archiveBtn);
      handleFetchData();
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorChange = async (e) => {
    e.preventDefault();
    setColor(color);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.put(
        `http://localhost:5000/api/card/${cardId}/color`,
        {
          color: `${color}`,
        },
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      handleFetchData();
      getCard(cardId);
    } catch (err) {
      console.log(err);
    }
  };

  if (!openModal || cardData === null) return null;

  return (
    <div className="card-background">
      <div className="card-popup">
        <div className="card-popup-heading" style={{ backgroundColor: color }}>
          <h2 className="card-name">
            {cardData.card.title}{" "}
            <FiEdit2
              onClick={() => {
                setOpenInput(true);
              }}
            />
          </h2>
          <EditCard
            openInput={openInput}
            id={cardId}
            setOpenInput={setOpenInput}
          />

          {!openInput ? (
            <h4
              className="editname-card"
              onClick={() => {
                setOpenInput(true);
              }}
            ></h4>
          ) : (
            <div></div>
          )}

          <div className="right-side">
            <GrFormClose className="close-btn" onClick={onCloseModal} />
          </div>
        </div>

        <div className="card-content">
          <div className="card-right">
            <p className="color-text">
              <BsFolder2 className="card-icon" />
              Label color
            </p>
            <p className="color-row">
              {colorArr.map((color) => {
                return (
                  <span
                    id="color-box"
                    className={`${color}`}
                    onClick={() => setColor(`${color}`)}
                  ></span>
                );
              })}

              <button className="color-btn" onClick={handleColorChange}>
                Save
              </button>
            </p>
          </div>

          <div className="options">
            <p className="activity-label">
              <BsChatLeftQuote className="activity-icon" />
              Comments:
            </p>
            <div className="comment-container">
              {cardData.card.comments.map((comment) => {
                return (
                  <div className="comments">
                    <p className="displayed-comments">
                      <RiDoubleQuotesL /> {comment.content} <RiDoubleQuotesR />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="button-row">
            <AddComment
              commentInput={commentInput}
              id={cardId}
              setCommentInput={setCommentInput}
            />

            {!commentInput ? (
              <h4 className="edit-card">
                <span
                  className="edit-icon"
                  onClick={() => {
                    setCommentInput(true);
                  }}
                >
                  <BiCommentDetail />
                  Comment
                </span>
              </h4>
            ) : (
              <div></div>
            )}

            <h4 onClick={toggleArchive} className="edit-card">
              <span className="edit-icon">
                <BiArchive />
                {archiveBtn ? "Archive" : "Unarchive card"}
              </span>
            </h4>

            <DeleteCard id={cardId} onClose={onCloseModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPopup;
