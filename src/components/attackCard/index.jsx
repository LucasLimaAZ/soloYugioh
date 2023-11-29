import React, { useState } from "react";
import {
  Button,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogContentText,
  TextField,
  DialogActions,
  Typography,
} from "@mui/material";
import MiniField from "../miniField";
import useField from "../../shared/hooks/field";
import useLifePoints from "../../shared/hooks/lifePoints";

const AttackModal = (props) => {
  const [attack, setAttack] = useState(undefined);
  const [openTrapModal, setOpenTrapModal] = useState(false);
  const { field } = useField();
  const { setOpponentLp, setPlayerLp } = useLifePoints();

  const handleAttackChange = (e) => {
    setAttack(e.target.value);
  };

  const handleConfirmAttack = () => {
    let willUseTrapCard = undefined;
    let trapCardsOnField = searchForTrapCards();

    if (trapCardsOnField.length) {
      willUseTrapCard = Math.floor(Math.random() * 10) + 1 < 6;
    }

    if (props.target === "opponent" && willUseTrapCard) {
      setOpenTrapModal(true);
    } else calculateDamage();
  };

  const handleCloseTrapModal = () => {
    setOpenTrapModal(false);
    props.handleCloseAttack();
  };

  const calculateDamage = () => {
    props.handleCloseAttack();
    let atkDif = Number(attack - props.card?.atk);
    let defDif = Number(attack - props.card?.def);

    if (props.card.def_mode) {
      if (defDif === 0) return;

      defDif > 0
        ? props.handleDestroyCard()
        : setPlayerLp((prevLp) => prevLp + defDif);

      return;
    }

    if (atkDif >= 0) {
      props.handleDestroyCard();
      if (atkDif > 0) setOpponentLp((prevLp) => prevLp - atkDif);
    }

    if (atkDif < 0) {
      setPlayerLp((prevLp) => prevLp + atkDif);
    }
  };

  const searchForTrapCards = () => {
    let trapCards = field?.filter((card, index) => {
      if (card) card.fieldPosition = index;
      return card?.type === "Trap Card";
    });
    return trapCards;
  };

  const chooseTrapCard = () => {
    let trapCards = searchForTrapCards();
    let randomIndex = Math.floor(Math.random() * trapCards.length);
    let selectedCardPosition = trapCards[randomIndex]?.fieldPosition;
    return selectedCardPosition;
  };

  const FlippedTrapCard = () => {
    let cardIndex = chooseTrapCard();

    return <MiniField cardIndex={cardIndex} />;
  };

  const handleContinueAttack = () => {
    handleCloseTrapModal();
    calculateDamage();
  };

  return (
    <>
      <Dialog open={openTrapModal} onClose={handleCloseTrapModal}>
        <DialogTitle>Your opponent used a TRAP CARD!</DialogTitle>
        <DialogContent>
          <FlippedTrapCard />
          <DialogContentText>Continue Attack?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContinueAttack}>Attack</Button>
          <Button onClick={handleCloseTrapModal}>Ok</Button>
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
                <Typography>
                  The {props.target === "you" ? "taken" : "given"} damage will
                  be of {attack - props.card?.atk} LP.
                </Typography>
              ) : (
                props.card?.face === "up" && (
                  <Typography>
                    The difference will be of {attack - props.card?.def}.
                  </Typography>
                )
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
