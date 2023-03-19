import React from "react";
import { Link } from "react-router-dom";
import { Navbutton } from "./NavButton";

const Navbar = () => {
  const selectOptions = [
    { name: "Workspaces", query: "workspaces" },
    { name: "Recent", query: "recent" },
    { name: "Starred", query: "starred" },
    { name: "Templates", query: "templates" },
    { name: "Create", query: "create" },
  ];

  return (
    <div className="navbar-layout">
      <div className="logo-style">
        <h1>Trello</h1>
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
    </div>
  );
};

export default Navbar;
