import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import { More, ChangeCircle, Casino } from "@mui/icons-material";
import EnemyTurn from "../enemyActions/attack";

const ToolBar = (props) => {
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
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Box
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="space-around"
        >
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={handleCoin}
              color="inherit"
              aria-label="open drawer"
            >
              <ChangeCircle />
            </IconButton>
            <Typography>Coin: {coin}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleDice} color="inherit">
              <Casino />
            </IconButton>
            <Typography>Dice: {dice}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <EnemyTurn />
            <Typography>Enemy turn</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
