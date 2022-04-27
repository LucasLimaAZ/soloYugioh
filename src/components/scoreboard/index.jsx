import React, { useState } from "react";
import "./style.scss";
import { Button, Grid, TextField } from "@mui/material";
import CountUp from "react-countup";
import DamageSound from "../../assets/sounds/calculating.mp3";
import CalculatedSound from "../../assets/sounds/calculated.mp3";
import FinishSound from "../../assets/sounds/endedDuel.mp3";
import StartDuelSound from "../../assets/sounds/duelStart.mp3";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MonsterDestruction from "../../assets/sounds/monsterDestruction.mp3";
import MonsterActivation from "../../assets/sounds/monsterActivation.mp3";
import MagicActivation from "../../assets/sounds/magicActivation.mp3";
import {
  getRandomDamageLpSpell,
  getRandomMonster,
} from "../../shared/services/cards";
import { Howl, Howler } from "howler";

const ScoreBoard = () => {
  const [lpInput, setLpInput] = useState();
  const [opponentLpInput, setOpponentLpInput] = useState();
  const [lifePoints, setLifePoints] = useState(8000);
  const [opponentLifePoints, setOpponentLifePoints] = useState(8000);
  const [previousLp, setPreviousLp] = useState(8000);
  const [opponentPreviousLp, setopponentPreviousLp] = useState(8000);
  const [randomCard, setRandomCard] = useState({});
  const [magicCard, setMagicCard] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);
  Howler.volume(1.0);

  const soundPlay = (src) => {
    const sound = new Howl({
      src,
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

  const handleRandomCard = () => {
    setDisabledButton(true);

    getRandomMonster().then((res) => {
      let monstersAmmount = res.data.length;
      setRandomCard(res.data[Math.floor(Math.random() * monstersAmmount) + 1]);
      setDisabledButton(false);
      soundPlay(MonsterActivation);
    });
  };

  const handleMagicCard = () => {
    setDisabledButton(true);

    getRandomDamageLpSpell().then((res) => {
      setMagicCard(res.data[0]);
      console.log(magicCard);
      setDisabledButton(false);
      soundPlay(MagicActivation);
    });
  };

  const handleDestroyMonster = () => {
    setRandomCard({});
    soundPlay(MonsterDestruction);
  };

  const handleDestroyMagic = () => {
    setMagicCard({});
    soundPlay(MonsterDestruction);
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
              label="Increase / Decrease"
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
              label="Increase / Decrease"
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
        <div className="cardGenerator">
          <div className="cardContainer">
            <Button
              disabled={disabledButton}
              className="cardButtons"
              color="primary"
              variant="contained"
              onClick={handleRandomCard}
            >
              Summon
            </Button>
            <img
              src={
                randomCard?.card_images?.length > 0
                  ? randomCard?.card_images[0].image_url
                  : "https://i.pinimg.com/236x/c6/4e/a3/c64ea38e58ab38e3a340fb0b40ae8aa9--yu-gi-oh-jpg.jpg"
              }
              alt="random card"
              className={
                randomCard?.atk < randomCard?.def ? "defenseMode" : "attackMode"
              }
            />
            <Button
              disabled={disabledButton}
              className="cardButtons"
              color="primary"
              variant="contained"
              onClick={handleDestroyMonster}
            >
              Destroy
            </Button>
          </div>
          <div className="monsterAtkDef">{`ATK ${randomCard?.atk || 0} / DEF ${
            randomCard?.def || 0
          }`}</div>
        </div>
        <div className="cardGenerator">
          <div className="cardContainer">
            <Button
              disabled={disabledButton}
              className="cardButtons"
              color="primary"
              variant="contained"
              onClick={handleMagicCard}
            >
              Magic
            </Button>
            <img
              src={
                magicCard?.card_images?.length > 0
                  ? magicCard?.card_images[0].image_url
                  : "https://i.pinimg.com/236x/c6/4e/a3/c64ea38e58ab38e3a340fb0b40ae8aa9--yu-gi-oh-jpg.jpg"
              }
              alt="magic card"
              className="attackMode"
            />
            <Button
              disabled={disabledButton}
              className="cardButtons"
              color="primary"
              variant="contained"
              onClick={handleDestroyMagic}
            >
              Destroy
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
