import React from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Autocomplete,
} from "@mui/material";
import CountUp from "react-countup";
import {
  AddCircleOutline as AddCircleIcon,
  RemoveCircleOutline as RemoveCircleIcon,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";
import { useScoreBoard } from "./use-scoreboard";

const ScoreBoard = () => {
  const {
    handleResetDuel,
    handleOpponentInputChange,
    handleOpponentOptionChange,
    handleLpOptionChange,
    handleLpInputChange,
    handleSubtractOpponentLp,
    handleAddOpponentLp,
    handleSubtractPlayerLp,
    handleAddPlayerLp,
    damageOptions,
    previousLp,
    opponentPreviousLp,
    opponentLp,
    playerLp,
  } = useScoreBoard();

  return (
    <Paper
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.2);",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "1%",
      }}
    >
      <Box display="flex" justifyContent="space-around">
        <Button onClick={handleAddPlayerLp} color="primary" variant="contained">
          <AddCircleIcon />
        </Button>
        <Autocomplete
          sx={{ minWidth: "15vw" }}
          options={damageOptions}
          onInputChange={handleLpOptionChange}
          renderInput={(params) => (
            <TextField
              sx={{
                input: { color: "white" },
                label: { color: "white" },
              }}
              id="outlined-basic"
              label="You"
              variant="filled"
              type="number"
              onChange={handleLpInputChange}
              {...params}
            />
          )}
        />
        <Button
          onClick={handleSubtractPlayerLp}
          color="primary"
          variant="contained"
        >
          <RemoveCircleIcon />
        </Button>
        <Typography
          sx={{
            textShadow: "0 0 2px #000",
            marginY: "auto",
            paddingX: "5%",
          }}
          color="yellow"
          textAlign="center"
          variant="h4"
        >
          <CountUp duration={0.875} start={previousLp} end={playerLp} />
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button onClick={handleResetDuel} color="primary" variant="contained">
          <RestartAltIcon />
        </Button>
      </Box>
      <Box display="flex" paddingRight="3%">
        <Typography
          sx={{
            textShadow: "0 0 2px #000",
            marginY: "auto",
            paddingX: "5%",
          }}
          color="yellow"
          textAlign="center"
          variant="h4"
        >
          <CountUp
            duration={0.875}
            start={opponentPreviousLp}
            end={opponentLp}
          />
        </Typography>
        <Button
          onClick={handleAddOpponentLp}
          color="primary"
          variant="contained"
        >
          <AddCircleIcon />
        </Button>
        <Autocomplete
          sx={{ minWidth: "15vw" }}
          options={damageOptions}
          onInputChange={handleOpponentOptionChange}
          renderInput={(params) => (
            <TextField
              sx={{
                input: { color: "white" },
                label: { color: "white" },
              }}
              id="outlined-basic"
              label="Opponent"
              variant="filled"
              type="number"
              onChange={handleOpponentInputChange}
              {...params}
            />
          )}
        />

        <Button
          onClick={handleSubtractOpponentLp}
          color="primary"
          variant="contained"
        >
          <RemoveCircleIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default ScoreBoard;
