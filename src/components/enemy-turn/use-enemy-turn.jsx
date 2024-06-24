import MainPhase from "./phases/mainPhase";
import MainPhaseTwo from "./phases/mainPhaseTwo";
import BattlePhase from "./phases/battlePhase";
import DrawPhase from "./phases/drawPhase";
import useDeck from "../../shared/hooks/deck";
import useEnemyActions from "../../shared/hooks/enemyActions";
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
