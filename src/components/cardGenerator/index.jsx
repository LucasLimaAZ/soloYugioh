import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Howl } from "howler";
import AttackModal from "../modals/attackModal";
import MonsterDestruction from "../../assets/sounds/monsterDestruction.mp3";
import CardFlip from "../../assets/sounds/flipCard.mp3";
import MonsterActivation from "../../assets/sounds/monsterActivation.mp3";
import MagicActivation from "../../assets/sounds/magicActivation.mp3";
import {
  getRandomDamageLpSpell,
  getRandomMonster,
} from "../../shared/services/cards";
import "./style.scss";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const soundPlay = (src) => {
  const sound = new Howl({
    src,
  });
  sound.play();
};

const CardGenerator = (props) => {
  const [card, setCard] = useState(undefined);
  const [monsterPosition, setMonsterPosition] = useState("");
  const [anchorEl, setAnchorEl] = useState(false);
  const [openAttack, setOpenAttack] = useState(false);
  const [target, setTarget] = useState("opponent");
  const openMenu = Boolean(anchorEl);

  const handleDestroyCard = () => {
    setAnchorEl(false);
    setCard(undefined);
    setMonsterPosition("");
    props.updateField("", props.position);
    if (props.type === "monster") soundPlay(MonsterDestruction);
    else soundPlay(CardFlip);
  };

  const handleCloseMenu = () => {
    setAnchorEl(false);
  };

  const handleCardClick = (event) => {
    if (card) {
      setAnchorEl(event.currentTarget);
      props.selectCard(card);
    } else {
      generateCard();
    }
  };

  const handleChangePosition = () => {
    setAnchorEl(false);
    soundPlay(CardFlip);

    if (monsterPosition === "atk") setMonsterPosition("def");
    else setMonsterPosition("atk");
  };

  const generateCard = () => {
    setAnchorEl(false);

    if (props.type === "monster") {
      getRandomMonster().then((res) => {
        let monstersAmmount = res.data.length;
        let selectedMonster = Math.floor(Math.random() * monstersAmmount) + 1;
        let monster = res.data[selectedMonster];

        if (monster.atk < monster.def) setMonsterPosition("def");
        else setMonsterPosition("atk");

        setCard(monster);
        props.updateField(
          {
            ...monster,
            monsterPosition: monster.atk < monster.def ? "def" : "atk",
          },
          props.position
        );
        soundPlay(MonsterActivation);
      });
    } else {
      getRandomDamageLpSpell().then((res) => {
        setCard(res.data[0]);
        props.updateField(res.data[0], props.position);
        soundPlay(MagicActivation);
      });
    }
  };

  const calculateDamage = (damage) => {
    props.calculateDamage(damage);
  };

  const sufferDirectAttack = () => {
    calculateDamage(Number(-card.atk));
  };

  const sufferMonsterAttack = () => {
    setTarget("you");
    setOpenAttack(true);
  };

  const handleAttack = () => {
    setTarget("opponent");
    setOpenAttack(true);
  };

  const handleCloseAttack = () => {
    setOpenAttack(false);
    handleCloseMenu();
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
          {props.type === "monster" && card && (
            <div>
              <MenuItem onClick={handleAttack}>
                <CompareArrowsIcon className="actionIcon flip" />
                Attack
              </MenuItem>
              <MenuItem onClick={sufferMonsterAttack}>
                <CompareArrowsIcon className="actionIcon" />
                Monster attack
              </MenuItem>
              <MenuItem onClick={sufferDirectAttack}>
                <ArrowRightAltIcon className="actionIcon rotate180" />
                Direct attack
              </MenuItem>
              <MenuItem onClick={handleChangePosition}>
                <SwipeRightIcon className="actionIcon" /> Change position
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
        <AttackModal
          openAttack={openAttack}
          handleCloseAttack={handleCloseAttack}
          monsterPosition={monsterPosition}
          card={card}
          handleDestroyCard={handleDestroyCard}
          target={target}
          calculateDamage={calculateDamage}
        />
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
