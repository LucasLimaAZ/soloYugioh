import { enemyMainPhaseActions, enemyBattlePhaseActions } from "../atoms";
import { useAtom } from "jotai";
import { Box, Typography } from "@mui/material";
import {
  mainPhaseMagicTrap,
  mainPhaseMonster,
  mainPhaseMonsterWithTribute,
} from "../actions/mainPhaseActions";
import {
  attackDefenseMonster,
  attackMonster,
  attackSetMonster,
  attackTieMonster,
} from "../actions/battlePhaseActions";
import useField from "./field";

const useEnemyActions = () => {
  const [mainPhase, setMainPhase] = useAtom(enemyMainPhaseActions);
  const [battlePhasePriority, setBattlePhasePriority] = useAtom(
    enemyBattlePhaseActions
  );
  const { field } = useField();

  const hasLowLevelMonster = () => {
    let lowLevelMonsters = field.filter((card) => card.level < 5);
    return lowLevelMonsters.length > 0;
  };

  const randomAction = (actionArray) => {
    return actionArray[Math.floor(Math.random() * actionArray.length)];
  };

  const generateBattlePhase = () => {
    const attackMonsterAction = randomAction(attackMonster);
    const attackDefenseMonsterAction = randomAction(attackDefenseMonster);
    const attackSetMonsterAction = randomAction(attackSetMonster);
    const attackTieMonsterAction = randomAction(attackTieMonster);

    setBattlePhasePriority(
      <Box>
        <Typography>{attackMonsterAction}</Typography>
        <Typography>{attackDefenseMonsterAction}</Typography>
        <Typography>{attackSetMonsterAction}</Typography>
        <Typography>{attackTieMonsterAction}</Typography>
      </Box>
    );
  };

  const generateMainPhase = () => {
    const magicTrapAction = randomAction(mainPhaseMagicTrap);
    let mainPhaseMonsterArray = mainPhaseMonster;

    if (hasLowLevelMonster) {
      mainPhaseMonsterArray = mainPhaseMonster.concat(
        mainPhaseMonsterWithTribute
      );
    }
    const monsterAction = randomAction(mainPhaseMonsterArray);
    setMainPhase(
      <Box>
        <Typography>{magicTrapAction}</Typography>
        <Typography>{monsterAction}</Typography>
      </Box>
    );
  };

  return {
    mainPhase,
    generateMainPhase,
    battlePhasePriority,
    generateBattlePhase,
  };
};

export default useEnemyActions;
