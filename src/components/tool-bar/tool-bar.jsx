import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import {
  ChangeCircle,
  Casino,
  Description,
  ScreenRotation,
} from "@mui/icons-material";
import EnemyTurn from "../enemy-turn/enemy-turn";
import { useToolBar } from "./use-tool-bar";

const ToolBar = () => {
  const {
    coin,
    dice,
    selectedCard,
    handleDice,
    handleCoin,
    handleRotateBoard,
  } = useToolBar();

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
                  onClick={handleRotateBoard}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <ScreenRotation />
                </IconButton>
              </Box>
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
                <Typography>Opponent turn</Typography>
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
            <Typography fontSize="11px" paddingLeft="5px">
              {selectedCard?.desc || "Card description"}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
