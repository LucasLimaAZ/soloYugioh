import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useScoreBoard } from "../../scoreboard/use-scoreboard";

const ResetDuelConfirmationModal = (props) => {
  const { handleResetDuel } = useScoreBoard();

  return (
    <Modal
      open={props.isOpenResetModal}
      onClose={props.handleCloseResetModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to reset the duel?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => {
                handleResetDuel();
                props.handleCloseResetModal();
              }}
              variant="contained"
              color="primary"
            >
              Reset
            </Button>
            <Button
              onClick={() => props.handleCancel()}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ResetDuelConfirmationModal;
