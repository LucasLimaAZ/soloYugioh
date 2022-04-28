import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { ShieldMoon } from "@mui/icons-material";

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

const enemyActions = [
  0,
  "Enemy plays magic card;",
  "Enemy summons monster;",
  "Enemy summons monster;",
  "Enemy summons monster;",
  "Enemy summons monster and play magic card;",
  "Enemy summons monster and play magic card;",
  "Enemy summons monster and play magic card;",
  "Enemy summons monster and play magic card;",
  "Enemy summons monster and play 2 magic cards;",
  "Enemy summons 2 monsters;",
];

const atkMonsters = [0, "Enemy attacks up to 5 lower ATK monsters;"];

const defMonsters = [0, "Enemy attacks up to 5 lower DEF (face up) monsters;"];

const setMonsters = [
  0,
  "Enemy attacks up to 5 set DEF monsters;",
  "Enemy attacks 1 set DEF monster;",
  "Enemy attacks up to 2 set DEF monster;",
  "Enemy attacks up to 3 set DEF monster;",
  "Enemy attacks NO set DEF monsters;",
];

const tieMonsters = [
  0,
  "Enemy attacks up to 5 tie ATK monsters;",
  "Enemy does NOT attack tie monsters;",
];

const EnemyTurn = () => {
  const [openModal, setOpenModal] = useState(false);
  const [enemySort, setEnemySort] = useState(1);
  const [atkMonstersSort, setAtkMonstersSort] = useState(1);
  const [defMonstersSort, setDefMonstersSort] = useState(1);
  const [setMonstersSort, setSetMonstersSort] = useState(1);
  const [tieMonstersSort, setTieMonstersSort] = useState(1);
  const [generatedTurn, setGeneratedTurn] = useState(true);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEnemyTurn = () => {
    setGeneratedTurn(false);
    setTimeout(() => {
      setGeneratedTurn(true);
      setEnemySort(Math.floor(Math.random() * 10) + 1);
      setAtkMonstersSort(Math.floor(Math.random() * 1) + 1);
      setDefMonstersSort(Math.floor(Math.random() * 1) + 1);
      setSetMonstersSort(Math.floor(Math.random() * 5) + 1);
      setTieMonstersSort(Math.floor(Math.random() * 2) + 1);
    }, 400);
  };

  const handleOpenEnemyTurn = () => {
    setOpenModal(true);
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
            Enemy Turn
          </Typography>
          <Button color="primary" variant="contained" onClick={handleEnemyTurn}>
            Generate Enemy Turn
          </Button>
          {generatedTurn ? (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              What does your enemy do:
              <div style={{ marginTop: "10px" }}>
                <b>Draw Phase:</b>
                <div>Draws 1 card;</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <b>Main Phase:</b>
                <div>{enemyActions[enemySort]}</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <b>Battle Phase:</b>
                <div>{atkMonsters[atkMonstersSort]}</div>
                <div>{defMonsters[defMonstersSort]}</div>
                <div>{setMonsters[setMonstersSort]}</div>
                <div>{tieMonsters[tieMonstersSort]}</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <b>Main Phase 2:</b>
                <div>Enemy turn ends.</div>
              </div>
            </Typography>
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Generating simulation...
            </Typography>
          )}
        </Box>
      </Modal>
      <Button color="primary" variant="contained" onClick={handleOpenEnemyTurn}>
        <ShieldMoon />
      </Button>
    </>
  );
};

export default EnemyTurn;
