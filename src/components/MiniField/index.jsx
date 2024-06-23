import React from "react";
import { Box } from "@mui/material";
import CardBackIMG from "../../assets/img/yugioh-back.jpg";

const MiniField = ({ card }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box
          component="img"
          sx={{
            width: "100px",
            opacity: card.fieldPosition === 0 ? "1" : "0.5",
            margin: "3px",
          }}
          src={
            card.fieldPosition === 0
              ? card.card_images[0].image_url_small
              : CardBackIMG
          }
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{
            width: "100px",
            opacity: card.fieldPosition === 1 ? "1" : "0.5",
            margin: "3px",
          }}
          src={
            card.fieldPosition === 1
              ? card.card_images[0].image_url_small
              : CardBackIMG
          }
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{
            width: "100px",
            opacity: card.fieldPosition === 2 ? "1" : "0.5",
            margin: "3px",
          }}
          src={
            card.fieldPosition === 2
              ? card.card_images[0].image_url_small
              : CardBackIMG
          }
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{
            width: "100px",
            opacity: card.fieldPosition === 3 ? "1" : "0.5",
            margin: "3px",
          }}
          src={
            card.fieldPosition === 3
              ? card.card_images[0].image_url_small
              : CardBackIMG
          }
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{
            width: "100px",
            opacity: card.fieldPosition === 4 ? "1" : "0.5",
            margin: "3px",
          }}
          src={
            card.fieldPosition === 4
              ? card.card_images[0].image_url_small
              : CardBackIMG
          }
          alt="mini-card"
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box
          component="img"
          sx={{ width: "100px", opacity: "0.5", margin: "3px" }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{ width: "100px", opacity: "0.5", margin: "3px" }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{ width: "100px", opacity: "0.5", margin: "3px" }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{ width: "100px", opacity: "0.5", margin: "3px" }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{ width: "100px", opacity: "0.5", margin: "3px" }}
          src={CardBackIMG}
          alt="mini-card"
        />
      </Box>
    </Box>
  );
};

export default MiniField;
