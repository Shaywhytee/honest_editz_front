import React, { Component, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faVideo, faUpload } from '@fortawesome/free-solid-svg-icons'
import { ContentContext } from "../helpers/content_provider";

function Home() {
  const contentData = useContext(ContentContext);
  const heroText = contentData.find((item) => item.name === 'heroText')
  const spotlightVideo = contentData.find((item) => item.name === 'spotlightVideo');
  const steps = contentData.find((item) => item.name === 'steps');
  const step1 = contentData.find((item) => item.name === 'step1');
  const step2 = contentData.find((item) => item.name === 'step2');
  const step3 = contentData.find((item) => item.name === 'step3');

  if(!heroText || !spotlightVideo || !steps || !step1 || !step2 || !step3) {
    return null
  }

  return (
    <div className="home_container">
      <div className="hero_text_wrapper">
        <h2>Elavate your Content</h2>
        <h1>{heroText.title}</h1>
        <p>{heroText.content}</p>
      </div>
      <button className="contact_btn">Contact now</button>
      <div className="video_sample">
        <h1>{spotlightVideo.title}</h1>
        <iframe
          width="560"
          height="315"
          src= {spotlightVideo.link}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="steps_wrapper">
        <h1>{steps.title}</h1>
        <div className="steps_options">
          <div className="step">
            <h1>{step1.title}</h1>
            <FontAwesomeIcon icon={faMessage} color="rgba(55,55,55,1)" size="4x"/>
          </div>
          <div className="step">
            <h1>{step2.title}</h1>
            <FontAwesomeIcon icon={faVideo} color="rgba(55,55,55,1)" size="4x"/>
          </div>
          <div className="step">
            <h1>{step3.title}</h1>
            <FontAwesomeIcon icon={faUpload} color="rgba(55,55,55,1)" size="4x"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
