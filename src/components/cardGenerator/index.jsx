import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Howl, Howler } from "howler";
import DamageSound from "../../assets/sounds/calculating.mp3";
import CalculatedSound from "../../assets/sounds/calculated.mp3";
import FinishSound from "../../assets/sounds/endedDuel.mp3";
import StartDuelSound from "../../assets/sounds/duelStart.mp3";
import MonsterDestruction from "../../assets/sounds/monsterDestruction.mp3";
import MonsterActivation from "../../assets/sounds/monsterActivation.mp3";
import MagicActivation from "../../assets/sounds/magicActivation.mp3";
import {
  getRandomDamageLpSpell,
  getRandomMonster,
} from "../../shared/services/cards";
import "./style.scss";

const soundPlay = (src) => {
  const sound = new Howl({
    src,
  });
  sound.play();
};

const CardGenerator = (props) => {
  const [card, setCard] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);

  const handleDestroyCard = () => {
    setCard({});
    soundPlay(MonsterDestruction);
  };

  const generateCard = () => {
    setDisabledButton(true);

    if (props.type === "monster") {
      getRandomMonster().then((res) => {
        let monstersAmmount = res.data.length;
        setCard(res.data[Math.floor(Math.random() * monstersAmmount) + 1]);
        setDisabledButton(false);
        soundPlay(MonsterActivation);
      });
    } else {
      getRandomDamageLpSpell().then((res) => {
        setCard(res.data[0]);
        setDisabledButton(false);
        soundPlay(MagicActivation);
      });
    }
  };

  return (
    <div className="cardGenerator">
      <div className="cardButtonsContainer">
        <Button
          disabled={disabledButton}
          className="cardButtons"
          color="primary"
          variant="contained"
          onClick={generateCard}
        >
          {props.type === "monster" ? "Summon" : "Activate"}
        </Button>

        <Button
          disabled={disabledButton}
          className="cardButtons"
          color="primary"
          variant="contained"
          onClick={handleDestroyCard}
        >
          Destroy
        </Button>
      </div>
      <img
        src={
          card?.card_images?.length > 0
            ? card?.card_images[0].image_url
            : "https://i.pinimg.com/236x/c6/4e/a3/c64ea38e58ab38e3a340fb0b40ae8aa9--yu-gi-oh-jpg.jpg"
        }
        alt="magic card"
        className={card?.atk < card?.def ? "defenseMode" : "attackMode"}
      />
      {props.type === "monster" && (
        <div className="monsterAtkDef">{`ATK ${card?.atk || 0} / DEF ${
          card?.def || 0
        }`}</div>
      )}
    </div>
  );
};

export default CardGenerator;
