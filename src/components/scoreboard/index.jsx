import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Paper,
  CardMedia,
  Card,
} from "@mui/material";
import CountUp from "react-countup";
import {
  AddCircleOutline as AddCircleIcon,
  RemoveCircleOutline as RemoveCircleIcon,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";
import { playSound } from "../../shared/helper";
import useLifePoints from "../../shared/hooks/lifePoints";
import lpImage from "../../assets/img/lifepointsBg.png";

const ScoreBoard = () => {
  const [lpInput, setLpInput] = useState(0);
  const [opponentLpInput, setOpponentLpInput] = useState(0);
  const [previousLp, setPreviousLp] = useState(8000);
  const [opponentPreviousLp, setOpponentPreviousLp] = useState(8000);

  const { playerLp, setPlayerLp, opponentLp, setOpponentLp } = useLifePoints();

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
    playSound("start-duel");
  };

  return (
    <Grid container>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "1%",
        }}
      >
        <Grid item xs={5}>
          <Box display="flex" justifyContent="space-around">
            <Button
              onClick={handleAddPlayerLp}
              color="primary"
              variant="contained"
            >
              <AddCircleIcon />
            </Button>
            <TextField
              id="outlined-basic"
              label="You"
              variant="outlined"
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
            <Card>
              <CardMedia sx={{ paddingX: "10px" }} image={lpImage}>
                <Typography
                  sx={{ textShadow: "0 0 2px #000" }}
                  variant="h3"
                  color="yellow"
                  textAlign="center"
                >
                  <CountUp duration={0.875} start={previousLp} end={playerLp} />
                </Typography>
              </CardMedia>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={handleResetDuel}
              color="primary"
              variant="contained"
            >
              <RestartAltIcon />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" justifyContent="space-around">
            <Card>
              <CardMedia sx={{ paddingX: "10px" }} image={lpImage}>
                <Typography
                  sx={{ textShadow: "0 0 2px #000" }}
                  variant="h3"
                  color="yellow"
                  textAlign="center"
                >
                  <CountUp
                    duration={0.875}
                    start={opponentPreviousLp}
                    end={opponentLp}
                  />
                </Typography>
              </CardMedia>
            </Card>
            <Button
              onClick={handleAddOpponentLp}
              color="primary"
              variant="contained"
            >
              <AddCircleIcon />
            </Button>
            <TextField
              id="outlined-basic"
              label="Opponent"
              variant="outlined"
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
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ScoreBoard;
