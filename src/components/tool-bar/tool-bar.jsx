import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import {
  ChangeCircle,
  Casino,
  Description,
  Settings,
} from "@mui/icons-material";
import EnemyTurn from "../enemy-turn/enemy-turn";
import { useToolBar } from "./use-tool-bar";
import SettingsModal from "../modals/settings/settings";
import PlayerFieldInfo from "../modals/player-field-info/player-field-info";

const ToolBar = () => {
  const {
    coin,
    dice,
    selectedCard,
    handleDice,
    handleCoin,
    isOpenSettings,
    handleOpenSettings,
    handleCloseSettings,
    isPlayerMonstersModalOpen,
    setIsPlayerMonstersModalOpen,
  } = useToolBar();

  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Grid container>
          <Grid item xs={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="16px"
            >
              <Box>
                <SettingsModal
                  handleCloseSettingsModal={handleCloseSettings}
                  openSettingsModal={isOpenSettings}
                />
                <IconButton color="inherit" onClick={handleOpenSettings}>
                  <Settings />
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
            xs={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            item
          >
            <Button
              sx={{ color: "white" }}
              variant="outlined"
              onClick={() => setIsPlayerMonstersModalOpen(true)}
            >
              Player monsters
            </Button>
          </Grid>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            item
            xs={4}
          >
            <Description />
            <Typography fontSize="11px" paddingLeft="5px">
              {selectedCard?.desc || "Card description"}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
      <PlayerFieldInfo
        open={isPlayerMonstersModalOpen}
        onClose={() => setIsPlayerMonstersModalOpen(false)}
      />
    </AppBar>
  );
};

export default ToolBar;
