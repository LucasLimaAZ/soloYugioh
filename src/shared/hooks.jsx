import { useState } from "react";
import {
  getRandomDamageLpSpell,
  getRandomMonster,
} from "../shared/services/cards";
import { fieldAtom } from "../shared/state";
import { useAtom } from "jotai";

export const useField = () => {
  const [field, setField] = useAtom(fieldAtom);
  const [loading, setLoading] = useState(false);

  const generateMonster = (position) => {
    if (loading) return;
    setLoading(true);
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
    let card = field[position];
    let newCard = { ...card, def_mode: !card.def_mode };
    let newField = [...field];
    newField[position] = newCard;
    setField(newField);
  };

  const destroyCard = (position) => {
    let newField = [...field];
    newField[position] = undefined;
    setField(newField);
  };

  return {
    generateMonster,
    generateMagic,
    changeMonsterPosition,
    destroyCard,
  };
};
