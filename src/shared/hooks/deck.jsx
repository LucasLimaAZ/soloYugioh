import { deckAtom } from "../atoms";
import { useAtom } from "jotai";
import { playSound } from "../helper";
import useHand from "./hand";

const useDeck = () => {
  const [deck, setDeck] = useAtom(deckAtom);
  const { increaseHand } = useHand();

  const drawCard = () => {
    if (deck < 1) return;
    setDeck(deck - 1);
    playSound("flip-card");
    increaseHand();
  };

  const resetDeck = () => {
    setDeck(35);
  };

  return { drawCard, deck, resetDeck };
};

export default useDeck;
