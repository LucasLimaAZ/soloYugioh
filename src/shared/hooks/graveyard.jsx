import { graveyardAtom } from "../atoms";
import { useAtom } from "jotai";

const useGraveyard = () => {
  const [graveyard, setGraveyard] = useAtom(graveyardAtom);

  const sendToGraveyard = (card) => {
    setGraveyard(graveyard.concat(card));
  };

  const resetGraveyard = () => {
    setGraveyard([]);
  };

  const banishCard = (removedCard) => {
    setGraveyard(graveyard.filter((card) => card.attribute !== removedCard));
  };

  const banishLightAndDarkFromGy = () => {
    const lightCard = graveyard.find((card) => card?.attribute === "LIGHT");
    const darkCard = graveyard.find((card) => card?.attribute === "DARK");

    setGraveyard(
      graveyard.filter((card) => card !== lightCard && card !== darkCard)
    );
  };

  return {
    sendToGraveyard,
    graveyard,
    resetGraveyard,
    banishCard,
    banishLightAndDarkFromGy,
  };
};

export default useGraveyard;
