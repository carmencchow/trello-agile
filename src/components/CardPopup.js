
import React, { useState, useEffect } from 'react'
import { GrFormClose } from 'react-icons/gr'
import './CardPopup.css'
import axios from 'axios'
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteCard from './DeleteCard'
import EditCard from './EditCard'

const CardPopup = ({ open, onClose, _id, handleFetchData }) => {
  const [color, setColor] = useState("green")
  const [cardData, setCardData] = useState(null)
  const [removedCard, setRemovedCard] = useState(null)

  const colorArr = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown"]

  // (1) GET card by id 
  const getCard = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/card/${id}`)    
    console.log('Card Info: ', res.data)
    setCardData(res.data)
  }
  useEffect(() =>{
    getCard(_id)
  }, [])

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
  
  // Archive list, get list from db and remove from view
  const handleArchive = async (id) => {
    const card = await axios.get(`http://localhost:5000/api/card/${id}`)
    setRemovedCard(card.data)
    console.log('Archiving card')

    // Close modal

    // Get request to server, return all cards except archived one


  }

  // Edit
  const handleEdit = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/card/${id}`)    
    console.log('Editing', res.data)
    setCardData(res.data)
  }

  if(!open || cardData === null) return null;


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
              {colorArr.map((color) => {
                return (
                  <span className={`${color}`} onClick={() => setColor(`${color}`)}></span>
                )
              })}
            </div>

            <div className="options">
              <p>Label: {cardData.card.labels}</p>
              <p>Activity: </p>
              <p className="archive" onClick={handleArchive}>Archive this card</p>
              <p className="edit"><EditCard/></p>
              <p className="delete"><DeleteCard/></p>
              <p>View members{cardData.card.members}</p>
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
    </div>
  );
};

export default CardPopup;
