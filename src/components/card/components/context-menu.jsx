import { MenuItem, Menu, Box } from "@mui/material";
import {
  CompareArrows,
  ArrowRightAlt,
  SwipeRight,
  AutoAwesomeOutlined,
  AddCircleOutline,
  Search,
  ChangeCircle,
  DoDisturb,
} from "@mui/icons-material";

const CardContextMenu = ({
  type,
  handleAttack,
  handleChangePosition,
  handleDirectAttack,
  handleEquip,
  handleFlip,
  handleMonsterAttack,
  handleSearchCard,
  handleTribute,
  handleDestroy,
  anchorEl,
  openContextMenu,
  handleClose,
}) => {
  return (
    <Menu
      id="card-menu"
      MenuListProps={{
        "aria-labelledby": "card-context",
      }}
      anchorEl={anchorEl}
      open={openContextMenu}
      onClose={handleClose}
    >
      {type === "monster" && (
        <Box>
          <MenuItem onClick={handleAttack}>
            <CompareArrows /> Attack
          </MenuItem>
          <MenuItem onClick={handleMonsterAttack}>
            <CompareArrows /> Monster attack
          </MenuItem>
          <MenuItem onClick={handleDirectAttack}>
            <ArrowRightAlt /> Direct attack
          </MenuItem>
          <MenuItem onClick={handleChangePosition}>
            <SwipeRight /> Change position
          </MenuItem>
          <MenuItem onClick={handleTribute}>
            <AutoAwesomeOutlined /> Tribute summon
          </MenuItem>
          <MenuItem onClick={handleEquip}>
            <AddCircleOutline /> Equip card
          </MenuItem>
        </Box>
      )}
      <MenuItem onClick={handleSearchCard}>
        <Search /> Search card
      </MenuItem>
      <MenuItem onClick={handleFlip}>
        <ChangeCircle /> Flip
      </MenuItem>
      <MenuItem onClick={handleDestroy}>
        <DoDisturb /> Destroy
      </MenuItem>
    </Menu>
  );
};

export default CardContextMenu;
