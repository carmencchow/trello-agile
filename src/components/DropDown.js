import React, { useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import Navbar from "./Navbar";
import "./DropDown.css";

const DropDown = () => {
  const { boardId } = useContext(DataContext);
  const [backgroundImage, setBackgroundImage] = useState("");

  const images = [
    "background1.jpg",
    "background2.jpg",
    "background3.jpg",
    "background4.jpg",
    "background5.jpg",
    "background6.jpg",
    "background7.jpg",
    "background8.jpg",
    "background9.jpg",
    "background10.jpg",
    "background11.jpg",
    "background13.jpg",
    "background14.jpg",
    "background15.jpg",
    "background16.jpg",
  ];

  const onChangeBackground = async (backgroundImage) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.put(
        `http://localhost:5000/api/board/${boardId}/background`,
        {
          background: `${backgroundImage}`,
        },
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Selected background:',  ${backgroundImage}`);
      console.log(res);
      const data = res.data;
      console.log("Data is:", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="DropDown-container">
      <Navbar />
      <h3>Change board template</h3>
      <div className="DropDown-grid">
        {images.map((image, index) => (
          <div key={images.index}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/${image}`}
              alt="background"
              onClick={() => {
                console.log(`changing color ${image}`);
                setBackgroundImage(`${image}`);
                onChangeBackground(image);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
