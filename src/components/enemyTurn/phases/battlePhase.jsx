import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import useEnemyActions from "../../../shared/hooks/enemyActions";

const BattlePhase = () => {
  const { battlePhasePriority } = useEnemyActions();

  return (
    <Box sx={{ marginTop: "10px" }}>
      <Typography variant="h6">Enemy declares attack with:</Typography>
      <Typography>- Weakest atk monster first</Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Attack priority</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {battlePhasePriority}
          <Typography>- Direct Attack</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BattlePhase;
