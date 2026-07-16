const mainPhaseActions = {
  mainPhaseMonster: [{ action: "Enemy summons 1 monster", resourceAmount: 1 }],
  mainPhaseMonsterMedium: [
    { action: "Enemy summons 1 monster", resourceAmount: 1 },
  ],
  mainPhaseMonsterHard: [
    { action: "Enemy summons 2 monsters", resourceAmount: 2 },
  ],
  mainPhaseMonsterWithTribute: [
    {
      action: "Enemy tribute summons their weakest monster",
      resourceAmount: 1,
    },
  ],
  mainPhaseMagicTrap: [
    { action: "Enemy sets a magic/trap card", resourceAmount: 1 },
  ],
  mainPhaseMagicTrapMedium: [
    { action: "Enemy sets 2 magic/trap cards", resourceAmount: 2 },
  ],
};

export default mainPhaseActions;
