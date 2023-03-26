import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import axios from 'axios'
import './CardPopup.css'


// Close out modal or redirect user back to their board screen? 
const DeleteCard = ({ id }) => {

  const handleDelete = async () => {
    console.log('Deleting card')
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.delete(
        `http://localhost:5000/api/card/${id}`,
        
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      console.log('deleting', data);
      // onCardSaved();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="row">
      <h4>Delete this card</h4>
      <span><RiDeleteBin6Line onClick={handleDelete}/></span>
    </div>
  )
}

export default DeleteCard