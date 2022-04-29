import React, { useState } from "react";
import {
  Button,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { getRandomTrap } from "../../../shared/services/cards";

const AttackModal = (props) => {
  const [attack, setAttack] = useState(undefined);
  const [openTrapModal, setOpenTrapModal] = useState(false);
  const [trapCard, setTrapCard] = useState(undefined);

  const handleAttackChange = (e) => {
    setAttack(e.target.value);
  };

  const handleConfirmAttack = () => {
    setTrapCard(undefined);
    let hasTrap = Math.floor(Math.random() * 10) + 1 < 3;

    if (props.target === "opponent" && hasTrap) {
      setOpenTrapModal(true);
      getRandomTrap().then((res) => {
        setTrapCard(res.data[0]);
      });
    } else calculateDamage();
  };

  const handleCloseTrapModal = () => {
    setOpenTrapModal(false);
    props.handleCloseAttack();
  };

  const handleContinueAttack = () => {
    handleCloseTrapModal();
    calculateDamage();
  };

  const calculateDamage = () => {
    props.handleCloseAttack();
    let atkDif = Number(attack - props.card?.atk);
    let defDif = Number(attack - props.card?.def);

    if (props.monsterPosition === "atk") {
      if (atkDif >= 0) {
        props.handleDestroyCard();
      }
      props.calculateDamage(atkDif);
    } else {
      if (defDif > 0) {
        props.handleDestroyCard();
      }
      if (defDif < 0) {
        props.calculateDamage(defDif);
      }
    }
  };

  return (
    <>
      <Dialog open={openTrapModal} onClose={handleCloseTrapModal}>
        <DialogTitle>Your opponent used a TRAP CARD!</DialogTitle>
        <DialogContent>
          {trapCard && (
            <img
              width="400px"
              alt="trap card"
              src={trapCard.card_images[0].image_url}
            />
          )}
          <DialogContentText>Continue Attack?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTrapModal}>Cancel</Button>
          <Button onClick={handleContinueAttack}>Continue Attack</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={props.openAttack} onClose={props.handleCloseAttack}>
        <DialogTitle>
          {props.target === "you"
            ? "Recieve attack from this monster"
            : "Attack this monster"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the attack power of{" "}
            {props.target === "you" ? "your attacked" : "the attacking"}{" "}
            monster.
          </DialogContentText>
          <TextField
            onChange={handleAttackChange}
            autoFocus
            margin="dense"
            id="attack"
            label="Your monster attack"
            type="text"
            fullWidth
            variant="standard"
          />
          {attack && (
            <DialogContentText>
              {props.monsterPosition === "atk" ? (
                <>
                  The {props.target === "you" ? "taken" : "given"} damage will
                  be of{" "}
                  <b
                    className={
                      Number(attack - props.card?.atk) < 0
                        ? "negative"
                        : "positive"
                    }
                  >
                    {attack - props.card?.atk}
                  </b>{" "}
                  LP.
                </>
              ) : (
                <>
                  The difference will be of{" "}
                  <b
                    className={
                      Number(attack - props.card?.def) < 0
                        ? "negative"
                        : "positive"
                    }
                  >
                    {attack - props.card?.def}
                  </b>{" "}
                  .
                </>
              )}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseAttack}>Cancel</Button>
          <Button onClick={handleConfirmAttack}>Attack</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AttackModal;
