import React, { useState } from "react";
import "./style.scss";
import { Button, Grid, TextField } from "@mui/material";
import CountUp from "react-countup";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { playSound } from "../../shared/helper";
import { useLifePoints } from "../../shared/hooks/hooks";

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
    <>
      <Grid className="scoreBoard" container>
        <Grid item xs={5} container className="playerWrapper">
          <Grid className="inputsWrapper" item xs={6}>
            <Button
              onClick={handleAddPlayerLp}
              color="primary"
              className="lpButtons"
              variant="contained"
            >
              +
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
              className="lpButtons"
              variant="contained"
            >
              -
            </Button>
          </Grid>
          <Grid item xs={6}>
            <div className="lifepointsBg">
              <h1>
                <CountUp duration={0.875} start={previousLp} end={playerLp} />
              </h1>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={2} className="resetDuel">
          <Button
            onClick={handleResetDuel}
            color="primary"
            className="resetDuelButton"
            variant="contained"
          >
            <RestartAltIcon />
          </Button>
        </Grid>
        <Grid item xs={5} container className="playerWrapper">
          <Grid item xs={6}>
            <div className="lifepointsBg">
              <h1>
                <CountUp
                  duration={0.875}
                  start={opponentPreviousLp}
                  end={opponentLp}
                />
              </h1>
            </div>
          </Grid>
          <Grid className="inputsWrapper" item xs={6}>
            <Button
              onClick={handleAddOpponentLp}
              color="primary"
              className="lpButtons"
              variant="contained"
            >
              +
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
              className="lpButtons"
              variant="contained"
            >
              -
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ScoreBoard;
