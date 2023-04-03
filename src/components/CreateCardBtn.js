import React from "react";
import axios from "axios";

const CreateCardBtn = ({ listId, input, onCardSaved, id, handleFetchData, onClose }) => {

  const handleCreate = async (e, id) => {
    console.log("saving board", e.target.value);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `http://localhost:5000/api/board`,
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
      onCardSaved();
      handleFetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button className="save" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
};

export default CreateCardBtn;
