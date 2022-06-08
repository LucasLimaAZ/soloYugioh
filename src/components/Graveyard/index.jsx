import React from "react";
import "./style.scss";

const Graveyard = (props) => {
  return (
    <div className="graveyard-wrapper">
      <b>Graveyard({props.graveyardList.length}): </b>
      {props.graveyardList?.map((card, index) => (
        <div key={index}>{card}</div>
      ))}
    </div>
  );
};

export default Graveyard;
