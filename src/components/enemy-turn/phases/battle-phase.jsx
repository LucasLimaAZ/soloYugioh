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
  const { battlePhasePriority, bpAttackOrder } = useEnemyActions();

  return (
    <Box sx={{ marginTop: "10px" }}>
      <Typography variant="h6">Enemy declares attack with:</Typography>
      <Box display="flex" gap="8px">
        {bpAttackOrder.map((card, index) => (
          <Box sx={{ textAlign: "center" }} key={`${card.name}-${index}`}>
            <Box
              component="img"
              sx={{ maxWidth: "100%", borderRadius: "50%" }}
              src={card.card_images[0].image_url_cropped}
            />
            <Typography variant="body1">{card.atk}</Typography>
          </Box>
        ))}
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Attack priority</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {battlePhasePriority.map((priority, index) => (
            <Typography key={index}>
              {index + 1} - {priority}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BattlePhase;
