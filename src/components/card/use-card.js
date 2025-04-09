import useField from "../../shared/hooks/field";
import useGraveyard from "../../shared/hooks/graveyard";
import useLifePoints from "../../shared/hooks/life-points";
import { useState } from "react";
import useHand from "../../shared/hooks/hand";

export const useCard = (position, type) => {
  const {
    generateTributeMonster,
    changeMonsterPosition,
    flipCard,
    generateEquipCard,
    destroyCard,
    selectCard,
    field,
    updateCardZone,
    generateMagicTrap,
  } = useField();

  const { sendToGraveyard } = useGraveyard();
  const { setPlayerLp, playerLp } = useLifePoints();

  const [openAttackModal, setOpenAttackModal] = useState();
  const [openChangeStatsModal, setOpenChangeStatsModal] = useState();
  const [openSearchModal, setOpenSearchModal] = useState();
  const [target, setTarget] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const openContextMenu = Boolean(anchorEl);
  const card = field[position];
  const isMonster = type === "monster";
  const { decreaseHand, increaseHand } = useHand();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (!card.face_down) selectCard(card);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTribute = () => {
    decreaseHand();
    generateTributeMonster(position);
  };

  const handleChangePosition = () => {
    changeMonsterPosition(position);
    handleClose();
  };

  const handleFlip = () => {
    flipCard(position);
    handleClose();
  };

  const handleDirectAttack = () => {
    setPlayerLp(playerLp - card.atk);
  };

  const handleMonsterAttack = () => {
    setTarget("you");
    setOpenAttackModal(true);
  };

  const handleAttack = () => {
    setTarget("opponent");
    setOpenAttackModal(true);
  };

  const handleEquip = () => {
    generateEquipCard();
    decreaseHand();
  };

  const handleSearchCard = () => {
    setOpenSearchModal(true);
  };

  const handleDestroy = () => {
    destroyCard(position, isMonster);
    sendToGraveyard(card);
    handleClose();
  };

  const handleStatsClick = () => {
    setOpenChangeStatsModal(true);
  };

  const handleUpdateStats = (newAtk, newDef) => {
    if (newAtk) card.atk = newAtk;
    if (newDef) card.def = newDef;
    setOpenChangeStatsModal(false);
  };

  const returnToHand = () => {
    handleDestroy(isMonster);
    increaseHand();
  };

  const changeCard = () => {
    handleDestroy(position);
    generateMagicTrap(position);
  };

  const negateCard = () => {
    const negatedCard = {
      ...card,
      isNegated: !card.isNegated,
    };
    updateCardZone(negatedCard, position);
  };

  return {
    handleTribute,
    handleChangePosition,
    handleFlip,
    handleDirectAttack,
    handleAttack,
    handleMonsterAttack,
    handleEquip,
    handleSearchCard,
    handleDestroy,
    handleClick,
    handleStatsClick,
    handleUpdateStats,
    openAttackModal,
    setOpenAttackModal,
    openChangeStatsModal,
    setOpenChangeStatsModal,
    openSearchModal,
    setOpenSearchModal,
    target,
    openContextMenu,
    anchorEl,
    handleClose,
    negateCard,
    returnToHand,
    changeCard,
  };
};
