import {
  enemyMainPhaseActions,
  enemyBattlePhaseActions,
  bpAttackOrderAtom,
} from "../atoms";
import { useAtom } from "jotai";
import {
  mainPhaseMagicTrap,
  mainPhaseMonster,
  mainPhaseMonsterMedium,
  mainPhaseMonsterHard,
  mainPhaseMonsterWithTribute,
} from "../actions/main-phase";
import {
  attackDefenseMonster,
  attackMonster,
  attackSetMonster,
  attackTieMonster,
} from "../actions/battle-phase";
import useField from "./field";
import { useDifficulty } from "./difficulty";
import { useEffect } from "react";
import useHand from "./hand";

const useEnemyActions = () => {
  const [mainPhase, setMainPhase] = useAtom(enemyMainPhaseActions);
  const [bpAttackOrder, setBpAttackOrder] = useAtom(bpAttackOrderAtom);
  const [battlePhasePriority, setBattlePhasePriority] = useAtom(
    enemyBattlePhaseActions
  );
  const { field } = useField();
  const { difficulty } = useDifficulty();
  const { hand } = useHand();

  useEffect(() => {
    updateBattlePhase();
  }, [field]);

  const hasLowLevelMonster = () => {
    let lowLevelMonsters = field.filter((card) => card?.level < 5);
    return lowLevelMonsters.length > 0;
  };

  const randomAction = (actionArray) => {
    return actionArray[Math.floor(Math.random() * actionArray.length)];
  };

  const updateBattlePhase = () => {
    const attackMonsters = field.filter(
      (card) => card?.atk > 0 && !card?.face_down && !card?.def_mode
    );

    setBpAttackOrder(attackMonsters.sort((a, b) => a.atk - b.atk));
  };

  const generateBattlePhase = () => {
    const attackMonsterAction = randomAction(attackMonster);
    const attackDefenseMonsterAction = randomAction(attackDefenseMonster);
    const attackSetMonsterAction = randomAction(attackSetMonster);
    const attackTieMonsterAction = randomAction(attackTieMonster);
    updateBattlePhase();

    setBattlePhasePriority([
      attackMonsterAction,
      attackDefenseMonsterAction,
      attackSetMonsterAction,
      attackTieMonsterAction,
      "Direct attack",
    ]);
  };

  const generateMainPhase = () => {
    const hasMonsterInHand = Math.random() < 0.5;

    const magicTrapAction = randomAction(mainPhaseMagicTrap);
    let mainPhaseMonsterArray = mainPhaseMonster;

    if (hasLowLevelMonster()) {
      mainPhaseMonsterArray = mainPhaseMonster.concat(
        mainPhaseMonsterWithTribute
      );
    }

    if (difficulty === "medium") {
      mainPhaseMonsterArray = mainPhaseMonsterArray.concat(
        mainPhaseMonsterMedium
      );
    }

    if (difficulty === "hard") {
      mainPhaseMonsterArray = mainPhaseMonsterArray.concat([
        ...mainPhaseMonsterHard,
        ...mainPhaseMonsterMedium,
      ]);
    }

    const monsterAction = randomAction(mainPhaseMonsterArray);

    if (hand === 0) {
      if (hasMonsterInHand) {
        setMainPhase(["", monsterAction]);
        return;
      } else {
        setMainPhase([magicTrapAction, ""]);
        return;
      }
    }

    setMainPhase([magicTrapAction, monsterAction]);
  };

  return {
    mainPhase,
    generateMainPhase,
    battlePhasePriority,
    generateBattlePhase,
    bpAttackOrder,
    updateBattlePhase,
  };
};

export default useEnemyActions;
