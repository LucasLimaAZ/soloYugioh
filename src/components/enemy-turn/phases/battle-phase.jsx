import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import useEnemyActions from "../../../shared/hooks/enemy-actions";

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
          {battlePhasePriority.map((priority, index) => (
            <Typography>
              {index + 1} - {priority}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BattlePhase;
