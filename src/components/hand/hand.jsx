import { Box } from "@mui/material";
import CardIMG from "../../assets/img/yugioh-back.jpg";
import useHand from "../../shared/hooks/hand";
import useGraveyard from "../../shared/hooks/graveyard";

const Hand = () => {
  const { hand, decreaseHand } = useHand();
  const { addRandomCardToGy } = useGraveyard();

  const handleDecreaseHand = () => {
    decreaseHand();
    addRandomCardToGy();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap="16px"
      marginTop="32px"
      marginBottom="-32px"
    >
      {[...Array(hand)].map((_, index) => (
        <Box
          key={`hand-${index}`}
          onClick={handleDecreaseHand}
          component="img"
          src={CardIMG}
          sx={{ width: "120px" }}
        />
      ))}
    </Box>
  );
};

export default Hand;
