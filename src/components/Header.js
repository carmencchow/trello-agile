import "./Header.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Navbar from "./Navbar";

function Header() {
  return (
    <div>
      <Navbar/>
      <div className="header">
        Trello header wide that spread the top of the whole screen!
      </div>
      <div className="login-btn-layout">
        <Button component={Link} to="/login" variant="contained">
          Log In
        </Button>
      </div>
    </div>
  );
}

export default Header;
