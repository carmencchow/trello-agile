import React from "react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchData } from "../store";
import "./SaveCardBtn.css";
import axios from "axios";
import { useState } from "react";

const SaveCardBtn = ({ listId, input, onCardSaved, id }) => {
  const [card, setCard] = useState(input);
  // const [value, setValue] = useState(input);
  // const dispatch = useDispatch();
  // const fetchCards = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       throw new Error("No token found in localStorage");
  //     }
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     const res = await axios.get(`http://localhost:5000/api/card/`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSave = async (e) => {
    console.log("saving card", e.target.value);
    // setInput(e.target.value);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `http://localhost:5000/api/card/?listId=${listId}`,
        { title: `${input}` },

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      console.log(data);
      // dispatch(fetchData({ id: id }));
      onCardSaved(setCard());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button className="save" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default SaveCardBtn;
