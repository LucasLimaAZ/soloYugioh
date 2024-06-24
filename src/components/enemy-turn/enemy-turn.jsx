import React from "react";
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
import { useEnemyTurn } from "./use-enemy-turn";

const EnemyTurn = () => {
  const {
    phases,
    mainPhase,
    openModal,
    activeStep,
    handleCloseModal,
    handleNext,
    handleEnemyTurn,
    handleOpenEnemyTurn,
    setActiveStep,
  } = useEnemyTurn();

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
