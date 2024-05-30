import { useState } from "react";
import {
  getRandomDamageLpSpell,
  getRandomEquipSpell,
  getRandomMonster,
  getRandomTrap,
  getRandomTribute,
} from "../services/cards";
import { fieldAtom, selectedCardAtom } from "../atoms";
import { useAtom } from "jotai";
import { playSound } from "../helper";

const useField = () => {
  const [field, setField] = useAtom(fieldAtom);
  const [selectedCard, setSelectedCard] = useAtom(selectedCardAtom);
  const [loading, setLoading] = useState(false);

  const getFreePosition = () => {
    const spellCardZones = [0, 1, 2, 3, 4];

    for (let position of spellCardZones) {
      if (!field[position]) {
        return position;
      }
    }

    return null;
  };
  const generateMonster = (position) => {
    if (loading) return;
    setLoading(true);
    playSound("summon-monster");
    getRandomMonster()
      .then((response) => {
        let newField = [...field];
        let randomCardIndex = Math.floor(Math.random() * response.data.length);
        let card = response.data[randomCardIndex];
        newField[position] = {
          ...card,
          def_mode: card.atk < card.def,
          face_down: card.atk < card.def,
        };
        setField(newField);
      })
      .catch((err) => console.error("Could not generate monster", err))
      .finally(() => setLoading(false));
  };

  const generateTributeMonster = (position) => {
    if (loading) return;
    setLoading(true);
    playSound("summon-monster");
    getRandomTribute()
      .then((response) => {
        let newField = [...field];
        let randomCardIndex = Math.floor(Math.random() * response.data.length);
        let card = response.data[randomCardIndex];
        newField[position] = {
          ...card,
          def_mode: card.atk < card.def,
          face_down: card.atk < card.def,
        };
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

  const generateEquipCard = () => {
    let position = getFreePosition();

    if (loading) return;
    setLoading(true);
    playSound("magic-activation");
    getRandomEquipSpell()
      .then((response) => {
        let card = response.data[0];
        let newField = [...field];
        newField[position] = card;
        setField(newField);
      })
      .catch((err) => console.error("Could not generate equip spell", err))
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

  const selectCard = (card) => {
    setSelectedCard(card);
  };

  const updateCard = (updatedCard, position) => {
    let newField = [...field];
    newField[position] = updatedCard;
    setField(newField);
  };

  const resetField = () => {
    setField([]);
  };

  return {
    field,
    generateMonster,
    generateTributeMonster,
    generateMagicTrap,
    generateEquipCard,
    changeMonsterPosition,
    destroyCard,
    flipCard,
    selectCard,
    selectedCard,
    updateCard,
    resetField,
  };
};

export default useField;
