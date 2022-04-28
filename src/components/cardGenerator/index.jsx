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
} from "../../shared/services/cards";
import "./style.scss";

const soundPlay = (src) => {
  const sound = new Howl({
    src,
  });
  sound.play();
};

const CardGenerator = (props) => {
  const [card, setCard] = useState({});
  const [monsterPosition, setMonsterPosition] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAttack, setOpenAttack] = useState(null);
  const [attack, setAttack] = useState(undefined);
  const openMenu = Boolean(anchorEl);

  const handleDestroyCard = () => {
    setAnchorEl(null);
    setCard({});
    setMonsterPosition("");
    if (props.type === "monster") soundPlay(MonsterDestruction);
    else soundPlay(CardFlip);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCardClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangePosition = () => {
    setAnchorEl(null);

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

  const handleConfirmAttack = () => {
    setOpenAttack(false);

    if (Number(attack - card?.atk) >= 0) {
      handleDestroyCard();
    }
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

  return (
    <div className="cardGenerator">
      <div className="cardButtonsContainer">
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={generateCard}>
            {props.type === "monster" ? "Summon" : "Activate"}
          </MenuItem>
          {props.type === "monster" && (
            <div>
              <MenuItem onClick={handleAttack}>Attack</MenuItem>
              <MenuItem onClick={handleChangePosition}>
                Change Position
              </MenuItem>
            </div>
          )}
          <MenuItem onClick={handleDestroyCard}>Destroy</MenuItem>
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
                The given damage will be of{" "}
                <b
                  className={
                    Number(attack - card?.atk) < 0 ? "negative" : "positive"
                  }
                >
                  {attack - card?.atk}
                </b>{" "}
                LP.
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
