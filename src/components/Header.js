import "./Header.css";
import Navbar from "./Navbar";

function Header() {
  return (
    <div>
      <Navbar />
      <div className="header">
        Trello header wide that spread the top of the whole screen!
      </div>
    </div>
  );
}

export default Header;
