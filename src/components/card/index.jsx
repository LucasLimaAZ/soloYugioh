import React, { useState } from "react";
import { Menu, MenuItem, Box } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import backCard from "../../assets/img/yugioh-back.jpg";
import useField from "../../shared/hooks/field";
import useGraveyard from "../../shared/hooks/graveyard";
import useLifePoints from "../../shared/hooks/lifepoints";
import AttackModal from "../attackCard";

const Card = ({ card, type, position }) => {
  const {
    changeMonsterPosition,
    destroyCard,
    flipCard,
    generateTributeMonster,
    selectCard,
  } = useField();
  const { sendToGraveyard } = useGraveyard();
  const { setPlayerLp } = useLifePoints();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAttackModal, setOpenAttackModal] = useState();
  const [target, setTarget] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    selectCard(card);
  };

  const handleTribute = () => {
    generateTributeMonster(position);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePosition = () => {
    changeMonsterPosition(position);
    handleClose();
  };

  const handleDestroy = () => {
    destroyCard(position);
    sendToGraveyard(card);
    handleClose();
  };

  const handleFlip = () => {
    flipCard(position);
    handleClose();
  };

  const handleDirectAttack = () => {
    setPlayerLp((prevLp) => prevLp - card.atk);
  };

  const handleAttack = () => {
    setTarget("opponent");
    setOpenAttackModal(true);
  };

  const handleMonsterAttack = () => {
    setTarget("you");
    setOpenAttackModal(true);
  };

  const ContextMenuItems = () => (
    <>
      {type === "monster" && (
        <>
          <MenuItem onClick={handleAttack}>
            <CompareArrowsIcon /> Attack
          </MenuItem>
          <MenuItem onClick={handleMonsterAttack}>
            <CompareArrowsIcon /> Monster attack
          </MenuItem>
          <MenuItem onClick={handleDirectAttack}>
            <ArrowRightAltIcon /> Direct attack
          </MenuItem>
          <MenuItem onClick={handleChangePosition}>
            <SwipeRightIcon className="actionIcon" /> Change position
          </MenuItem>
          <MenuItem onClick={handleTribute}>
            <AutoAwesomeOutlined /> Tribute summon
          </MenuItem>
        </>
      )}
      <MenuItem onClick={handleFlip}>
        <ChangeCircleIcon className="actionIcon" /> Flip
      </MenuItem>
      <MenuItem onClick={handleDestroy}>
        <DoDisturbIcon className="actionIcon" /> Destroy
      </MenuItem>
    </>
  );

  return (
    <Box
      sx={{
        width: "188px",
        height: "300px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
      }}
      id="card-context"
      aria-controls={open ? "card-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
    >
      <Menu
        id="card-menu"
        MenuListProps={{
          "aria-labelledby": "card-context",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <ContextMenuItems />
      </Menu>
      {card && (
        <Box
          component="img"
          onClick={handleClick}
          src={card.face_down ? backCard : card.card_images[0].image_url}
          alt="magic card"
          sx={{
            transform: card.def_mode ? "rotate(90deg)" : "",
            width: "188px",
            height: "300px",
          }}
        />
      )}
      <AttackModal
        card={card}
        openAttack={openAttackModal}
        handleCloseAttack={() => setOpenAttackModal(false)}
        handleDestroyCard={handleDestroy}
        target={target}
      />
    </Box>
  );
};

export default Card;
