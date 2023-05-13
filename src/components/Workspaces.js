import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../utils";
import AddBoard from "./AddBoard";
import Navbar from "./Navbar";
import "./Workspaces.css";

const Workspaces = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get(`${server}` + "/api/user/me");
      console.log("Res", res);
      console.log("Display boards", res.data);
      setUserInfo(res.data.boards);
      setUserInfo(res.data.boards.filter((board) => !board.isStarred));
      setName(res.data.username);
      setEmail(res.data.email);
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
    <div>
      <Navbar />
      <h3 className="greeting">
        👋 Hi, <strong>{name}!</strong>
      </h3>
      {userInfo && (
        <div className="greeting">
          <div className="boards-parent-container">
            {userInfo.length > 0 ? (
              userInfo.map((board, index) => {
                return (
                  <div key={board._id} className="boards-container">
                    <div
                      onClick={() => goToBoard(board._id)}
                      className="boards"
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
          <h3 className="heading"> Create a board:</h3>
          <div className="container">
            <div className="newboard">
              <AddBoard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspaces;
