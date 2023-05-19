import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faTwitch, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../pages/auth_pages/auth_context";
import { useHistory } from "react-router-dom";

function NavBar() {
  const { loggedIn, logout } = useContext(AuthContext);
  console.log(loggedIn)
  const history = useHistory();

  const handleLogout = () => {
    // Perform logout actions
    localStorage.removeItem('token');
    logout();
    history.push("/home");
  };


  return (
    <div className="nav_bg">
      <div className="nav_bar_wrapper">
        <div className="icon_wrapper"></div>
        <div className="btn_wrapper">
          <div className="user_btns">
            <Link to="/home" className="nav_btn">Home</Link>
            <Link to ="/about" className="nav_btn">About</Link>
            <Link to="/portfolio" className="nav_btn">Portfolio</Link>
            <Link to="/contact" className="nav_btn">Contact</Link>
          </div>
          {loggedIn && (
            <div className="edit_btns">
              <Link to="/edit_home" className="nav_btn">Edit Home</Link>
              <Link to="/edit_about" className="nav_btn">Edit About</Link>
              <Link to="/edit_portfolio" className="nav_btn">Edit Portfolio</Link>
              <Link to="/edit_contact" className="nav_btn">Edit Contact</Link>
            </div>
          )}
        </div>
        <div className="socials_wrapper">
          <div onClick={() => window.open("https://www.youtube.com/@TheHonestClimb", "_blank")} className="social"><FontAwesomeIcon icon={faYoutube} size="2x" /></div>
          <div onClick={() => window.open("https://www.twitch.tv/thehonestclimb", "_blank")} className="social"><FontAwesomeIcon icon={faTwitch} size="2x" /></div>
          <div onClick={() => window.open("https://www.tiktok.com/@thehonestclimb", "_blank")} className="social"><FontAwesomeIcon icon={faTiktok} size="2x" /></div>
        </div>
        {loggedIn && (
        <button onClick={handleLogout} className="nav_btn">Logout</button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
