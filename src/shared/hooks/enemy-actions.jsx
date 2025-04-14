import {
  enemyMainPhaseActions,
  enemyBattlePhaseActions,
  bpAttackOrderAtom,
} from "../atoms";
import { useAtom } from "jotai";
import mainPhaseActions from "../actions/main-phase.ts";
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

const {
  mainPhaseMonster,
  mainPhaseMonsterMedium,
  mainPhaseMonsterHard,
  mainPhaseMonsterWithTribute,
  mainPhaseMagicTrap,
  mainPhaseMagicTrapMedium,
} = mainPhaseActions;

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

  const hasFaceUpMonster = () => {
    let faceUpMonsters = field.filter((card) => card?.atk && !card?.face_down);
    return faceUpMonsters.length > 0;
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
    let mainPhaseMonsterArray = [...mainPhaseMonster];
    let mainPhaseMagicTrapArray = [...mainPhaseMagicTrap];

    // Adds tribute summon to actions
    if (hasLowLevelMonster()) {
      mainPhaseMonsterArray = mainPhaseMonsterArray.concat(
        mainPhaseMonsterWithTribute
      );
    }

    // Adds equip card to actions
    if (hasFaceUpMonster()) {
      mainPhaseMagicTrapArray = mainPhaseMagicTrapArray.concat({
        action: "Enemy equips a monster",
        resourceAmount: 1,
      });
    }

    // Adds medium difficulty moves to actions
    if (difficulty === "medium") {
      mainPhaseMonsterArray = mainPhaseMonsterArray.concat(
        mainPhaseMonsterMedium
      );
      mainPhaseMagicTrapArray = mainPhaseMagicTrapArray.concat(
        mainPhaseMagicTrapMedium
      );
    }

    // Adds hard difficulty moves to actions
    if (difficulty === "hard") {
      mainPhaseMonsterArray = mainPhaseMonsterArray.concat([
        ...mainPhaseMonsterHard,
        ...mainPhaseMonsterMedium,
      ]);
      mainPhaseMagicTrapArray = mainPhaseMagicTrapArray.concat(
        mainPhaseMagicTrapMedium
      );
    }

    const monsterAction = randomAction(mainPhaseMonsterArray);
    const magicTrapAction = randomAction(mainPhaseMagicTrapArray);

    const totalResources =
      (monsterAction?.resourceAmount || 0) +
      (magicTrapAction?.resourceAmount || 0);

    const effectiveHand = hand + 1;

    if (totalResources > effectiveHand) {
      if (monsterAction.resourceAmount <= effectiveHand) {
        setMainPhase(["", monsterAction.action]);
        return;
      } else if (magicTrapAction.resourceAmount <= effectiveHand) {
        setMainPhase([magicTrapAction.action, ""]);
        return;
      } else {
        if (Math.random() >= 0.5) {
          setMainPhase(["Enemy sets 1 spell/trap card", ""]);
        } else {
          setMainPhase(["", "Enemy summons 1 monster"]);
        }
        return;
      }
    }

    setMainPhase([magicTrapAction.action, monsterAction.action]);
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
