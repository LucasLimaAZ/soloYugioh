import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useChangeStats } from "./use-change-stats";

const ChangeStatsModal = (props) => {
  const { handleNewAtk, handleNewDef, handleUpdateStats } =
    useChangeStats(props);

  return (
    <Modal
      open={props.openStatsModal}
      onClose={props.handleCloseStatsModal}
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
          Change Attack or Defense
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box>
            <TextField onChange={handleNewAtk} label="new ATK" />
            <Typography>Current attack: {props.card?.atk}</Typography>
          </Box>
          <Box>
            <TextField onChange={handleNewDef} label="new DEF" />
            <Typography>Current defense: {props.card?.def}</Typography>
          </Box>
          <Box>
            <Button
              onClick={handleUpdateStats}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ChangeStatsModal;
