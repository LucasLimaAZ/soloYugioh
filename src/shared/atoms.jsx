import { atom } from "jotai";

const fieldAtom = atom([]);
const deckAtom = atom(40);
const graveyardAtom = atom([]);
const playerLpAtom = atom(8000);
const opponentLpAtom = atom(8000);
const enemyMainPhaseActions = atom();
const enemyBattlePhaseActions = atom();

export {
  fieldAtom,
  deckAtom,
  graveyardAtom,
  playerLpAtom,
  opponentLpAtom,
  enemyMainPhaseActions,
  enemyBattlePhaseActions,
};
