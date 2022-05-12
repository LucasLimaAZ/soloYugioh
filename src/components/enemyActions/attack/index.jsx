import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { ShieldMoon } from "@mui/icons-material";
import CardBackIMG from "../../../assets/img/yugioh-back.jpg";
import "./style.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const enemyActions = [
  "Enemy activate magic/trap card and summons monster;",
  "Enemy set magic/trap card;",
  "Enemy summons monster;",
  "Enemy set magic/trap card and summons monster;",
  "Enemy does nothing;",
];

const enemyTributeActions = [
  ...enemyActions,
  "Enemy tribute summon a monster;",
];

const atkMonsters = [
  "Highest ATK monster weaker than this;",
  "Lowest ATK monster;",
];

const defMonsters = [
  "Highest DEF (face up) monster weaker than this;",
  "Lowest DEF (face up) monster;",
];

const setMonsters = [
  "1st set DEF monster;",
  "last set DEF monster;",
  "",
  "1st set DEF monster;",
  "last set DEF monster;",
];

const tieMonsters = [
  "1st tie ATK monster;",
  "last tie ATK monster;",
  "",
  "",
  "",
  "",
];

const EnemyTurn = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [enemySort, setEnemySort] = useState(1);
  const [enemyTributeSort, setEnemyTributeSort] = useState(1);
  const [atkMonstersSort, setAtkMonstersSort] = useState(1);
  const [defMonstersSort, setDefMonstersSort] = useState(1);
  const [setMonstersSort, setSetMonstersSort] = useState(1);
  const [tieMonstersSort, setTieMonstersSort] = useState(1);
  const [generatedTurn, setGeneratedTurn] = useState(true);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const chooseMagicCard = () => {
    let magicCards = findForMagicCards();
    let selectedCardPosition =
      magicCards[Math.floor(Math.random() * magicCards.length)].fieldPosition;
    return selectedCardPosition;
  };

  const findForMagicCards = () => {
    let magicCards = props.field?.filter((card, index) => {
      if (card) card.fieldPosition = index;
      return card.type === "Spell Card";
    });
    return magicCards;
  };

  const handleEnemyTurn = () => {
    let magicCards = findForMagicCards();

    setGeneratedTurn(false);
    setTimeout(() => {
      setGeneratedTurn(true);
      if (magicCards.length && magicCards.length < 5)
        setEnemySort(Math.floor(Math.random() * enemyActions.length));
      else setEnemySort(Math.ceil(Math.random() * enemyActions.length));
      setEnemyTributeSort(
        Math.floor(Math.random() * enemyTributeActions.length)
      );
      setAtkMonstersSort(Math.floor(Math.random() * atkMonsters.length));
      setDefMonstersSort(Math.floor(Math.random() * defMonsters.length));
      setSetMonstersSort(Math.floor(Math.random() * setMonsters.length));
      setTieMonstersSort(Math.floor(Math.random() * tieMonsters.length));
    }, 400);
  };

  const handleOpenEnemyTurn = () => {
    setOpenModal(true);
  };

  const enemyMainPhase = () => {
    let lowLevelMonsters = props.field.filter(
      (card) => card.type === "Normal Monster" && card.level < 5
    );
    let action = lowLevelMonsters.length
      ? enemyTributeActions[enemyTributeSort]
      : enemyActions[enemySort];
    return action;
  };

  const MiniField = () => {
    let cardIndex = chooseMagicCard();

    return (
      <>
        <div className="flex">
          <img
            className={`mini-card ${cardIndex === 6 ? "selected" : ""}`}
            src={CardBackIMG}
            alt="mini-card"
          />
          <img
            className={`mini-card ${cardIndex === 7 ? "selected" : ""}`}
            src={CardBackIMG}
            alt="mini-card"
          />
          <img
            className={`mini-card ${cardIndex === 8 ? "selected" : ""}`}
            src={CardBackIMG}
            alt="mini-card"
          />
          <img
            className={`mini-card ${cardIndex === 9 ? "selected" : ""}`}
            src={CardBackIMG}
            alt="mini-card"
          />
          <img
            className={`mini-card ${cardIndex === 10 ? "selected" : ""}`}
            src={CardBackIMG}
            alt="mini-card"
          />
        </div>
        <div className="flex">
          <img className="mini-card" src={CardBackIMG} alt="mini-card" />
          <img className="mini-card" src={CardBackIMG} alt="mini-card" />
          <img className="mini-card" src={CardBackIMG} alt="mini-card" />
          <img className="mini-card" src={CardBackIMG} alt="mini-card" />
          <img className="mini-card" src={CardBackIMG} alt="mini-card" />
        </div>
      </>
    );
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modalBg">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enemy Turn
          </Typography>
          <Button color="primary" variant="contained" onClick={handleEnemyTurn}>
            Generate Enemy Turn
          </Button>
          {generatedTurn ? (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              What does your enemy do:
              <div style={{ marginTop: "10px" }}>
                <b>Draw Phase:</b>
                <div>Draws 1 card;</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <b>Main Phase:</b>
                <div>{enemySort === 0 && <MiniField />}</div>
                <div>{enemyMainPhase()}</div>
                <div>
                  <small>
                    *If there are no monsters in your side of the field your
                    opponent changes DEF position monsters to ATK.
                  </small>
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <b>Battle Phase:</b>
                {props.field.map((card) =>
                  (card.type === "Normal Monster" ||
                    card.type === "Fusion Monster") &&
                  card.monsterPosition === "atk" ? (
                    <div key={card.id}>
                      Enemy declares attack with <b>{card.name}</b>;
                    </div>
                  ) : (
                    ""
                  )
                )}
                <fieldset className="attack-script">
                  <legend>Priority:</legend>
                  To your (left to right):
                  <div>- {atkMonsters[atkMonstersSort]}</div>
                  <div>- {defMonsters[defMonstersSort]}</div>
                  {setMonsters[setMonstersSort] !== "" && (
                    <div>- {setMonsters[setMonstersSort]}</div>
                  )}
                  {tieMonsters[tieMonstersSort] !== "" && (
                    <div>- {tieMonsters[tieMonstersSort]}</div>
                  )}
                  <div>- Direct Attack;</div>
                </fieldset>
              </div>
              <div style={{ marginTop: "10px" }}>
                <b>Main Phase 2:</b>
                <div>Enemy turn ends.</div>
              </div>
            </Typography>
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Generating simulation...
            </Typography>
          )}
        </Box>
      </Modal>
      <Button color="primary" variant="contained" onClick={handleOpenEnemyTurn}>
        <ShieldMoon />
      </Button>
    </>
  );
};

export default EnemyTurn;
