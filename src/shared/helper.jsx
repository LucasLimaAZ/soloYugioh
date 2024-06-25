import { Howl } from "howler";
import DestroyCardSound from "../assets/sounds/monsterDestruction.ogg";
import SummonMonsterSound from "../assets/sounds/monsterActivation.ogg";
import MagicActivationSound from "../assets/sounds/magicActivation.ogg";
import CardFlipSound from "../assets/sounds/flipCard.ogg";
import DamageSound from "../assets/sounds/calculating.ogg";
import CalculatedSound from "../assets/sounds/calculated.ogg";
import FinishSound from "../assets/sounds/endedDuel.ogg";
import StartDuelSound from "../assets/sounds/duelStart.ogg";
import VictorySound from "../assets/sounds/victory.ogg";

const sounds = {
  "destroy-card": DestroyCardSound,
  "summon-monster": SummonMonsterSound,
  "magic-activation": MagicActivationSound,
  "flip-card": CardFlipSound,
  "lp-damage": DamageSound,
  "calculated-damage": CalculatedSound,
  "finish-duel": FinishSound,
  "start-duel": StartDuelSound,
  "player-victory": VictorySound,
};

export const playSound = (sound) => {
  const howl = new Howl({
    src: sounds[sound],
    volume: 1,

    onloaderror: (id, errmsg) => console.error(id, errmsg),
  });
  howl.play();
};

export const isFlipMonster = (card) => {
  return card?.desc.includes("FLIP:");
};
