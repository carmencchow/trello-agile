import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../utils";
import Navbar from "../components/Navbar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "../index.css";
import "./Starred.css";

const Starred = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      // const res = await axios.get(`${server}` + "/api/user/me");
      const res = await axios.get(
        "https://trello-agile-project.onrender.com/api/user/me"
      );
      console.log(res.data);
      setUserInfo(res.data.boards.filter((board) => board.isStarred === true));
    } catch (error) {
      throw error;
    }
  };

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
    console.log("Board:", id);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="starred-container">
      <Navbar />
      {userInfo && (
        <div className="starred-heading">
          <StarBorderIcon />
          Starred Boards
          <div className="boards-parent-container">
            {userInfo.length > 0 ? (
              userInfo.map((board, index) => {
                return (
                  <div key={board._id} className="boards-container">
                    <div
                      className="boards"
                      onClick={() => goToBoard(board._id)}
                      style={{
                        backgroundImage: `url(${
                          "/assets/" + board.background
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        height: "170px",
                        width: "230px",
                      }}
                    >
                      <h5 className="title">{board.title}</h5>
                    </div>
                  </div>
                );
              })
            ) : (
              <p></p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Starred;
