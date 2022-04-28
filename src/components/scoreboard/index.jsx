import React, { useState } from "react";
import "./style.scss";
import { Button, Grid, TextField } from "@mui/material";
import CountUp from "react-countup";
import DamageSound from "../../assets/sounds/calculating.mp3";
import CalculatedSound from "../../assets/sounds/calculated.mp3";
import FinishSound from "../../assets/sounds/endedDuel.mp3";
import StartDuelSound from "../../assets/sounds/duelStart.mp3";
import VictorySound from "../../assets/sounds/victory.mp3";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Howl, Howler } from "howler";
import CardGenerator from "../cardGenerator";
import ToolBar from "../toolBar";

const ScoreBoard = () => {
  const [lpInput, setLpInput] = useState();
  const [opponentLpInput, setOpponentLpInput] = useState();
  const [lifePoints, setLifePoints] = useState(8000);
  const [opponentLifePoints, setOpponentLifePoints] = useState(8000);
  const [previousLp, setPreviousLp] = useState(8000);
  const [opponentPreviousLp, setopponentPreviousLp] = useState(8000);
  Howler.volume(1.0);

  const soundPlay = (src, volume = 1) => {
    const sound = new Howl({
      src,
      volume,
    });
    sound.play();
  };

  const handleLifePoints = (who, operation) => {
    soundPlay(DamageSound);

    if (who === "yours") {
      setPreviousLp(lifePoints);
      if (operation === "sum") {
        setLifePoints(Number(lifePoints) + Number(lpInput));
      } else {
        if (Number(lifePoints) - Number(lpInput) < 1) {
          setLifePoints(0);
          setTimeout(() => {
            soundPlay(FinishSound);
          }, 1100);
        } else {
          setLifePoints(Number(lifePoints) - Number(lpInput));
        }
      }
    } else {
      setopponentPreviousLp(opponentLifePoints);
      if (operation === "sum") {
        setOpponentLifePoints(
          Number(opponentLifePoints) + Number(opponentLpInput)
        );
      } else {
        if (Number(opponentLifePoints) - Number(opponentLpInput) < 1) {
          setOpponentLifePoints(0);
          setTimeout(() => {
            soundPlay(FinishSound);
            setTimeout(() => {
              soundPlay(VictorySound, 0.2);
            }, 1000);
          }, 1100);
        } else {
          setOpponentLifePoints(
            Number(opponentLifePoints) - Number(opponentLpInput)
          );
        }
      }
    }
    setTimeout(() => {
      soundPlay(CalculatedSound);
    }, 700);
  };

  const handleLpInputChange = (e) => {
    setLpInput(e.target.value);
  };

  const handleOpponentInputChange = (e) => {
    setOpponentLpInput(e.target.value);
  };

  const handleResetDuel = () => {
    setLifePoints(8000);
    setOpponentLifePoints(8000);
    soundPlay(StartDuelSound);
  };

  return (
    <>
      <Grid className="scoreBoard" container>
        <Grid item xs={5} container className="playerWrapper">
          <Grid className="inputsWrapper" item xs={6}>
            <Button
              onClick={() => handleLifePoints("yours", "sum")}
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
              onClick={() => handleLifePoints("yours", "subtract")}
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
                <CountUp duration={0.875} start={previousLp} end={lifePoints} />
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
                  end={opponentLifePoints}
                />
              </h1>
            </div>
          </Grid>
          <Grid className="inputsWrapper" item xs={6}>
            <Button
              onClick={() => handleLifePoints("opponent", "sum")}
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
              onClick={() => handleLifePoints("opponent", "subtract")}
              color="primary"
              className="lpButtons"
              variant="contained"
            >
              -
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <div className="cardsWrapper">
        <CardGenerator type="magic" />
        <CardGenerator type="magic" />
        <CardGenerator type="magic" />
        <CardGenerator type="magic" />
        <CardGenerator type="magic" />
      </div>
      <div className="cardsWrapper">
        <CardGenerator type="monster" />
        <CardGenerator type="monster" />
        <CardGenerator type="monster" />
        <CardGenerator type="monster" />
        <CardGenerator type="monster" />
      </div>
      <ToolBar />
    </>
  );
};

export default ScoreBoard;
