import "./Header.css";
import Login from "./Login";
import Navbar from "./Navbar";

function Header() {
  return (
    <div>
      <Navbar />
      {/* <div className="header">
        Trello header wide that spread the top of the whole screen!
      </div> */}
      <Login />
    </div>
  );
}

export default Header;
