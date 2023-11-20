import { useState } from "react";
import {
  getRandomDamageLpSpell,
  getRandomMonster,
  getRandomTrap,
} from "../services/cards";
import { fieldAtom } from "../atoms";
import { useAtom } from "jotai";
import { playSound } from "../helper";

const useField = () => {
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
        let card = response.data[0];
        let newField = [...field];
        newField[position] = card;
        setField(newField);
      })
      .catch((err) => console.error("Could not generate spell", err))
      .finally(() => setLoading(false));
  };

  const generateTrap = (position) => {
    if (loading) return;
    setLoading(true);
    playSound("magic-activation");
    getRandomTrap()
      .then((response) => {
        let card = response.data[0];
        card = { ...card, face_down: true };
        let newField = [...field];
        newField[position] = card;
        setField(newField);
      })
      .catch((err) => console.error("Could not generate trap", err))
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

  const generateMagicTrap = (position) => {
    let isTrap = Math.floor(Math.random() * 10) > 5;

    if (isTrap) {
      generateTrap(position);
      return;
    }

    generateMagic(position);
  };

  return {
    field,
    generateMonster,
    generateMagicTrap,
    changeMonsterPosition,
    destroyCard,
    flipCard,
  };
};

export default useField;
