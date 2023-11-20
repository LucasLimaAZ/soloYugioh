import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  IconButton,
} from "@mui/material";
import { ShieldMoon } from "@mui/icons-material";
import MainPhase from "./phases/mainPhase";
import MainPhaseTwo from "./phases/mainPhaseTwo";
import BattlePhase from "./phases/battlePhase";
import DrawPhase from "./phases/drawPhase";
import useDeck from "../../shared/hooks/deck";
import useEnemyActions from "../../shared/hooks/enemyActions";

const EnemyTurn = () => {
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

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box>
            <Box display="flex" justifyContent="space-between">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Enemy Turn
              </Typography>
              <Button
                color="primary"
                variant="contained"
                onClick={handleEnemyTurn}
              >
                Generate Enemy Turn
              </Button>
            </Box>
            {mainPhase ? (
              <Box>
                <Box>What does your enemy do:</Box>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {phases.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>
                        <Typography onClick={() => setActiveStep(index)}>
                          {step.label}:
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        {step.content}
                        <Box sx={{ mb: 2 }}>
                          <Box>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === phases.length - 1
                                ? "End enemy turn"
                                : `Enter ${
                                    phases[index + 1].label || "End phase"
                                  }`}
                            </Button>
                          </Box>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Modal>
      <IconButton color="inherit" onClick={handleOpenEnemyTurn}>
        <ShieldMoon />
      </IconButton>
    </>
  );
};

export default EnemyTurn;
