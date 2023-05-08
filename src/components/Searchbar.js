import React, { useState, useContext } from "react";
import "./Searchbar.css";
import { DataContext } from "../context/DataContext";

import axios from "axios";

const Searchbar = () => {
  const [userEmail, setUserEmail] = useState("");
  const { boardId } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.put(
        `http://localhost:5000/api/board/${boardId}/addmember`,
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
      setUserEmail("");
      // handleFetchData();
      // getCard(cardId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search-member"
        type="text"
        value={userEmail}
        placeholder="Find a member"
        onChange={(e) => setUserEmail(e.target.value)}
      ></input>
    </form>
  );
};

export default Searchbar;
