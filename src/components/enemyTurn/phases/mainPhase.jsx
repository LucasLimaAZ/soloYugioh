import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import useEnemyActions from "../../../shared/hooks/enemyActions";

const MainPhase = () => {
  const { mainPhase } = useEnemyActions();

  return (
    <Box style={{ marginTop: "10px" }}>
      <Box>{mainPhase}</Box>
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
