import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Logout.css"; 

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    alert("User logged out");
    navigate("/login");
  };

  return (
    <div>      
      <Navbar/>
    </div>
  );
};
export default Logout;
