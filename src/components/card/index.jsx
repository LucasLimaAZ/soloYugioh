import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import "./style.scss";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import backCard from "../../assets/img/yugioh-back.jpg";
import { useField } from "../../shared/hooks/hooks";

const Card = ({ card, type, position }) => {
  const { changeMonsterPosition, destroyCard, flipCard } = useField();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
    handleClose();
  };

  const handleFlip = () => {
    flipCard(position);
    handleClose();
  };

  const ContextMenuItems = () => (
    <>
      {type === "monster" && (
        <>
          <MenuItem onClick={() => {}}>
            <CompareArrowsIcon className="actionIcon flip" />
            Attack
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <CompareArrowsIcon className="actionIcon" />
            Monster attack
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <ArrowRightAltIcon className="actionIcon rotate180" />
            Direct attack
          </MenuItem>
          <MenuItem onClick={handleChangePosition}>
            <SwipeRightIcon className="actionIcon" /> Change position
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <AutoAwesomeOutlined className="actionIcon" /> Tribute summon
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
    <div
      className="card"
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
        <img
          onClick={handleClick}
          src={card.face_down ? backCard : card.card_images[0].image_url}
          alt="magic card"
          className={card.def_mode ? "card defenseMode" : "card"}
        />
      )}
    </div>
  );
};

export default Card;
