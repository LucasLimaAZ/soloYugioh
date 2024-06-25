import MainPhase from "./phases/main-phase";
import MainPhaseTwo from "./phases/main-phase-two";
import BattlePhase from "./phases/battle-phase";
import DrawPhase from "./phases/draw-phase";
import useEnemyActions from "../../shared/hooks/enemy-actions";
import { useState } from "react";
import StandbyPhase from "./phases/standby-phase";

export const useEnemyTurn = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const { generateMainPhase, generateBattlePhase, mainPhase } =
    useEnemyActions();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNext = () => {
    setActivePhase((prevActivePhase) => prevActivePhase + 1);
  };

  const handleReset = () => {
    setActivePhase(0);
  };

  const handleEnemyTurn = () => {
    generateMainPhase();
    generateBattlePhase();
    handleReset();
  };

  const handleOpenEnemyTurn = () => {
    setOpenModal(true);
  };

  const phases = [
    {
      label: "Draw phase",
      content: <DrawPhase />,
    },
    {
      label: "Standby phase",
      content: <StandbyPhase />,
    },
    {
      label: "Main phase",
      content: <MainPhase />,
    },
    {
      label: "Battle phase",
      content: <BattlePhase />,
    },
    {
      label: "Main phase 2",
      content: <MainPhaseTwo />,
    },
    {
      label: "End phase",
      content: "",
    },
  ];

  return {
    phases,
    mainPhase,
    openModal,
    activePhase,
    handleCloseModal,
    handleNext,
    handleEnemyTurn,
    handleOpenEnemyTurn,
    setActivePhase,
  };
};
