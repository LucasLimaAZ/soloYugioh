import React from "react";
import useGraveyard from "../../shared/hooks/graveyard";
import { Box, Typography } from "@mui/material";

const Graveyard = () => {
  const { graveyard } = useGraveyard();

  return (
    <Box
      sx={{
        maxHeight: "300px",
        overflow: "auto",
        padding: "2%",
      }}
    >
      <Typography variant="body1">Graveyard({graveyard.length}): </Typography>
      {graveyard?.map((card, index) => (
        <Box key={index}>
          <Typography variant="caption">{card.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Graveyard;
