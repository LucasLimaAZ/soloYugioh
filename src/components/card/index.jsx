import React, { useState } from "react";
import { Menu, MenuItem, Box, Typography, Grow } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import backCard from "../../assets/img/yugioh-back.jpg";
import useField from "../../shared/hooks/field";
import useGraveyard from "../../shared/hooks/graveyard";
import useLifePoints from "../../shared/hooks/lifePoints";
import AttackModal from "../attackCard";
import ChangeStatsModal from "../changeStatsModal";

const Card = ({ card, type, position }) => {
  const {
    changeMonsterPosition,
    destroyCard,
    flipCard,
    generateTributeMonster,
    selectCard,
    generateEquipCard,
  } = useField();
  const { sendToGraveyard } = useGraveyard();
  const { playerLp, setPlayerLp } = useLifePoints();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAttackModal, setOpenAttackModal] = useState();
  const [openChangeStatsModal, setOpenChangeStatsModal] = useState();
  const [target, setTarget] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (!card.face_down) selectCard(card);
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
    setPlayerLp(playerLp - card.atk);
  };

  const handleAttack = () => {
    setTarget("opponent");
    setOpenAttackModal(true);
  };

  const handleMonsterAttack = () => {
    setTarget("you");
    setOpenAttackModal(true);
  };

  const handleStatsClick = () => {
    setOpenChangeStatsModal(true);
  };

  const handleUpdateStats = (newAtk, newDef) => {
    if (newAtk) card.atk = newAtk;
    if (newDef) card.def = newDef;
    setOpenChangeStatsModal(false);
  };

  const handleEquip = () => {
    generateEquipCard();
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
          <MenuItem onClick={handleEquip}>
            <AddCircleOutlineIcon /> Equip card
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
        width: "100%",
        paddingBottom: !card && "146%",
        backgroundColor: !card && "rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
      }}
    >
      <Box
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
          <Box sx={{ transform: card.def_mode && "rotate(90deg)" }}>
            <Grow in>
              <Box
                component="img"
                onClick={handleClick}
                src={card.face_down ? backCard : card.card_images[0].image_url}
                alt="magic card"
                sx={{ width: "100%" }}
              />
            </Grow>
          </Box>
        )}
        <AttackModal
          card={card}
          openAttack={openAttackModal}
          handleCloseAttack={() => setOpenAttackModal(false)}
          handleDestroyCard={handleDestroy}
          target={target}
        />
        <ChangeStatsModal
          card={card}
          handleCloseStatsModal={() => setOpenChangeStatsModal(false)}
          openStatsModal={openChangeStatsModal}
          updateStats={handleUpdateStats}
        />
      </Box>
      {card?.level && !card?.face_down && (
        <Typography
          onClick={handleStatsClick}
          textAlign="center"
          color="#0f0f0f"
        >
          {card.atk} / {card.def}
        </Typography>
      )}
    </Box>
  );
};

export default Card;
