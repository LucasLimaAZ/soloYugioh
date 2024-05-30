import React from "react";
import CardIMG from "../../assets/img/yugioh-back.jpg";
import useDeck from "../../shared/hooks/deck";
import { Box, Paper, Typography } from "@mui/material";

const Deck = () => {
  const { drawCard, deck } = useDeck();

  return (
    <Paper sx={{ paddingX: "2%", margin: "30px 0 2% 0" }}>
      <Box
        sx={{
          cursor: "pointer",
          img: {
            width: "70%",
          },
        }}
        onClick={drawCard}
      >
        <Box
          sx={{ marginTop: "15%" }}
          component="img"
          src={CardIMG}
          alt="deckcard"
        />
        <Box
          sx={{ marginTop: "-300px", marginLeft: "5px" }}
          component="img"
          src={CardIMG}
          alt="deckcard"
        />
        <Box
          sx={{ marginTop: "-298px", marginLeft: "7px" }}
          component="img"
          src={CardIMG}
          alt="deckcard"
        />
        <Box
          sx={{ marginTop: "-296px", marginLeft: "9px" }}
          component="img"
          src={CardIMG}
          alt="deckcard"
        />
        <Box>
          <Typography>{deck}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Deck;
