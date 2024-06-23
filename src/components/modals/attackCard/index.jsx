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
  Box,
  Autocomplete,
} from "@mui/material";
import MiniField from "../../miniField";
import useField from "../../../shared/hooks/field";
import useLifePoints from "../../../shared/hooks/lifePoints";

const AttackModal = (props) => {
  const [attack, setAttack] = useState(undefined);
  const [openTrapModal, setOpenTrapModal] = useState(false);
  const { field } = useField();
  const { playerLp, opponentLp, setOpponentLp, setPlayerLp } = useLifePoints();
  const damageOptions = Array.from(new Array(100)).map(
    (_, index) => `${index * 100}`
  );

  const handleAttackChange = (e) => {
    setAttack(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleConfirmAttack();
  };

  const handleOptionsChange = (_, newInputValue) => {
    setAttack(newInputValue);
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
    setAttack(undefined);

    if (props.card.def_mode) {
      if (defDif === 0) return;

      defDif > 0 ? props.handleDestroyCard() : setPlayerLp(playerLp + defDif);

      return;
    }

    if (atkDif >= 0) {
      props.handleDestroyCard();
      if (atkDif > 0) setOpponentLp(opponentLp - atkDif);
    }

    if (atkDif < 0) {
      setPlayerLp(playerLp + atkDif);
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
    let selectedCardPosition = trapCards[randomIndex];
    return selectedCardPosition;
  };

  const FlippedTrapCard = () => {
    let card = chooseTrapCard();

    return <MiniField card={card} />;
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
          <Button onClick={handleContinueAttack}>Attack anyway</Button>
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
          <Box
            display="flex"
            justifyContent="space-between"
            padding="4%"
            alignItems="center"
          >
            <Box
              sx={{
                borderRadius: "50%",
                width: "10vw",
              }}
              component="img"
              src={props.card?.card_images[0].image_url_cropped}
            />
            {attack && (
              <Typography
                variant="h4"
                sx={{ color: "red", textShadow: "2px 2px rgba(0,0,0,0.3)" }}
              >
                -{" "}
                {Math.abs(
                  attack -
                    (props.card.def_mode ? props.card?.def : props.card?.atk)
                ) || 0}
              </Typography>
            )}
          </Box>
          <DialogContentText>
            Enter the attack power of{" "}
            {props.target === "you" ? "your attacked" : "the attacking"}{" "}
            monster.
          </DialogContentText>
          <Autocomplete
            options={damageOptions}
            onInputChange={handleOptionsChange}
            renderInput={(params) => (
              <TextField
                onChange={handleAttackChange}
                onKeyDown={handleKeyDown}
                autoFocus
                margin="dense"
                id="attack"
                label="Your monster attack"
                type="text"
                fullWidth
                variant="standard"
                {...params}
              />
            )}
          />
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
