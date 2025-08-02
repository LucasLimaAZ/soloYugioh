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

  const setPlayerLp = (newLp, playsound = true) => {
    const lp = Math.max(0, newLp);
    setPlayerLifePoints(lp);

    if (playsound) {
      playDamageSound();
      if (lp === 0) {
        setTimeout(() => {
          playSound("finish-duel");
        }, 1200);

        setTimeout(() => {
          playSound("player-defeat");
        }, 2000);
      }
    }
  };

  const setOpponentLp = (newLp, playsound = true) => {
    const lp = Math.max(0, newLp);
    setOpponentLifePoints(lp);

    if (playsound) {
      playDamageSound();
      if (lp === 0) {
        setTimeout(() => {
          playSound("finish-duel");
        }, 1200);

        setTimeout(() => {
          playSound("player-victory");
        }, 2000);
      }
    }
  };

  return {
    playerLp,
    setPlayerLp,
    opponentLp,
    setOpponentLp,
  };
};

export default useLifePoints;
