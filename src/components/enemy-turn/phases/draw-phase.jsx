import { Typography, Box, Button } from "@mui/material";
import useDeck from "../../../shared/hooks/deck";

const DrawPhase = () => {
  const { drawCard } = useDeck();

  return (
    <Box>
      <Typography variant="body1">Enemy draws 1 card</Typography>
      <Button sx={{ marginTop: "16px" }} variant="contained" onClick={drawCard}>
        Draw
      </Button>
    </Box>
  );
};

export default DrawPhase;
