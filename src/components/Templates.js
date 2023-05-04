import React from "react";
import "./Templates.css";

const Templates = () => {
  const backgrounds = [
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

  return (
    <div className="templates-container">
      <h1>Templates</h1>
      <h3>Change board template</h3>
      <div className="templates-grid">
        {backgrounds.map((item, index) => (
          <div key={backgrounds.index}>
            <img src={require(`../assets/${item}`)} alt="background" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
