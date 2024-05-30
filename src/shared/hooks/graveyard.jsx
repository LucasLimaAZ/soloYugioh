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

  return { sendToGraveyard, graveyard, resetGraveyard };
};

export default useGraveyard;
