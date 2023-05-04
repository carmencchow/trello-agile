import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbutton } from "./NavButton";

const Navbar = () => {
  const selectOptions = [
    { name: "Workspaces", query: "workspaces" },
    { name: "Recent", query: "workspaces" },
    { name: "Starred", query: "workspaces" },
    { name: "Templates", query: "templates" },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("User logged out");
    navigate("/login");
  };

  return (
    <div className="navbar-layout">
      <div className="logo-style">
        <h1 className="trello-home">Trello</h1>
      </div>
      <div className="option-placement">
        {selectOptions.map((option) => {
          return (
            <Link
              className="link-style"
              key={option.name}
              to={`/${option.query}`}
            >
              <Navbutton
                className="navbutton-style"
                key={option.name}
                option={option.name}
              />
            </Link>
          );
        })}
      </div>

      <div className="logo-style">
        <h1 className="logout-home" onClick={handleLogout}>
          Logout
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
