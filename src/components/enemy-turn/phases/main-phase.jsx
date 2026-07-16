import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import useEnemyActions from "../../../shared/hooks/enemy-actions";
import { useMainPhase } from "./use-main-phase.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MainPhase = () => {
  const { mainPhase, generateMainPhase } = useEnemyActions();
  const { anchorEl, handleClick, handleClose, menuOpen } = useMainPhase();

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box paddingY="12px">
          {mainPhase.map((action) => (
            <Typography key={action}>{action}</Typography>
          ))}
        </Box>
        <Box>
          <Button
            id="mp1-btn"
            aria-controls={menuOpen ? "mp1-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="mp1-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "mp1-btn",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                generateMainPhase({ handAfterDraw: false });
                handleClose();
              }}
            >
              Generate new main phase
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>
            If there are no monsters in your side of the field
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Opponent changes DEF position monsters to ATK.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default MainPhase;
