import { useAtom } from "jotai";
import { playerInfoAtom } from "../atoms";

const UsePlayerInfo = () => {
  const [playerInfo, setPlayerInfo] = useAtom(playerInfoAtom);

  const addMonster = () => {
    setPlayerInfo([...playerInfo, { id: playerInfo.monsters.length }]);
  };

  const setStat = (value, index) => {
    setPlayerInfo((prevState) => ({
      ...prevState,
      monsters: prevState.monsters.map((monster, i) =>
        i === index ? { ...monster, stat: value } : monster
      ),
    }));
  };

  const togglePosition = (index) => {
    setPlayerInfo((prevState) => ({
      ...prevState,
      monsters: prevState.monsters.map((monster, i) =>
        i === index ? { ...monster, isDefense: !monster.isDefense } : monster
      ),
    }));
  };

  return {
    playerInfo,
    setStat,
    togglePosition,
    addMonster,
  };
};

export default UsePlayerInfo;
