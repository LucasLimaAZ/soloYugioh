import { useState } from "react";

export const useMainPhase = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return { anchorEl, setAnchorEl, menuOpen, handleClick, handleClose };
};
