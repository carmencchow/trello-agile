import React, { useContext, useRef, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../utils";
import { DataContext } from "../context/DataContext";
import "./DropDown.css";

const DropDown = ({ onClose }) => {
  const { boardId, handleFetchData } = useContext(DataContext);
  const [backgroundImage, setBackgroundImage] = useState("");
  const modalRef = useRef();

  const images = [
    "art.jpg",
    "astronaut.jpg",
    "beach.jpg",
    "bubbles.jpg",
    "cairo.jpg",
    "concert.jpg",
    "gym.jpg",
    "ice.jpg",
    "japan.jpg",
    "lavenderfield.jpg",
    "leaves.jpg",
    "lizard.jpg",
    "mountains.jpg",
    "nycity.jpg",
  ];

  const onChangeBackground = async (backgroundImage) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.put(
        // `${server}/api/board/${boardId}/background`,
        `https://trello-agile-project.onrender.com/api/board/${boardId}/background`,
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
      const data = res.data;
      handleFetchData();
      console.log("Data:", data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="dropdown-grid" ref={modalRef}>
      {images.map((image, idx) => (
        <div key={images.idx}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/${image}`}
            alt="backgroundimage"
            onClick={() => {
              console.log(`changing background to ${image}`);
              setBackgroundImage(`${image}`);
              onChangeBackground(image);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DropDown;
