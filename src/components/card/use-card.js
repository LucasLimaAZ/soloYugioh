import useField from "../../shared/hooks/field";
import useGraveyard from "../../shared/hooks/graveyard";
import useLifePoints from "../../shared/hooks/lifePoints";
import { useState } from "react";

export const useCard = (position) => {
  const {
    generateTributeMonster,
    changeMonsterPosition,
    flipCard,
    generateEquipCard,
    destroyCard,
    selectCard,
    field,
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (!card.face_down) selectCard(card);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTribute = () => {
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
  };

  const handleSearchCard = () => {
    setOpenSearchModal(true);
  };

  const handleDestroy = () => {
    destroyCard(position);
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
  };
};
