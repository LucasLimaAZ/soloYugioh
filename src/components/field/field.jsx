import Card from "../card/card";
import useField from "../../shared/hooks/field";
import { Box, Paper } from "@mui/material";
import Deck from "../deck/deck";
import Graveyard from "../graveyard/graveyard";

const Field = () => {
  const { handleMonsterClick, handleMagicClick, field, rotateBoard } =
    useField();

  return (
    <Box
      sx={
        rotateBoard && {
          perspective: "1200px",
          maxWidth: "80%",
          margin: "auto",
        }
      }
    >
      <Paper
        sx={{
          padding: "2%",
          margin: "0   0 0 2%",
          backgroundColor: "rgba(255, 255, 255, 0.2);",
          transform: rotateBoard && "rotateX(30deg)",
        }}
      >
        <Box display="flex" gap="64px" justifyContent="space-between">
          <Box sx={{ width: "100%" }} key={"deck"}>
            <Deck />
          </Box>
          {[...Array(5)].map((_, i) => (
            <Box
              sx={{ width: "100%" }}
              onClick={() => handleMagicClick(i)}
              key={i}
            >
              <Card type="magic" position={i} card={field[i]} />
            </Box>
          ))}
        </Box>
        <Box
          marginY="32px"
          display="flex"
          gap="64px"
          justifyContent="space-between"
        >
          <Box sx={{ width: "100%" }} key={"grave"}>
            <Graveyard />
          </Box>
          {[...Array(5)].map((_, i) => (
            <Box
              sx={{ width: "100%" }}
              onClick={() => handleMonsterClick(5 + i)}
              key={i}
            >
              <Card type="monster" position={5 + i} card={field[5 + i]} />
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Field;
