import React from "react";
import Navbar from "./Navbar";
import Board from "./Board";

const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
        <div>
          <h1>Home</h1>
          <Board />
        </div>
      </div>
    </div>
  );
};

export default Home;
