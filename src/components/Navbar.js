import React, { useState } from "react";
import { MdWallpaper } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { Navbutton } from "./NavButton";
import DropDown from "./DropDown";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);

  const selectOptions = [
    { name: "Workspaces", query: "workspaces" },
    { name: "Starred", query: "starred" },
  ];
  const navigate = useNavigate();

  const handleDropDown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar-layout">
      <div className="logo-style">
        <h1 className="trello-home">
          <Link className="trellify" to="/workspaces">
            Trellify
          </Link>
        </h1>
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
        <div>
          <div className="wallpaper-icon" onClick={handleDropDown}>
            {/* Templates */}
            <MdWallpaper className="wallpaper-icon" size={28} />
          </div>
        </div>
        {dropdown !== false && (
          <DropDown className="dropdown" onClose={() => setDropdown(false)} />
        )}
      </div>

      <div className="logo-style">
        <h1 className="logout-home" onClick={handleLogout}>
          <CiLogout size={28} />
          {/* Logout */}
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
