import { useState } from "react";
import useLifePoints from "../../../shared/hooks/life-points";
import useField from "../../../shared/hooks/field";
import { playSound } from "../../../shared/helper";

export const useAttackCard = (props) => {
  const [attack, setAttack] = useState(undefined);
  const [openTrapModal, setOpenTrapModal] = useState(false);
  const [chosenTrapCard, setChosenTrapCard] = useState();
  const { field, flipCard } = useField();
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
      willUseTrapCard = Math.floor(Math.random() * 10) + 1 < 8;
    }

    if (trapCardsOnField.length && opponentLp <= 3000) {
      willUseTrapCard = true;
    }

    const trapCard = chooseTrapCard();
    setChosenTrapCard(trapCard);

    if (props.target !== "you" && willUseTrapCard) {
      flipCard(trapCard.fieldPosition);
      playSound("flip-card");
      setOpenTrapModal(true);
    } else calculateDamage();
  };

  const handleCloseTrapModal = () => {
    setOpenTrapModal(false);
    props.handleCloseAttack();
  };

  const directDamage = () => {
    setOpponentLp(opponentLp - attack);
  };

  const calculateDamage = () => {
    if (props.card?.face_down) {
      props.handleFlipCard();
    }

    if (!props.card) {
      directDamage();
      return;
    }

    props.handleCloseAttack();
    let atkDif = Number(attack - props.card?.atk);
    let defDif = Number(attack - props.card?.def);
    setAttack(undefined);

    if (props.card?.def_mode) {
      if (defDif === 0) return;

      defDif > 0 ? handleDestroyCard() : setPlayerLp(playerLp + defDif);

      return;
    }

    if (atkDif >= 0) {
      handleDestroyCard();
      if (atkDif > 0) setOpponentLp(opponentLp - atkDif);
    }

    if (atkDif < 0) {
      setPlayerLp(playerLp + atkDif);
    }
  };

  const handleDestroyCard = () => {
    if (props.card?.face_down) {
      props.handleFlipCard();
      return;
    }

    props.handleDestroyCard();
  };

  const searchForTrapCards = () => {
    let trapCards = field?.filter((card, index) => {
      if (card) card.fieldPosition = index;
      const isTrapOrQuickSpell =
        card?.type === "Trap Card" || card?.race === "Quick-Play";
      const isAvailable = !card?.isNegated && card?.face_down;
      return isTrapOrQuickSpell && isAvailable;
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
    chosenTrapCard,
  };
};
