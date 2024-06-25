import { opponentLpAtom, playerLpAtom } from "../atoms";
import { useAtom } from "jotai";
import { playSound } from "../helper";

const useLifePoints = () => {
  const [playerLp, setPlayerLifePoints] = useAtom(playerLpAtom);
  const [opponentLp, setOpponentLifePoints] = useAtom(opponentLpAtom);

  const playDamageSound = () => {
    playSound("lp-damage");
    setTimeout(() => {
      playSound("calculated-damage");
    }, 700);
  };

  const setPlayerLp = (newLp) => {
    if (newLp <= 0) {
      setPlayerLifePoints(0);
      playDamageSound();
      setTimeout(() => {
        playSound("finish-duel");
      }, 1200);
      return;
    }

    setPlayerLifePoints(newLp);
    playDamageSound();
  };

  const setOpponentLp = (newLp) => {
    if (newLp <= 0) {
      playDamageSound();
      setOpponentLifePoints(0);
      setTimeout(() => {
        playSound("finish-duel");
      }, 1200);
      return;
    }

    setOpponentLifePoints(newLp);
    playDamageSound();
  };

  return {
    playerLp,
    setPlayerLp,
    opponentLp,
    setOpponentLp,
  };
};

export default useLifePoints;
