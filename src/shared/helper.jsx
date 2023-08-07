import { Howler, Howl } from "howler";
import DestroyCardSound from "../assets/sounds/monsterDestruction.ogg";
import SummonMonsterSound from "../assets/sounds/monsterActivation.ogg";
import MagicActivationSound from "../assets/sounds/magicActivation.ogg";
import CardFlipSound from "../assets/sounds/flipCard.ogg";
import DamageSound from "../assets/sounds/calculating.ogg";
import CalculatedSound from "../assets/sounds/calculated.ogg";
import FinishSound from "../assets/sounds/endedDuel.ogg";
import StartDuelSound from "../assets/sounds/duelStart.ogg";
import VictorySound from "../assets/sounds/victory.ogg";

Howler.volume(1);

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

// export const generateMonsterCard = () => {
//   getRandomMonster().then((res) => {
//     let monstersAmmount = res.data.length;
//     let selectedMonster = Math.floor(Math.random() * monstersAmmount);
//     let monster = res.data[selectedMonster];
//     let isDefenseMonster =
//       monster.atk + 400 < monster.def || monster.atk < 1000;

//     if (isDefenseMonster) setMonsterPosition("def");
//     else setMonsterPosition("atk");

//     setCard({
//       ...monster,
//       face: isDefenseMonster ? "down" : "up",
//     });
//     setField(
//       {
//         ...monster,
//         monsterPosition: isDefenseMonster ? "def" : "atk",
//       },
//       props.position
//     );
//     soundPlay(MonsterActivation);
//   });
// };

// export const generateSpellTrapCard = () => {
//   let isSpell = Math.random() <= 0.6;

//   if (isSpell) {
//     getRandomDamageLpSpell().then((res) => {
//       setCard({ ...res.data[0], face: "up" });
//       setField(res.data[0], props.position);
//       soundPlay(MagicActivation);
//     });
//   } else {
//     getRandomTrap().then((res) => {
//       setCard(res.data[0]);
//       setField(res.data[0], props.position);
//       soundPlay(MagicActivation);
//     });
//   }
// };

// export const handleGenerateTribute = () => {
//   setAnchorEl(false);
//   getRandomTribute().then((res) => {
//     let monstersAmmount = res.data.length;
//     let selectedMonster = Math.floor(Math.random() * monstersAmmount) + 1;
//     let monster = res.data[selectedMonster];
//     let isDefenseMonster =
//       monster.atk + 400 < monster.def || monster.atk < 1000;

//     if (isDefenseMonster) setMonsterPosition("def");
//     else setMonsterPosition("atk");

//     setCard({ ...monster, face: isDefenseMonster ? "down" : "up" });
//     setField(
//       {
//         ...monster,
//         monsterPosition: isDefenseMonster ? "def" : "atk",
//       },
//       props.position
//     );
//     soundPlay(MonsterActivation);
//   });
// };
