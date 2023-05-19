import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faTwitch, faTiktok } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <div className="footer_bg">
      <div className="footer_wrapper">
        <div className="icon_wrapper"></div>
        <div className="links_wrapper">

          <div className="btn_wrapper">
            <button className="home_btn">Home</button>
            <button className="about_btn">About</button>
            <button className="portfolio_btn">Portfolio</button>
            <button className="contact_btn">Contact</button>
          </div>
          <div className="socials_wrapper">
          <div onClick={() => window.open("https://www.youtube.com/@TheHonestClimb", "_blank")} className="social"><FontAwesomeIcon icon={faYoutube} size="2x" /></div>
          <div onClick={() => window.open("https://www.twitch.tv/thehonestclimb", "_blank")} className="social"><FontAwesomeIcon icon={faTwitch} size="2x" /></div>
          <div onClick={() => window.open("https://www.tiktok.com/@thehonestclimb", "_blank")} className="social"><FontAwesomeIcon icon={faTiktok} size="2x" /></div>
          </div>
        </div>
        <div className="copyright">
          <p>2023 all right reservered</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;