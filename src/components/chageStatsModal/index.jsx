import React, { useState } from "react";
import "./style.scss";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ChangeStatsModal = (props) => {
  const [newAtk, setNewAtk] = useState();
  const [newDef, setNewDef] = useState();

  const handleNewAtk = (e) => {
    setNewAtk(e.target.value);
  };

  const handleNewDef = (e) => {
    setNewDef(e.target.value);
  };

  const handleUpdateStats = () => {
    props.updateStats(newAtk, newDef);
  };

  return (
    <>
      <Modal
        open={props.openStatsModal}
        onClose={props.handleCloseStatsModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Attack or Defense
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="new-input">
              <TextField onChange={handleNewAtk} label="new ATK" />
              <Typography>Current attack: {props.card?.atk}</Typography>
            </div>
            <div className="new-input">
              <TextField onChange={handleNewDef} label="new DEF" />
              <Typography>Current defense: {props.card?.def}</Typography>
            </div>
            <div>
              <Button
                onClick={handleUpdateStats}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ChangeStatsModal;
