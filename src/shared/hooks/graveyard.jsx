import { graveyardAtom } from "../atoms";
import { useAtom } from "jotai";
import { getRandomGoatFormatCard } from "../services/cards";

const useGraveyard = () => {
  const [graveyard, setGraveyard] = useAtom(graveyardAtom);

  const sendToGraveyard = (card) => {
    setGraveyard(graveyard.concat(card));
  };

  const resetGraveyard = () => {
    setGraveyard([]);
  };

  const banishCard = (removedCard) => {
    setGraveyard(graveyard.filter((card) => card !== removedCard));
  };

  const banishLightAndDarkFromGy = () => {
    const lightCard = graveyard.find((card) => card?.attribute === "LIGHT");
    const darkCard = graveyard.find((card) => card?.attribute === "DARK");

    setGraveyard(
      graveyard.filter((card) => card !== lightCard && card !== darkCard)
    );
  };

  const addRandomCardToGy = async () => {
    const randomCard = await getRandomGoatFormatCard();
    setGraveyard(graveyard.concat(randomCard));
  };

  return {
    sendToGraveyard,
    graveyard,
    resetGraveyard,
    banishCard,
    banishLightAndDarkFromGy,
    addRandomCardToGy,
  };
};

export default useGraveyard;
