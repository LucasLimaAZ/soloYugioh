import React from "react";
import useGraveyard from "../../shared/hooks/graveyard";
import { Box, Typography } from "@mui/material";
import SpellImg from "../../assets/img/attributes/spell.png";
import TrapImg from "../../assets/img/attributes/trap.png";
import DarkImg from "../../assets/img/attributes/dark.png";
import LightImg from "../../assets/img/attributes/light.png";
import WindImg from "../../assets/img/attributes/wind.png";
import EarthImg from "../../assets/img/attributes/earth.png";
import WaterImg from "../../assets/img/attributes/water.png";
import FireImg from "../../assets/img/attributes/fire.png";
import DivineImg from "../../assets/img/attributes/divine.png";

const Graveyard = () => {
  const { graveyard, banishCard } = useGraveyard();
  const attributes = {
    LIGHT: LightImg,
    DARK: DarkImg,
    WATER: WaterImg,
    FIRE: FireImg,
    EARTH: EarthImg,
    WIND: WindImg,
    DIVINE: DivineImg,
  };

  return (
    <Box
      sx={{
        maxHeight: "300px",
        overflow: "auto",
        padding: "2%",
      }}
    >
      <Typography variant="body1">Graveyard ({graveyard.length}):</Typography>
      {graveyard?.map((card, index) => {
        let attributeImg = attributes[card.attribute];

        if (!attributeImg) {
          if (card.type.includes("Spell")) {
            attributeImg = SpellImg;
          } else if (card.type.includes("Trap")) {
            attributeImg = TrapImg;
          }
        }

        return (
          <Box key={index} onClick={() => banishCard(card)}>
            <Typography
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "line-through",
                },
              }}
              variant="caption"
            >
              <Box
                component="img"
                width="14px"
                src={attributeImg}
                alt={card.name}
              />{" "}
              {card.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Graveyard;
