import React, { useState } from "react";
import { Button, Modal, Typography, Box } from "@mui/material";
import { Casino, ChangeCircle } from "@mui/icons-material";
import "./style.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ToolBar = () => {
  const [coin, setCoin] = useState("Heads");
  const [dice, setDice] = useState("6");
  const [openModal, setOpenModal] = useState(false);

  const handleDice = () => {
    setOpenModal(true);
    setDice("Rolling...");
    setTimeout(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
    }, 400);
  };

  const handleCoin = () => {
    let result = Math.floor(Math.random() * 2) + 1;

    if (result === 1) {
      setCoin("Flipping...");
      setTimeout(() => {
        setCoin("Heads");
      }, 400);
    } else {
      setCoin("Flipping...");
      setTimeout(() => {
        setCoin("Tails");
      }, 400);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Dice: {dice}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Dice rules on enemy turn:
            <div>
              <b className={dice === 1 ? "selected" : ""}>
                * 1 - Enemy plays magic card;
              </b>
            </div>
            <div>
              <b className={dice === 2 ? "selected" : ""}>
                * 2 - Enemy summons monster;
              </b>
            </div>
            <div>
              <b className={dice === 3 ? "selected" : ""}>
                * 3 - Enemy summons monster;
              </b>
            </div>
            <div>
              <b className={dice === 4 ? "selected" : ""}>
                * 4 - Enemy summons monster and play magic card;
              </b>
            </div>
            <div>
              <b className={dice === 5 ? "selected" : ""}>
                * 5 - Enemy summons monster and play magic card;
              </b>
            </div>
            <div>
              <b className={dice === 6 ? "selected" : ""}>
                * 6 - Enemy summons monster and play magic card;
              </b>
            </div>
          </Typography>
        </Box>
      </Modal>
      <div className="toolbar-container">
        <div className="buttonContent">
          <Button onClick={handleDice} color="primary" variant="contained">
            <Casino />
          </Button>
          <b className="toolbar-outside-info">Dice: {dice}</b>
        </div>
        <div className="buttonContent">
          <Button onClick={handleCoin} color="primary" variant="contained">
            <ChangeCircle />
          </Button>
          <b className="toolbar-outside-info">Coin: {coin}</b>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
