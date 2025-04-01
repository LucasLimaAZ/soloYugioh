import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import useEnemyActions from "../../../shared/hooks/enemy-actions";

const MainPhase = () => {
  const { mainPhase } = useEnemyActions();

  return (
    <Box>
      <Box paddingY="12px">
        {mainPhase.map((action) => (
          <Typography key={action}>{action}</Typography>
        ))}
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
