import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { ShieldMoon } from "@mui/icons-material";
import { useEnemyTurn } from "./use-enemy-turn";

const EnemyTurn = () => {
  const {
    phases,
    mainPhase,
    openModal,
    activePhase,
    handleCloseModal,
    handleEnemyTurn,
    handleOpenEnemyTurn,
    setActivePhase,
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
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4">
                  {phases[activePhase].label}
                </Typography>
                <Button onClick={handleEnemyTurn} variant="contained">
                  Generate opponent turn
                </Button>
              </Box>
              <Box padding="4%" marginBottom="32px">
                {mainPhase && phases[activePhase].content}
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Button
                disabled={activePhase === 0}
                onClick={() => setActivePhase(0)}
                color="primary"
                variant="contained"
                sx={{ borderRadius: "50%" }}
              >
                DP
              </Button>
              <Button
                disabled={activePhase === 1}
                onClick={() => setActivePhase(1)}
                color="primary"
                variant="contained"
                sx={{ borderRadius: "50%" }}
              >
                SP
              </Button>
              <Button
                disabled={activePhase === 2}
                onClick={() => setActivePhase(2)}
                color="primary"
                variant="contained"
                sx={{ borderRadius: "50%" }}
              >
                MP1
              </Button>
              <Button
                disabled={activePhase === 3}
                onClick={() => setActivePhase(3)}
                color="primary"
                variant="contained"
                sx={{ borderRadius: "50%" }}
              >
                BP
              </Button>
              <Button
                disabled={activePhase === 4}
                onClick={() => setActivePhase(4)}
                color="primary"
                variant="contained"
                sx={{ borderRadius: "50%" }}
              >
                MP2
              </Button>
              <Button
                disabled={activePhase === 5}
                onClick={() => setActivePhase(5)}
                color="primary"
                variant="contained"
                sx={{ borderRadius: "50%" }}
              >
                EP
              </Button>
            </Box>
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
