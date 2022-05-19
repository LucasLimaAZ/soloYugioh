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
  const [field, setField] = useState([]);
  const [selectedCard, setSelectedCard] = useState();
  Howler.volume(1.0);

  const updateField = (card, position) => {
    let updatedField = field;
    updatedField[position] = card;
    setField(updatedField);
  };

  const soundPlay = (src, volume = 1) => {
    const sound = new Howl({
      src,
      volume,
    });
    sound.play();
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  const calculateDamage = (who, operation, amount = undefined) => {
    soundPlay(DamageSound);
    setTimeout(() => {
      soundPlay(CalculatedSound);
    }, 700);

    let reduceYours = Number(lifePoints) - Number(amount || lpInput);
    let sumYours = Number(lifePoints) + Number(amount || lpInput);
    let reduceOpponents =
      Number(opponentLifePoints) - Number(amount || opponentLpInput);
    let sumOpponents =
      Number(opponentLifePoints) + Number(amount || opponentLpInput);

    if (who === "yours") {
      setPreviousLp(lifePoints);
      if (operation === "sum") {
        setLifePoints(sumYours);
      } else {
        if (reduceYours < 1) {
          setLifePoints(0);
          setTimeout(() => {
            soundPlay(FinishSound);
          }, 1100);
        } else {
          setLifePoints(reduceYours);
        }
      }
    } else {
      setopponentPreviousLp(opponentLifePoints);
      if (operation === "sum") {
        setOpponentLifePoints(sumOpponents);
      } else {
        if (reduceOpponents < 1) {
          setOpponentLifePoints(0);
          setTimeout(() => {
            soundPlay(FinishSound);
            setTimeout(() => {
              soundPlay(VictorySound, 0.3);
            }, 1000);
          }, 1100);
        } else {
          setOpponentLifePoints(reduceOpponents);
        }
      }
    }
  };

  const handleLpInputChange = (e) => {
    setLpInput(e.target.value);
  };

  const handleOpponentInputChange = (e) => {
    setOpponentLpInput(e.target.value);
  };

  const handleResetDuel = () => {
    setLifePoints(8000);
    setSelectedCard(undefined);
    setOpponentLifePoints(8000);
    soundPlay(StartDuelSound);
  };

  const handleCalculateDamage = (damage) => {
    calculateDamage(
      damage < 0 ? "yours" : "opponent",
      "subtract",
      damage < 0 ? -damage : damage
    );
  };

  return (
    <>
      <Grid className="scoreBoard" container>
        <Grid item xs={5} container className="playerWrapper">
          <Grid className="inputsWrapper" item xs={6}>
            <Button
              onClick={() => calculateDamage("yours", "sum")}
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
              onClick={() => calculateDamage("yours", "subtract")}
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
              onClick={() => calculateDamage("opponent", "sum")}
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
              onClick={() => calculateDamage("opponent", "subtract")}
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
        <CardGenerator
          field={field}
          selectCard={handleSelectCard}
          updateField={updateField}
          position={6}
          type="magic"
        />
        <CardGenerator
          field={field}
          selectCard={handleSelectCard}
          updateField={updateField}
          position={7}
          type="magic"
        />
        <CardGenerator
          field={field}
          selectCard={handleSelectCard}
          updateField={updateField}
          position={8}
          type="magic"
        />
        <CardGenerator
          field={field}
          selectCard={handleSelectCard}
          updateField={updateField}
          position={9}
          type="magic"
        />
        <CardGenerator
          field={field}
          selectCard={handleSelectCard}
          updateField={updateField}
          position={10}
          type="magic"
        />
      </div>
      <div className="cardsWrapper">
        <CardGenerator
          field={field}
          selectCard={handleSelectCard}
          updateField={updateField}
          position={1}
          calculateDamage={handleCalculateDamage}
          type="monster"
        />
        <CardGenerator
          field={field}
          selectCard={handleSelectCard}
          updateField={updateField}
          position={2}
          calculateDamage={handleCalculateDamage}
          type="monster"
        />
        <CardGenerator
          field={field}
          selectCard={handleSelectCard}
          updateField={updateField}
          position={3}
          calculateDamage={handleCalculateDamage}
          type="monster"
        />
        <CardGenerator
          field={field}
          selectCard={handleSelectCard}
          updateField={updateField}
          position={4}
          calculateDamage={handleCalculateDamage}
          type="monster"
        />
        <CardGenerator
          field={field}
          selectCard={handleSelectCard}
          updateField={updateField}
          position={5}
          calculateDamage={handleCalculateDamage}
          type="monster"
        />
      </div>
      <ToolBar selectedCard={selectedCard} field={field} />
    </>
  );
};

export default ScoreBoard;
