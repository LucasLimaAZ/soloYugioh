import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Howl } from "howler";
import AttackModal from "../modals/attackModal";
import MonsterDestruction from "../../assets/sounds/monsterDestruction.mp3";
import CardFlip from "../../assets/sounds/flipCard.mp3";
import MonsterActivation from "../../assets/sounds/monsterActivation.mp3";
import MagicActivation from "../../assets/sounds/magicActivation.mp3";
import ChageStatsModal from "../../components/chageStatsModal";
import {
  getRandomDamageLpSpell,
  getRandomMonster,
  getRandomTribute,
  getRandomTrap,
} from "../../shared/services/cards";
import "./style.scss";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

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
  const [openStatsModal, setOpenStatsModal] = useState(false);
  const [target, setTarget] = useState("opponent");
  const openMenu = Boolean(anchorEl);

  const handleOpenStatsModal = () => {
    setOpenStatsModal(true);
  };

  const handleCloseStatsModal = () => {
    setOpenStatsModal(false);
  };

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

  const handleGenerateTribute = () => {
    setAnchorEl(false);
    getRandomTribute().then((res) => {
      let monstersAmmount = res.data.length;
      let selectedMonster = Math.floor(Math.random() * monstersAmmount) + 1;
      let monster = res.data[selectedMonster];

      if (monster.atk < monster.def) setMonsterPosition("def");
      else setMonsterPosition("atk");

      setCard({ ...monster, face: monster.atk < monster.def ? "down" : "up" });
      props.updateField(
        {
          ...monster,
          monsterPosition: monster.atk < monster.def ? "def" : "atk",
        },
        props.position
      );
      soundPlay(MonsterActivation);
    });
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

        setCard({
          ...monster,
          face: monster.atk < monster.def ? "down" : "up",
        });
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
      let isSpell = Math.random() <= 0.6;

      if (isSpell) {
        getRandomDamageLpSpell().then((res) => {
          setCard({ ...res.data[0], face: "up" });
          props.updateField(res.data[0], props.position);
          soundPlay(MagicActivation);
        });
      } else {
        getRandomTrap().then((res) => {
          setCard(res.data[0]);
          props.updateField(res.data[0], props.position);
          soundPlay(MagicActivation);
        });
      }
    }
  };

  const updateStats = (atk, def) => {
    let newCard = { ...card };

    if (atk) newCard.atk = atk;
    if (def) newCard.def = def;

    setCard(newCard);
  };

  const cardBackUrl =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/06cb28af-a15c-45d3-b1b6-fcbc1910e0c3/dbwk3sn-1ad1083a-5b15-4f77-af59-66dc07024a73.jpg/v1/fill/w_739,h_1081,q_70,strp/back_card_yugioh_hd_by_oricacardsbr_dbwk3sn-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ5NiIsInBhdGgiOiJcL2ZcLzA2Y2IyOGFmLWExNWMtNDVkMy1iMWI2LWZjYmMxOTEwZTBjM1wvZGJ3azNzbi0xYWQxMDgzYS01YjE1LTRmNzctYWY1OS02NmRjMDcwMjRhNzMuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hzaBSJ4Hs23sjOCzVznIn1Qjgx2-c0BY__I1E7-rQKg";

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

  const handleFlipCard = () => {
    soundPlay(CardFlip);
    setCard({
      ...card,
      face: card.face === "up" ? "down" : "up",
    });
  };

  return (
    <div className="cardGenerator">
      <div className="cardButtonsContainer">
        <ChageStatsModal
          openStatsModal={openStatsModal}
          handleCloseStatsModal={handleCloseStatsModal}
          card={card}
          updateStats={updateStats}
        />
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
              <MenuItem onClick={handleGenerateTribute}>
                <AutoAwesomeOutlined className="actionIcon" /> Tribute summon
              </MenuItem>
            </div>
          )}
          {props.type === "monster" && (
            <MenuItem onClick={generateCard}>
              <AutoAwesomeIcon className="actionIcon" /> Summon
            </MenuItem>
          )}
          <MenuItem onClick={handleFlipCard}>
            <ChangeCircleIcon className="actionIcon" /> Flip
          </MenuItem>
          <MenuItem onClick={handleDestroyCard}>
            <DoDisturbIcon className="actionIcon" /> Destroy
          </MenuItem>
        </Menu>
        <AttackModal
          field={props.field}
          openAttack={openAttack}
          handleCloseAttack={handleCloseAttack}
          monsterPosition={monsterPosition}
          card={card}
          handleDestroyCard={handleDestroyCard}
          target={target}
          calculateDamage={calculateDamage}
        />
      </div>
      <div className={card ? "" : "zone"}>
        <img
          onClick={handleCardClick}
          src={
            card?.face === "up" ? card?.card_images[0].image_url : cardBackUrl
          }
          alt="magic card"
          className={
            monsterPosition === "def" ? "card defenseMode" : "card attackMode"
          }
        />
      </div>
      <div onClick={handleOpenStatsModal}>
        {props.type === "monster" && card?.face === "up" && (
          <div className="monsterAtkDef">{`ATK ${card?.atk || 0} / DEF ${
            card?.def || 0
          }`}</div>
        )}
      </div>
    </div>
  );
};

export default CardGenerator;
