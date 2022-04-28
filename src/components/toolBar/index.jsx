import React, { useState } from "react";
import { Button } from "@mui/material";
import { Casino, ChangeCircle } from "@mui/icons-material";
import EnemyTurn from "../enemyActions/attack";
import "./style.scss";

const ToolBar = () => {
  const [coin, setCoin] = useState("Heads");
  const [dice, setDice] = useState("6");

  const handleDice = () => {
    setDice("Rolling...");
    setTimeout(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
    }, 400);
  };

  const handleCoin = () => {
    let result = Math.floor(Math.random() * 2) + 1;

    if (result === 1) {
      setCoin("Flipping...");
      setTimeout(() => {
        setCoin("Heads");
      }, 400);
    } else {
      setCoin("Flipping...");
      setTimeout(() => {
        setCoin("Tails");
      }, 400);
    }
  };

  return (
    <>
      <div className="toolbar-container">
        <div className="buttonContent">
          <Button onClick={handleDice} color="primary" variant="contained">
            <Casino />
          </Button>
          <b className="toolbar-outside-info">Dice: {dice}</b>
        </div>
        <div className="buttonContent">
          <Button onClick={handleCoin} color="primary" variant="contained">
            <ChangeCircle />
          </Button>
          <b className="toolbar-outside-info">Coin: {coin}</b>
        </div>
        <div className="buttonContent">
          <EnemyTurn />
          <b className="toolbar-outside-info">Enemy Turn</b>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
