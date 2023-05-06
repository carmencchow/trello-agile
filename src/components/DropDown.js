import React, { useContext, useRef, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import "./DropDown.css";

const DropDown = ({ onClose }) => {
  const { boardId } = useContext(DataContext);
  const [backgroundImage, setBackgroundImage] = useState("");
  const modalRef = useRef();

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

  const images = [
    "art.jpg",
    "astronaut.jpg",
    "beach.jpg",
    "bubbles.jpg",
    "cairo.jpg",
    "concert.jpg",
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
      console.log("Result:", res);
      const data = res.data;
      console.log("Data:", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dropdown-grid" ref={modalRef}>
      {images.map((image, idx) => (
        <div key={images.idx}>
          <img
            src={require(`../assets/${image}`)}
            // src={`${process.env.PUBLIC_URL}/assets/${image}`}
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
