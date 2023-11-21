import React from "react";
import { Box } from "@mui/material";
import CardBackIMG from "../../assets/img/yugioh-back.jpg";

const MiniField = (props) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box
          component="img"
          sx={{
            width: "45px",
            opacity: props.cardIndex === 0 ? "1" : "0.5",
            margin: "3px",
          }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{
            width: "45px",
            opacity: props.cardIndex === 1 ? "1" : "0.5",
            margin: "3px",
          }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{
            width: "45px",
            opacity: props.cardIndex === 2 ? "1" : "0.5",
            margin: "3px",
          }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{
            width: "45px",
            opacity: props.cardIndex === 3 ? "1" : "0.5",
            margin: "3px",
          }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{
            width: "45px",
            opacity: props.cardIndex === 4 ? "1" : "0.5",
            margin: "3px",
          }}
          src={CardBackIMG}
          alt="mini-card"
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box
          component="img"
          sx={{ width: "45px", opacity: "0.5", margin: "3px" }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{ width: "45px", opacity: "0.5", margin: "3px" }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{ width: "45px", opacity: "0.5", margin: "3px" }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{ width: "45px", opacity: "0.5", margin: "3px" }}
          src={CardBackIMG}
          alt="mini-card"
        />
        <Box
          component="img"
          sx={{ width: "45px", opacity: "0.5", margin: "3px" }}
          src={CardBackIMG}
          alt="mini-card"
        />
      </Box>
    </Box>
  );
};

export default MiniField;
