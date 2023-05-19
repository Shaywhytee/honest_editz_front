import React, { useState } from "react";
import HonestDragon from "./Honest-Dragon.png"
import ThievesJersey from "./Thieves-Jersey.png"
import EditSupreme from "./Edit-Supreme.png"

function CardDeck() {

  const[activeCardIndex, setActiveCardIndex] = useState(0)
  const cardData = [
    {image: HonestDragon},
    {image: EditSupreme},
    {image: ThievesJersey},
  ];
  
  const handlNextCard = () => {
    setActiveCardIndex((prevIndex => (prevIndex + 1) % cardData.length))
  }
  
  const handlPrevCard = () => {
    setActiveCardIndex((prevIndex => (prevIndex - 1 + cardData.length) % cardData.length))
  }
  return(
    <div className="deck_wrapper">
    <button onClick={handlPrevCard}>&#8249;</button>
    <div className="deck">
      {cardData.map((card, index) => (
        <div key={index} className={`card ${index === activeCardIndex ? "active" : ""}`}>
          <img src={card.image} alt={`Card ${index +1}`} />
        </div>
      ))}
    </div>
    <button onClick={handlNextCard}>&#8250;</button>
  </div>
  )
}
export default CardDeck