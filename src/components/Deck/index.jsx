import React from "react";
import CardIMG from "../../assets/img/yugioh-back.jpg";
import useDeck from "../../shared/hooks/deck";
import { Box, Typography } from "@mui/material";
import useField from "../../shared/hooks/field";

const Deck = () => {
  const { drawCard, deck } = useDeck();
  const { rotateBoard } = useField();

  return (
    <Box
      sx={{
        cursor: "pointer",
      }}
      onClick={drawCard}
    >
      <Box
        sx={{
          width: "100%",
          transform: rotateBoard && "rotate(180deg)",
        }}
        component="img"
        src={CardIMG}
        alt="deckcard"
      />
      <Box>
        <Typography textAlign="center">{deck}</Typography>
      </Box>
    </Box>
  );
};

export default Deck;
