import { Box } from "@mui/material";
import CardIMG from "../../assets/img/yugioh-back.jpg";
import useHand from "../../shared/hooks/hand";

const Hand = () => {
  const { hand, decreaseHand } = useHand();

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap="16px"
      marginTop="32px"
      marginBottom="-32px"
    >
      {[...Array(hand)].map(() => (
        <Box
          onClick={decreaseHand}
          component="img"
          src={CardIMG}
          sx={{ width: "120px" }}
        />
      ))}
    </Box>
  );
};

export default Hand;
