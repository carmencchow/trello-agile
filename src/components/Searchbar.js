import React, { useState, useContext } from "react";
import "./Searchbar.css";
import { server } from "./utils";
import { DataContext } from "../context/DataContext";
import SearchIcon from "@mui/icons-material/Search";

import axios from "axios";

const Searchbar = () => {
  const [userEmail, setUserEmail] = useState("");
  const { boardId, handleFetchData, getCard, cardId } = useContext(DataContext);

  const handleSubmit = async (e) => {
    console.log(boardId, userEmail);
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.put(
        `${server}/api/board/${boardId}/addmember`,
        {
          userEmail: `${userEmail}`,
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
      console.log(data);
      handleFetchData();
      getCard(cardId);
      setUserEmail("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <input
        className="search-member"
        type="text"
        value={userEmail}
        placeholder="Find a member"
        onChange={(e) => setUserEmail(e.target.value)}
      ></input>
      <SearchIcon onClick={handleSubmit} className="search" />
    </>
  );
};

export default Searchbar;
