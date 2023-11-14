import { opponentLpAtom, playerLpAtom } from "../atoms";
import { useAtom } from "jotai";
import { playSound } from "../helper";

const useLifePoints = () => {
  const [playerLp, setPlayerLifePoints] = useAtom(playerLpAtom);
  const [opponentLp, setOpponentLifePoints] = useAtom(opponentLpAtom);

  const setPlayerLp = (newLp) => {
    setPlayerLifePoints(newLp);
    playSound("lp-damage");
    setTimeout(() => {
      playSound("calculated-damage");
    }, 700);
  };

  const setOpponentLp = (newLp) => {
    setOpponentLifePoints(newLp);
    playSound("lp-damage");
    setTimeout(() => {
      playSound("calculated-damage");
    }, 700);
  };

  return {
    playerLp,
    setPlayerLp,
    opponentLp,
    setOpponentLp,
  };
};

export default useLifePoints;
