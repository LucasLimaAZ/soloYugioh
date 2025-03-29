import { atom } from "jotai";

const fieldAtom = atom([]);
const rotateBoardAtom = atom(true);
const deckAtom = atom(35);
const graveyardAtom = atom([]);
const playerLpAtom = atom(8000);
const opponentLpAtom = atom(8000);
const enemyMainPhaseActions = atom();
const enemyBattlePhaseActions = atom();
const selectedCardAtom = atom();
const bpAttackOrderAtom = atom();
const difficultyAtom = atom("hard");
const handAtom = atom(5);
const playerInfoAtom = atom();

export {
  fieldAtom,
  rotateBoardAtom,
  deckAtom,
  graveyardAtom,
  playerLpAtom,
  opponentLpAtom,
  enemyMainPhaseActions,
  enemyBattlePhaseActions,
  selectedCardAtom,
  bpAttackOrderAtom,
  difficultyAtom,
  handAtom,
  playerInfoAtom,
};
