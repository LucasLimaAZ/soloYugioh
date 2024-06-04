import React from "react";
import useGraveyard from "../../shared/hooks/graveyard";
import { Box, Typography, Paper } from "@mui/material";

const Graveyard = () => {
  const { graveyard } = useGraveyard();

  return (
    <Paper
      sx={{
        paddingX: "2%",
        margin: "30px 0 2% 0",
        backgroundColor: "rgba(255, 255, 255, 0.2);",
      }}
    >
      <Box
        sx={{
          marginTop: "30px",
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
    </Paper>
  );
};

export default Graveyard;
