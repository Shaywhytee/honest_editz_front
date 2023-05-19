import React, { useState, useContext } from "react";
import CardDeck from "./cards/cards";
import { ContentContext } from "../helpers/content_provider";
import Picture1 from "../../../static/images/100t.jpg";
import Picture2 from "../../../static/images/alex_computer_shot.jpg";
import Picture3 from "../../../static/images/alex_jersey.jpg";



function About() {
  const contentData = useContext(ContentContext);
  const textBox1 = contentData.find((item) => item.name === 'textBox1');
  const textBox2 = contentData.find((item) => item.name === 'textBox2');
  const textBox3 = contentData.find((item) => item.name === 'textBox3');
  const pictureBox1 = contentData.find((item) => item.name === 'pictureBox1');
  const pictureBox2 = contentData.find((item) => item.name === 'pictureBox2');
  const pictureBox3 = contentData.find((item) => item.name === 'pictureBox3');

  if(!textBox1 || !textBox2 || !textBox3 || !pictureBox1 || !pictureBox2 || !pictureBox3) {
    return null
  }

  return (
    <div className="about_container">
      <CardDeck />
      <div className="squares">
        <div className="about_square">
          <h1>{textBox1.title}</h1>
          <p>{textBox1.content}</p>
        </div>
        <div className="group_picture">
          <img src={pictureBox1.link}></img>
        </div>
        <div className="gaming_picture">
          <img src={pictureBox2.link}></img>
        </div>
        <div className="about_square">
          <h1>{textBox2.title}</h1>
          <p>{textBox2.content}</p>
        </div>
        <div className="about_square">
          <h1>{textBox3.title}</h1>
          <p>{textBox3.content}</p>
        </div>
        <div className="jersey_picture">
          <img src={pictureBox3.link}></img>
        </div>
      </div>
    </div>
  )
}

export default About