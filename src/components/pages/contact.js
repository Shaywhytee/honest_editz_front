import React, { useState, useContext } from "react";
import { ContentContext } from "../helpers/content_provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCat, faShieldCat, faFaceLaughSquint, faExplosion } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "./contact_form";


function Contact() {
  const contentData = useContext(ContentContext);
  const contactTitle = contentData.find((item) => item.name === 'contactTitle');
  const newClients = contentData.find((item) => item.name === 'newClients');
  const adSquare1 = contentData.find((item) => item.name === 'adSquare1');
  const adSquare2 = contentData.find((item) => item.name === 'adSquare2');
  const adSquare3 = contentData.find((item) => item.name === 'adSquare3');
  const adSquare4 = contentData.find((item) => item.name === 'asSquare4');
  const discordButton = contentData.find((item) => item.name === 'discordButton');
  const [selectedOption, setSelectedOption] = useState('');
  console.log(contentData)

  if(!contactTitle || !newClients || !adSquare1 || !adSquare2 || !adSquare3 || !adSquare4 || !discordButton) {
    return null
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === 'discord') {
      window.open(discordButton.link, '_blank');
    }
  };

  return (
    <div className="contact_container">
      <div className="title_container">
        <h1>{contactTitle.title}</h1>
        <p>{contactTitle.content}</p>
      </div>
      <div className="new_clients">
        <h1>{newClients.title}</h1>
      </div>
      <div className="ad_squares">
        <div className="ad_square">
          <FontAwesomeIcon icon={faCat} size="4x" />
          <p>{adSquare1.title}</p>
        </div>
        <div className="ad_square">
          <FontAwesomeIcon icon={faShieldCat} size="4x" />
          <p>{adSquare2.title}</p>
        </div>
        <div className="ad_square">
          <FontAwesomeIcon icon={faFaceLaughSquint} size="4x" />
          <p>{adSquare3.title}</p>
        </div>
        <div className="ad_square">
          <FontAwesomeIcon icon={faExplosion} size="4x" />
          <p>{adSquare4.title}</p>
        </div>
      </div>
      <div className="form_wrapper">
        <div className="form_selection">
          <button onClick={() => handleOptionClick('discord')} className={selectedOption === 'discord' ? 'active' : ''}>
            <FontAwesomeIcon icon={faDiscord} size="2x" />
            <p>{discordButton.title}</p>
          </button>
          <button onClick={() => handleOptionClick('email')} className={selectedOption === 'email' ? 'active' : ''}>
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
            <p>Send Email</p>
          </button>
        </div>
        {selectedOption === 'email' && (
          <ContactForm />
        )}
      </div>
    </div>
  );
}

export default Contact;
