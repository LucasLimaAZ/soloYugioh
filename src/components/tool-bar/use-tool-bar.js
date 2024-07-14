import { useState } from "react";
import useField from "../../shared/hooks/field";

export const useToolBar = () => {
  const [coin, setCoin] = useState("Heads");
  const [dice, setDice] = useState("6");
  const { selectedCard } = useField();
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const handleDice = () => {
    setDice("Rolling...");
    setTimeout(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
    }, 400);
  };

  const handleCoin = () => {
    let result = Math.floor(Math.random() * 2) + 1;

    if (result === 1) {
      setCoin("Flipping...");
      setTimeout(() => {
        setCoin("Heads");
      }, 400);
    } else {
      setCoin("Flipping...");
      setTimeout(() => {
        setCoin("Tails");
      }, 400);
    }
  };

  const handleOpenSettings = () => {
    setIsOpenSettings(!isOpenSettings);
  };

  const handleCloseSettings = () => {
    setIsOpenSettings(false);
  };

  return {
    coin,
    dice,
    selectedCard,
    handleDice,
    handleCoin,
    isOpenSettings,
    setIsOpenSettings,
    handleOpenSettings,
    handleCloseSettings,
  };
};
