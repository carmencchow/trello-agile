import React, { useState } from "react";
import axios from "axios";

const SaveColorBtn = ({ color, id, onColorSave, handleFetchData }) => {

  const handleColorChange = async (e) => {
    console.log("change color to:", color);

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
      console.log(data);
      onColorSave();
      handleFetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="save-row"> 
      <h4 className="save" onClick={handleColorChange}>
        Save
      </h4>
    </div>
  );
};

export default SaveColorBtn;
