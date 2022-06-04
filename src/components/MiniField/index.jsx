import React from "react";
import CardBackIMG from "../../assets/img/yugioh-back.jpg";

const MiniField = (props) => {
  return (
    <>
      <div className="flex">
        <img
          className={`mini-card ${props.cardIndex === 6 ? "selected" : ""}`}
          src={CardBackIMG}
          alt="mini-card"
        />
        <img
          className={`mini-card ${props.cardIndex === 7 ? "selected" : ""}`}
          src={CardBackIMG}
          alt="mini-card"
        />
        <img
          className={`mini-card ${props.cardIndex === 8 ? "selected" : ""}`}
          src={CardBackIMG}
          alt="mini-card"
        />
        <img
          className={`mini-card ${props.cardIndex === 9 ? "selected" : ""}`}
          src={CardBackIMG}
          alt="mini-card"
        />
        <img
          className={`mini-card ${props.cardIndex === 10 ? "selected" : ""}`}
          src={CardBackIMG}
          alt="mini-card"
        />
      </div>
      <div className="flex">
        <img className="mini-card" src={CardBackIMG} alt="mini-card" />
        <img className="mini-card" src={CardBackIMG} alt="mini-card" />
        <img className="mini-card" src={CardBackIMG} alt="mini-card" />
        <img className="mini-card" src={CardBackIMG} alt="mini-card" />
        <img className="mini-card" src={CardBackIMG} alt="mini-card" />
      </div>
    </>
  );
};

export default MiniField;
