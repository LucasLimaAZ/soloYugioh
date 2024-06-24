import { useState } from "react";
import useLifePoints from "../../../shared/hooks/lifePoints";
import useField from "../../../shared/hooks/field";

export const useAttackCard = (props) => {
  const [attack, setAttack] = useState(undefined);
  const [openTrapModal, setOpenTrapModal] = useState(false);
  const { field } = useField();
  const { playerLp, opponentLp, setOpponentLp, setPlayerLp } = useLifePoints();
  const damageOptions = Array.from(new Array(100)).map(
    (_, index) => `${index * 100}`
  );

  const handleAttackChange = (e) => {
    setAttack(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleConfirmAttack();
  };

  const handleOptionsChange = (_, newInputValue) => {
    setAttack(newInputValue);
  };

  const handleConfirmAttack = () => {
    let willUseTrapCard = undefined;
    let trapCardsOnField = searchForTrapCards();

    if (trapCardsOnField.length) {
      willUseTrapCard = Math.floor(Math.random() * 10) + 1 < 6;
    }

    if (props.target === "opponent" && willUseTrapCard) {
      setOpenTrapModal(true);
    } else calculateDamage();
  };

  const handleCloseTrapModal = () => {
    setOpenTrapModal(false);
    props.handleCloseAttack();
  };

  const calculateDamage = () => {
    props.handleCloseAttack();
    let atkDif = Number(attack - props.card?.atk);
    let defDif = Number(attack - props.card?.def);
    setAttack(undefined);

    if (props.card.def_mode) {
      if (defDif === 0) return;

      defDif > 0 ? props.handleDestroyCard() : setPlayerLp(playerLp + defDif);

      return;
    }

    if (atkDif >= 0) {
      props.handleDestroyCard();
      if (atkDif > 0) setOpponentLp(opponentLp - atkDif);
    }

    if (atkDif < 0) {
      setPlayerLp(playerLp + atkDif);
    }
  };

  const searchForTrapCards = () => {
    let trapCards = field?.filter((card, index) => {
      if (card) card.fieldPosition = index;
      return card?.type === "Trap Card";
    });
    return trapCards;
  };

  const chooseTrapCard = () => {
    let trapCards = searchForTrapCards();
    let randomIndex = Math.floor(Math.random() * trapCards.length);
    let selectedCardPosition = trapCards[randomIndex];
    return selectedCardPosition;
  };

  const handleContinueAttack = () => {
    handleCloseTrapModal();
    calculateDamage();
  };

  return {
    openTrapModal,
    damageOptions,
    handleAttackChange,
    handleKeyDown,
    handleOptionsChange,
    chooseTrapCard,
    handleContinueAttack,
    handleCloseTrapModal,
    attack,
    handleConfirmAttack,
  };
};
