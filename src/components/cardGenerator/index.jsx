import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { Howl } from "howler";
import MonsterDestruction from "../../assets/sounds/monsterDestruction.mp3";
import CardFlip from "../../assets/sounds/flipCard.mp3";
import MonsterActivation from "../../assets/sounds/monsterActivation.mp3";
import MagicActivation from "../../assets/sounds/magicActivation.mp3";
import {
  getRandomDamageLpSpell,
  getRandomMonster,
  getRandomTrap,
} from "../../shared/services/cards";
import "./style.scss";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

const soundPlay = (src) => {
  const sound = new Howl({
    src,
  });
  sound.play();
};

const CardGenerator = (props) => {
  const [card, setCard] = useState(undefined);
  const [trapCard, setTrapCard] = useState(undefined);
  const [monsterPosition, setMonsterPosition] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAttack, setOpenAttack] = useState(null);
  const [attack, setAttack] = useState(undefined);
  const [openTrapModal, setOpenTrapModal] = useState(false);
  const openMenu = Boolean(anchorEl);

  const handleDestroyCard = () => {
    setAnchorEl(null);
    setCard(undefined);
    setMonsterPosition("");
    if (props.type === "monster") soundPlay(MonsterDestruction);
    else soundPlay(CardFlip);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCardClick = (event) => {
    if (card) {
      setAnchorEl(event.currentTarget);
    } else {
      generateCard();
    }
  };

  const handleChangePosition = () => {
    setAnchorEl(null);
    soundPlay(CardFlip);

    if (monsterPosition === "atk") setMonsterPosition("def");
    else setMonsterPosition("atk");
  };

  const generateCard = () => {
    setAnchorEl(null);

    if (props.type === "monster") {
      getRandomMonster().then((res) => {
        let monstersAmmount = res.data.length;
        let selectedMonster = Math.floor(Math.random() * monstersAmmount) + 1;

        if (res.data[selectedMonster].atk < res.data[selectedMonster].def)
          setMonsterPosition("def");
        else setMonsterPosition("atk");

        setCard(res.data[selectedMonster]);
        soundPlay(MonsterActivation);
      });
    } else {
      getRandomDamageLpSpell().then((res) => {
        setCard(res.data[0]);
        soundPlay(MagicActivation);
      });
    }
  };

  const calculateDamage = () => {
    setOpenAttack(false);
    let atkDif = Number(attack - card?.atk);
    let defDif = Number(attack - card?.def);

    if (monsterPosition === "atk") {
      if (atkDif >= 0) {
        handleDestroyCard();
      }
      props.calculateDamage(atkDif);
    } else {
      if (defDif > 0) {
        handleDestroyCard();
      }
      if (defDif < 0) {
        props.calculateDamage(defDif);
      }
    }
  };

  const handleContinueAttack = () => {
    handleCloseTrapModal();
    calculateDamage();
  };

  const handleConfirmAttack = () => {
    let hasTrap = Math.floor(Math.random() * 10) + 1 < 4;

    if (hasTrap) {
      setOpenTrapModal(true);
      getRandomTrap().then((res) => {
        setTrapCard(res.data[0]);
      });
    } else calculateDamage();
  };

  const handleAttack = () => {
    setOpenAttack(true);
  };

  const handleCloseAttack = () => {
    setOpenAttack(null);
  };

  const handleAttackChange = (e) => {
    setAttack(e.target.value);
  };

  const handleCloseTrapModal = () => {
    setOpenTrapModal(false);
    handleCloseAttack();
  };

  return (
    <div className="cardGenerator">
      <div className="cardButtonsContainer">
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
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {props.type === "monster" && card?.atk && (
            <div>
              <MenuItem onClick={handleAttack}>
                <CompareArrowsIcon className="actionIcon" />
                Attack
              </MenuItem>
              <MenuItem onClick={handleChangePosition}>
                <SwipeRightIcon className="actionIcon" /> Change Position
              </MenuItem>
            </div>
          )}
          <MenuItem onClick={generateCard}>
            <AutoAwesomeIcon className="actionIcon" />{" "}
            {props.type === "monster" ? "Summon" : "Activate"}
          </MenuItem>
          <MenuItem onClick={handleDestroyCard}>
            <DoDisturbIcon className="actionIcon" /> Destroy
          </MenuItem>
        </Menu>
        <Dialog open={openAttack} onClose={handleCloseAttack}>
          <DialogTitle>Attack this monster</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the attack power of the attacking monster.
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
                {monsterPosition === "atk" ? (
                  <>
                    The given damage will be of{" "}
                    <b
                      className={
                        Number(attack - card?.atk) < 0 ? "negative" : "positive"
                      }
                    >
                      {attack - card?.atk}
                    </b>{" "}
                    LP.
                  </>
                ) : (
                  <>
                    The difference will be of{" "}
                    <b
                      className={
                        Number(attack - card?.def) < 0 ? "negative" : "positive"
                      }
                    >
                      {attack - card?.def}
                    </b>{" "}
                    .
                  </>
                )}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAttack}>Cancel</Button>
            <Button onClick={handleConfirmAttack}>Attack</Button>
          </DialogActions>
        </Dialog>
      </div>
      <img
        onClick={handleCardClick}
        src={
          card?.card_images?.length > 0
            ? card?.card_images[0].image_url
            : "https://i.pinimg.com/236x/c6/4e/a3/c64ea38e58ab38e3a340fb0b40ae8aa9--yu-gi-oh-jpg.jpg"
        }
        alt="magic card"
        className={
          monsterPosition === "def" ? "card defenseMode" : "card attackMode"
        }
      />
      {props.type === "monster" && (
        <div className="monsterAtkDef">{`ATK ${card?.atk || 0} / DEF ${
          card?.def || 0
        }`}</div>
      )}
    </div>
  );
};

export default CardGenerator;
