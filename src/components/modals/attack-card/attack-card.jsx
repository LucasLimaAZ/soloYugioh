import React from "react";
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
import { useAttackCard } from "./use-attack-card";

const AttackModal = (props) => {
  const {
    openTrapModal,
    damageOptions,
    handleAttackChange,
    handleKeyDown,
    handleOptionsChange,
    chosenTrapCard,
    handleContinueAttack,
    handleCloseTrapModal,
    attack,
    handleConfirmAttack,
  } = useAttackCard(props);

  return (
    <>
      <Dialog open={openTrapModal} onClose={handleCloseTrapModal}>
        <DialogTitle>Your opponent used a TRAP CARD!</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {chosenTrapCard && (
              <Box
                sx={{ width: "66%", marginY: "16px" }}
                component="img"
                src={chosenTrapCard.card_images[0].image_url}
              />
            )}
          </Box>
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
            {!props.card?.face_down && (
              <>
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
                        (props.card?.def_mode
                          ? props.card?.def
                          : props.card?.atk)
                    ) || 0}
                  </Typography>
                )}
              </>
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
