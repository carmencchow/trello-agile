import React, { useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import Navbar from "./Navbar";
import "./Templates.css";

const Templates = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const { handleFetchData, boardId } = useContext(DataContext);

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
    "background12.jpg",
  ];

  // const getUserProfile = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     throw new Error("No token found in localStorage");
  //   }
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/user/me");
  //     setUserInfo(res.data);
  //     console.log(
  //       "Displaying user boards:",
  //       res.data.boards.map((board) => {
  //         return board._id;
  //       })
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const onChangeBackground = async () => {
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
      console.log(`changing background to ${backgroundImage}`);
      const data = res.data;
      console.log(data);
      handleFetchData();
      // getUserProfile();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="templates-container">
      <Navbar />
      <h3>Change board template</h3>
      <div className="templates-grid">
        {images.map((image, index) => (
          <div key={images.index}>
            <img
              src={require(`../assets/${image}`)}
              alt="background"
              onClick={() => {
                console.log(`changing color ${image}`);
                setBackgroundImage(`${image}`);
                onChangeBackground();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
