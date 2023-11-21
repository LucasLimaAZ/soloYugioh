import Card from "../card";
import useField from "../../shared/hooks/field";
import { Box, Link, Paper } from "@mui/material";

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
    <Paper sx={{ paddingX: "2%", margin: "30px 0 0 2%" }}>
      <Box display="flex" justifyContent="space-between">
        {[...Array(5)].map((e, i) => (
          <Link
            key={i}
            sx={{ margin: "50px 10px", textDecoration: "none" }}
            onClick={() => handleMagicClick(i)}
          >
            <Card type="magic" position={i} card={field[i]} />
          </Link>
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between">
        {[...Array(5)].map((e, i) => (
          <Link
            key={i}
            sx={{ margin: "50px 10px", textDecoration: "none" }}
            onClick={() => handleMonsterClick(5 + i)}
          >
            <Card type="monster" position={5 + i} card={field[5 + i]} />
          </Link>
        ))}
      </Box>
    </Paper>
  );
};

export default Field;
