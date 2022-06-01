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
import CardBackIMG from "../../../assets/img/yugioh-back.jpg";
import "./style.scss";

const AttackModal = (props) => {
  const [attack, setAttack] = useState(undefined);
  const [openTrapModal, setOpenTrapModal] = useState(false);
  const [trapCard, setTrapCard] = useState(undefined);

  const handleAttackChange = (e) => {
    setAttack(e.target.value);
  };

  const handleConfirmAttack = () => {
    setTrapCard(undefined);
    let trapCards = searchForTrapCards();
    let hasTrap = undefined;

    if (trapCards.length) {
      hasTrap = Math.floor(Math.random() * 10) + 1 < 6;
    }

    if (props.target === "opponent" && hasTrap) {
      setOpenTrapModal(true);
      setTrapCard(true);
    } else calculateDamage();
  };

  const chooseTrapCard = () => {
    let trapCards = searchForTrapCards();
    let randomIndex = Math.floor(Math.random() * trapCards.length);
    let selectedCardPosition = trapCards[randomIndex]?.fieldPosition;
    return selectedCardPosition;
  };

  const handleCloseTrapModal = () => {
    setTrapCard(undefined);
    setOpenTrapModal(false);
    props.handleCloseAttack();
  };

  const handleContinueAttack = () => {
    setTrapCard(undefined);
    handleCloseTrapModal();
    calculateDamage();
  };

  const searchForTrapCards = () => {
    let trapCards = props.field?.filter((card, index) => {
      if (card) card.fieldPosition = index;
      return card.type === "Trap Card";
    });
    return trapCards;
  };

  const calculateDamage = () => {
    props.handleCloseAttack();
    let atkDif = Number(attack - props.card?.atk);
    let defDif = Number(attack - props.card?.def);

    if (props.monsterPosition === "atk") {
      if (atkDif >= 0) {
        props.handleDestroyCard();
      }
      if (atkDif !== 0) props.calculateDamage(atkDif);
    } else {
      if (defDif > 0) {
        props.handleDestroyCard();
      }
      if (defDif < 0) {
        props.calculateDamage(defDif);
      }
    }
  };

  const MiniField = () => {
    let cardIndex = chooseTrapCard();

    return (
      <>
        <div className="flex trap-mini-field">
          <img
            className={`mini-card ${cardIndex === 6 ? "selected" : ""}`}
            src={CardBackIMG}
            alt="mini-card"
          />
          <img
            className={`mini-card ${cardIndex === 7 ? "selected" : ""}`}
            src={CardBackIMG}
            alt="mini-card"
          />
          <img
            className={`mini-card ${cardIndex === 8 ? "selected" : ""}`}
            src={CardBackIMG}
            alt="mini-card"
          />
          <img
            className={`mini-card ${cardIndex === 9 ? "selected" : ""}`}
            src={CardBackIMG}
            alt="mini-card"
          />
          <img
            className={`mini-card ${cardIndex === 10 ? "selected" : ""}`}
            src={CardBackIMG}
            alt="mini-card"
          />
        </div>
        <div className="flex trap-mini-field">
          <img className="mini-card" src={CardBackIMG} alt="mini-card" />
          <img className="mini-card" src={CardBackIMG} alt="mini-card" />
          <img className="mini-card" src={CardBackIMG} alt="mini-card" />
          <img className="mini-card" src={CardBackIMG} alt="mini-card" />
          <img className="mini-card" src={CardBackIMG} alt="mini-card" />
        </div>
      </>
    );
  };

  return (
    <>
      <Dialog open={openTrapModal} onClose={handleCloseTrapModal}>
        <DialogTitle>Your opponent used a TRAP CARD!</DialogTitle>
        <DialogContent>
          {trapCard && <MiniField />}
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
                props.card?.face === "up" && (
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
