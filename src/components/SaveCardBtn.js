import React from "react";
import axios from "axios";

const SaveCardBtn = ({ listId, input, onCardSaved, id, handleFetchData, onClose }) => {

  const handleSave = async (e, id) => {
    console.log("saving card", e.target.value);

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
      onCardSaved();
      handleFetchData();
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
