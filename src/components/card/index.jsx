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

const Card = ({ card, type, position }) => {
  const { changeMonsterPosition, destroyCard, flipCard } = useField();
  const { sendToGraveyard } = useGraveyard();
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
    sendToGraveyard(card);
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
    </Box>
  );
};

export default Card;
