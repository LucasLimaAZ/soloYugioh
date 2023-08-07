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
