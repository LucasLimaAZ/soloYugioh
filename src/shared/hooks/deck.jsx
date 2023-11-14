import { deckAtom } from "../atoms";
import { useAtom } from "jotai";
import { playSound } from "../helper";

const useDeck = () => {
  const [deck, setDeck] = useAtom(deckAtom);

  const drawCard = () => {
    if (deck < 1) return;
    setDeck(deck - 1);
    playSound("flip-card");
  };

  return { drawCard, deck };
};

export default useDeck;
