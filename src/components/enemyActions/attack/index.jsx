import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ShieldMoon } from "@mui/icons-material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  mainPhaseMonster,
  mainPhaseMonsterWithTribute,
  mainPhaseMagicTrap,
  atkMonsters,
  defMonsters,
  tieMonsters,
  setMonsters,
} from "../../../shared/actions";
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

const EnemyTurn = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [enemySort, setEnemySort] = useState(1);
  const [magicTrapSort, setMagicTrapSort] = useState(1);
  const [atkMonstersSort, setAtkMonstersSort] = useState(1);
  const [defMonstersSort, setDefMonstersSort] = useState(1);
  const [setMonstersSort, setSetMonstersSort] = useState(1);
  const [tieMonstersSort, setTieMonstersSort] = useState(1);
  const [generatedTurn, setGeneratedTurn] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const chooseMagicCard = () => {
    let magicCards = searchForMagicCards();
    let randomIndex = Math.floor(Math.random() * magicCards.length);
    let selectedCardPosition = magicCards[randomIndex]?.fieldPosition;
    return selectedCardPosition;
  };

  const searchForMagicCards = () => {
    let magicCards = props.field?.filter((card, index) => {
      if (card) card.fieldPosition = index;
      return card.type === "Spell Card";
    });
    return magicCards;
  };

  // const searchForTrapCards = () => {
  //   let trapCards = props.field?.filter((card, index) => {
  //     if (card) card.fieldPosition = index;
  //     return card.type === "Trap Card";
  //   });
  //   return trapCards;
  // };

  const searchForLowLevelMonster = () => {
    let lowLevelMonsters = props.field.filter(
      (card) => card.type === "Normal Monster" && card.level < 5
    );
    return lowLevelMonsters;
  };

  const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  const handleEnemyTurn = () => {
    props.handleDeck();
    setGeneratedTurn(false);
    handleReset();

    setTimeout(() => {
      setGeneratedTurn(true);
      setEnemySort(randomNumber(mainPhaseMonster.length));
      setMagicTrapSort(randomNumber(mainPhaseMagicTrap.length));
      setAtkMonstersSort(randomNumber(atkMonsters.length));
      setDefMonstersSort(randomNumber(defMonsters.length));
      setSetMonstersSort(randomNumber(setMonsters.length));
      setTieMonstersSort(randomNumber(tieMonsters.length));
    }, 400);
  };

  const handleOpenEnemyTurn = () => {
    setOpenModal(true);
  };

  const generateEnemyMainPhase = () => {
    let lowLevelMonsters = searchForLowLevelMonster();
    let action = mainPhaseMonster[enemySort];

    if (lowLevelMonsters.length) {
      action = mainPhaseMonsterWithTribute[enemySort];
    }

    return (
      <>
        <div>{mainPhaseMagicTrap[magicTrapSort]}</div>
        <div>{action}</div>
      </>
    );
  };

  const MainPhase = () => (
    <div style={{ marginTop: "10px" }}>
      <div>
        <Typography variant="h6">{generateEnemyMainPhase()}</Typography>
      </div>
      <Accordion
        sx={{
          color: "white !important",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />}>
          <Typography>
            If there are no monsters in your side of the field
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Opponent changes DEF position monsters to ATK.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );

  const orderBattlePhase = () => {
    return props.field.sort((a, b) => a.atk - b.atk);
  };

  const BattlePhase = () => (
    <div style={{ marginTop: "10px" }}>
      <Typography variant="h6">Enemy declares attack with:</Typography>
      {orderBattlePhase().map(
        (card) =>
          (card.type === "Normal Monster" || card.type === "Fusion Monster") &&
          card.monsterPosition === "atk" && (
            <Typography variant="h6" key={card.id}>
              <b>- {card.name}</b>
            </Typography>
          )
      )}
      <Accordion
        sx={{
          color: "white !important",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />}>
          <Typography>Attack priority</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To your (left to right):
            <div>- {atkMonsters[atkMonstersSort]}</div>
            <div>- {defMonsters[defMonstersSort]}</div>
            {setMonsters[setMonstersSort] !== "" && (
              <div>- {setMonsters[setMonstersSort]}</div>
            )}
            {tieMonsters[tieMonstersSort] !== "" && (
              <div>- {tieMonsters[tieMonstersSort]}</div>
            )}
            <div>- Direct Attack</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );

  const MainPhase2 = () => (
    <div style={{ marginTop: "10px" }}>
      <Typography variant="h6">Enemy turn ends</Typography>
    </div>
  );

  const phases = [
    {
      label: "Draw phase",
      content: <Typography variant="h6">Enemy draws 1 card</Typography>,
    },
    {
      label: "Main phase",
      content: <MainPhase />,
    },
    {
      label: "Battle phase",
      content: <BattlePhase />,
    },
    {
      label: "Main phase 2",
      content: <MainPhase2 />,
    },
  ];

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modalBg">
          <div className="modal-content">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enemy Turn
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={handleEnemyTurn}
            >
              Generate Enemy Turn
            </Button>
            {generatedTurn ? (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>What does your enemy do:</div>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {phases.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>
                        <Typography
                          color="white"
                          onClick={() => setActiveStep(index)}
                        >
                          {step.label}:
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        {step.content}
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === phases.length - 1
                                ? "End enemy turn"
                                : `Enter ${
                                    phases[index + 1].label || "End phase"
                                  }`}
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Typography>
            ) : (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Generating simulation...
              </Typography>
            )}
          </div>
        </Box>
      </Modal>
      <Button color="primary" variant="contained" onClick={handleOpenEnemyTurn}>
        <ShieldMoon />
      </Button>
    </>
  );
};

export default EnemyTurn;
