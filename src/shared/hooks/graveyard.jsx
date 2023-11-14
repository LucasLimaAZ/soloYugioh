import { graveyardAtom } from "../atoms";
import { useAtom } from "jotai";

const useGraveyard = () => {
  const [graveyard, setGraveyard] = useAtom(graveyardAtom);

  const sendToGraveyard = (card) => {
    setGraveyard(graveyard.concat(card));
  };

  return { sendToGraveyard, graveyard };
};

export default useGraveyard;
