import MainPhase from "./phases/main-phase";
import MainPhaseTwo from "./phases/main-phase-two";
import BattlePhase from "./phases/battle-phase";
import DrawPhase from "./phases/draw-phase";
import useDeck from "../../shared/hooks/deck";
import useEnemyActions from "../../shared/hooks/enemy-actions";
import { useState } from "react";

export const useEnemyTurn = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { drawCard } = useDeck();
  const { generateMainPhase, generateBattlePhase, mainPhase } =
    useEnemyActions();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleEnemyTurn = () => {
    drawCard();
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
  ];

  return {
    phases,
    mainPhase,
    openModal,
    activeStep,
    handleCloseModal,
    handleNext,
    handleEnemyTurn,
    handleOpenEnemyTurn,
    setActiveStep,
  };
};
