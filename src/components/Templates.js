import React, { useContext, useState } from "react";
import axios from "axios";
import { api } from "../utils";
// import { server } from "../utils";
import { DataContext } from "../context/DataContext";
import Navbar from "./Navbar";
import "./Templates.css";

const Templates = () => {
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
      const res = await api.put(
        `/board/${boardId}/background`,
        // `${server}/api/board/${boardId}/background`,
        {
          background: `${backgroundImage}`,
        },
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
    } catch (err) {}
  };

  return (
    <div className="templates-container">
      <Navbar />
      <h3>Change board template</h3>
      <div className="templates-grid">
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

export default Templates;
