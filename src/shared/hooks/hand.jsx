import { useAtom } from "jotai";
import { handAtom } from "../atoms";

const useHand = () => {
  const [hand, setHand] = useAtom(handAtom);

  const decreaseHand = () => {
    setHand(hand - 1);
  };

  const increaseHand = () => {
    setHand(hand + 1);
  };

  return {
    hand,
    setHand,
    decreaseHand,
    increaseHand,
  };
};

export default useHand;
