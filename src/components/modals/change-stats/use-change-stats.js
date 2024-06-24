import { useState } from "react";

export const useChangeStats = (props) => {
  const [newAtk, setNewAtk] = useState();
  const [newDef, setNewDef] = useState();

  const handleNewAtk = (e) => {
    setNewAtk(e.target.value);
  };

  const handleNewDef = (e) => {
    setNewDef(e.target.value);
  };

  const handleUpdateStats = () => {
    props.updateStats(newAtk, newDef);
    setNewAtk(undefined);
    setNewDef(undefined);
  };

  return { handleNewAtk, handleNewDef, handleUpdateStats, newAtk, newDef };
};
