import { useState } from "react";

export const useStandbyPhase = () => {
  const [standbyPhaseText, setStandbyPhaseText] = useState(
    localStorage.getItem("standby-phase-text")
  );

  const handleText = (e) => {
    setStandbyPhaseText(e.target.value);
    localStorage.setItem("standby-phase-text", e.target.value);
  };

  const handleDeleteText = () => {
    setStandbyPhaseText("");
    localStorage.setItem("standby-phase-text", "");
  };

  return {
    standbyPhaseText,
    handleText,
    handleDeleteText,
  };
};
