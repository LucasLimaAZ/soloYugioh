import React, { useState } from "react";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import CountUp from "react-countup";
import {
  AddCircleOutline as AddCircleIcon,
  RemoveCircleOutline as RemoveCircleIcon,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";
import { playSound } from "../../shared/helper";
import useLifePoints from "../../shared/hooks/lifePoints";
import useField from "../../shared/hooks/field";
import useDeck from "../../shared/hooks/deck";
import useGraveyard from "../../shared/hooks/graveyard";

const ScoreBoard = () => {
  const [lpInput, setLpInput] = useState(0);
  const [opponentLpInput, setOpponentLpInput] = useState(0);
  const [previousLp, setPreviousLp] = useState(8000);
  const [opponentPreviousLp, setOpponentPreviousLp] = useState(8000);

  const { playerLp, setPlayerLp, opponentLp, setOpponentLp } = useLifePoints();
  const { resetField } = useField();
  const { resetDeck } = useDeck();
  const { resetGraveyard } = useGraveyard();

  const handleAddPlayerLp = () => {
    setPreviousLp(playerLp);
    setPlayerLp(Number(playerLp) + Number(lpInput));
  };

  const handleSubtractPlayerLp = () => {
    setPreviousLp(playerLp);
    setPlayerLp(Number(playerLp) - Number(lpInput));
  };

  const handleAddOpponentLp = () => {
    setOpponentPreviousLp(opponentLp);
    setOpponentLp(Number(opponentLp) + Number(opponentLpInput));
  };

  const handleSubtractOpponentLp = () => {
    setOpponentPreviousLp(opponentLp);
    setOpponentLp(Number(opponentLp) - Number(opponentLpInput));
  };

  const handleLpInputChange = (e) => {
    setLpInput(e.target.value);
  };

  const handleOpponentInputChange = (e) => {
    setOpponentLpInput(e.target.value);
  };

  const handleResetDuel = () => {
    setPlayerLp(8000);
    setOpponentLp(8000);
    resetField();
    resetDeck();
    resetGraveyard();
    setTimeout(() => playSound("start-duel"), 1400);
  };

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
        <TextField
          sx={{ input: { color: "white" }, label: { color: "white" } }}
          id="outlined-basic"
          label="You"
          variant="filled"
          type="number"
          onChange={handleLpInputChange}
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
      <Box display="flex" justifyContent="space-around">
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
        <TextField
          sx={{ input: { color: "white" }, label: { color: "white" } }}
          id="outlined-basic"
          label="Opponent"
          variant="filled"
          type="number"
          onChange={handleOpponentInputChange}
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
