import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { ChangeCircle, Casino, Description } from "@mui/icons-material";
import EnemyTurn from "../enemyTurn";
import useField from "../../shared/hooks/field";

const ToolBar = () => {
  const [coin, setCoin] = useState("Heads");
  const [dice, setDice] = useState("6");
  const { selectedCard } = useField();

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
        <Grid container>
          <Grid item xs={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="16px"
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
          </Grid>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            item
            xs={6}
          >
            <Description />
            <Typography fontSize="9px" paddingLeft="5px">
              {selectedCard?.desc || "Card description"}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
