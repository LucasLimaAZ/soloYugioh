import React from "react";
import "./style.scss";
import CardIMG from "../../assets/img/yugioh-back.jpg";

const Deck = (props) => {
  const cardsPercentage = `${(100 * props.remainingCards) / 40}%`;

  return (
    <>
      <div className="deck-wrapper">
        <img src={CardIMG} alt="deckcard" />
        <img src={CardIMG} alt="deckcard" />
        <img src={CardIMG} alt="deckcard" />
        <img src={CardIMG} alt="deckcard" />
        <div style={{ width: cardsPercentage }} className="remaining-cards">
          {props.remainingCards}
        </div>
      </div>
    </>
  );
};

export default Deck;
