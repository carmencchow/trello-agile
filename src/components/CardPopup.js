import React, { useState, useEffect } from "react";
import { GrFormClose } from "react-icons/gr";
import "./CardPopup.css";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CardPopup = ({ open, onClose, id, handleFetchData }) => {
  const [color, setColor] = useState("green");
  const [cardData, setCardData] = useState(null);

  const fetchCardInfo = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/card/${id}`);
    console.log("Card details: ", res.data);
    setCardData(res.data);
  };

  const handleDelete = async () => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   throw new Error("No token found in localStorage");
    // }
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await axios.delete(`http://localhost:5000/api/card/${id}`).then((res) => {
      console.log(`Card deleted`);
      onClose();
    });
    handleFetchData();
  };

  useEffect(() => {
    fetchCardInfo(id);
  }, [id]);

  if (!open || cardData === null) return null;

  return (
    <div className="card-background">
      <div className="card-popup">
        <div>
          <div
            className="card-popup-heading"
            style={{ backgroundColor: color }}
          >
            <h2>{cardData.card.title} </h2>
            <div className="right-side">
              <GrFormClose className="close" onClick={onClose} />
            </div>
          </div>

          <div className="card-content">
            <p>Click to change your color</p>

            <div className="color-row">
              <span className="red" onClick={() => setColor("red")}></span>
              <span
                className="orange"
                onClick={() => setColor("orange")}
              ></span>
              <span
                className="yellow"
                onClick={() => setColor("yellow")}
              ></span>
              <span className="green" onClick={() => setColor("green")}></span>
              <span className="blue" onClick={() => setColor("blue")}></span>
              <span
                className="purple"
                onClick={() => setColor("purple")}
              ></span>
              <span className="pink" onClick={() => setColor("pink")}></span>
              <span className="brown" onClick={() => setColor("brown")}></span>
            </div>

            <p>Description</p>
            <p>Activity</p>
            <p>Archive</p>
            <p>Members{cardData.card.members}</p>
            <div>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPopup;
