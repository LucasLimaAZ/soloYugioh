import { useState } from "react";
import useLifePoints from "../../shared/hooks/life-points";
import useField from "../../shared/hooks/field";
import useDeck from "../../shared/hooks/deck";
import useGraveyard from "../../shared/hooks/graveyard";
import { playSound } from "../../shared/helper";

export const useScoreBoard = () => {
  const [lpInput, setLpInput] = useState(0);
  const [opponentLpInput, setOpponentLpInput] = useState(0);
  const [previousLp, setPreviousLp] = useState(8000);
  const [opponentPreviousLp, setOpponentPreviousLp] = useState(8000);

  const { playerLp, setPlayerLp, opponentLp, setOpponentLp } = useLifePoints();
  const { resetField } = useField();
  const { resetDeck } = useDeck();
  const { resetGraveyard } = useGraveyard();

  const damageOptions = Array.from(new Array(100)).map(
    (_, index) => `${index * 100}`
  );

  const handleAddPlayerLp = () => {
    setPreviousLp(playerLp);
    setPlayerLp(Number(playerLp) + Number(lpInput));
  };

  const handleSubtractPlayerLp = () => {
    setPreviousLp(playerLp);
    setPlayerLp(Number(playerLp) - Number(lpInput));
  };

  const handleAddOpponentLp = () => {
    setOpponentPreviousLp(opponentLp);
    setOpponentLp(Number(opponentLp) + Number(opponentLpInput));
  };

  const handleSubtractOpponentLp = () => {
    setOpponentPreviousLp(opponentLp);
    setOpponentLp(Number(opponentLp) - Number(opponentLpInput));
  };

  const handleLpInputChange = (e) => {
    setLpInput(e.target.value);
  };

  const handleLpOptionChange = ({ _reactName }, newInputValue) => {
    if (_reactName !== "onBlur") {
      setLpInput(newInputValue);
    }
  };

  const handleOpponentInputChange = (e) => {
    setOpponentLpInput(e.target.value);
  };

  const handleOpponentOptionChange = ({ _reactName }, newInputValue) => {
    if (_reactName !== "onBlur") {
      setOpponentLpInput(newInputValue);
    }
  };

  const handleResetDuel = () => {
    localStorage.setItem("standby-phase-text", "");
    setPlayerLp(8000);
    setOpponentLp(8000);
    resetField();
    resetDeck();
    resetGraveyard();
    setTimeout(() => playSound("start-duel"), 1400);
  };

  return {
    handleResetDuel,
    handleOpponentInputChange,
    handleOpponentOptionChange,
    handleLpOptionChange,
    handleLpInputChange,
    handleSubtractOpponentLp,
    handleAddOpponentLp,
    handleSubtractPlayerLp,
    handleAddPlayerLp,
    damageOptions,
    previousLp,
    opponentPreviousLp,
    opponentLp,
    playerLp,
  };
};
