import Card from "../card";
import useField from "../../shared/hooks/field";
import { Box, Paper } from "@mui/material";

const Field = () => {
  const { generateMonster, generateMagicTrap, field } = useField();

  const handleMonsterClick = (position) => {
    if (field[position]) return;
    generateMonster(position);
  };

  const handleMagicClick = (position) => {
    if (field[position]) return;
    generateMagicTrap(position);
  };

  return (
    <Paper sx={{ padding: "2%", margin: "30px 0 0 2%" }}>
      <Box display="flex" gap="64px" justifyContent="space-between">
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
        marginY="50px"
        display="flex"
        gap="64px"
        justifyContent="space-between"
      >
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
  );
};

export default Field;
