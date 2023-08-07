import { useState } from "react";
import {
  getRandomDamageLpSpell,
  getRandomMonster,
} from "../shared/services/cards";
import { fieldAtom, opponentLpAtom, playerLpAtom } from "../shared/state";
import { useAtom } from "jotai";
import { playSound } from "./helper";

export const useField = () => {
  const [field, setField] = useAtom(fieldAtom);
  const [loading, setLoading] = useState(false);

  const generateMonster = (position) => {
    if (loading) return;
    setLoading(true);
    playSound("summon-monster");
    getRandomMonster()
      .then((response) => {
        let newField = [...field];
        let randomCard = Math.floor(Math.random() * response.data.length);
        newField[position] = response.data[randomCard];
        setField(newField);
      })
      .catch((err) => console.error("Could not generate monster", err))
      .finally(() => setLoading(false));
  };

  const generateMagic = (position) => {
    if (loading) return;
    setLoading(true);
    playSound("magic-activation");
    getRandomDamageLpSpell()
      .then((response) => {
        let newField = [...field];
        newField[position] = response.data[0];
        setField(newField);
      })
      .catch((err) => console.error("Could not generate spell or trap", err))
      .finally(() => setLoading(false));
  };

  const changeMonsterPosition = (position) => {
    playSound("flip-card");
    let card = field[position];
    let newCard = { ...card, def_mode: !card.def_mode };
    let newField = [...field];
    newField[position] = newCard;
    setField(newField);
  };

  const destroyCard = (position) => {
    playSound("destroy-card");
    let newField = [...field];
    newField[position] = undefined;
    setField(newField);
  };

  const flipCard = (position) => {
    playSound("flip-card");
    let card = field[position];
    let newCard = { ...card, face_down: !card.face_down };
    let newField = [...field];
    newField[position] = newCard;
    setField(newField);
  };

  return {
    generateMonster,
    generateMagic,
    changeMonsterPosition,
    destroyCard,
    flipCard,
  };
};

export const useLifePoints = () => {
  const [playerLp, setPlayerLifePoints] = useAtom(playerLpAtom);
  const [opponentLp, setOpponentLifePoints] = useAtom(opponentLpAtom);

  const setPlayerLp = (newLp) => {
    setPlayerLifePoints(newLp);
    playSound("lp-damage");
    setTimeout(() => {
      playSound("calculated-damage");
    }, 700);
  };

  const setOpponentLp = (newLp) => {
    setOpponentLifePoints(newLp);
    playSound("lp-damage");
    setTimeout(() => {
      playSound("calculated-damage");
    }, 700);
  };

  return {
    playerLp,
    setPlayerLp,
    opponentLp,
    setOpponentLp,
  };
};
