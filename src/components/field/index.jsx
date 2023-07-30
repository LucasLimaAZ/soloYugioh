import { useState } from "react";
import { atom } from "jotai";
import CardGenerator from "../cardGenerator";
import { Button, Grid, TextField } from "@mui/material";

const Field = () => {
  const fieldAtom = atom("field");
  const [graveyard, setGraveyard] = useState([]);

  const handleGraveyard = (cardName) => {
    let gy = graveyard.concat(cardName);
    setGraveyard(gy);
  };

  return (
    <Grid item xs={8}>
      <div className="cardsWrapper">
        <CardGenerator
          sendToGraveyard={handleGraveyard}
          position={6}
          type="magic"
        />
        <CardGenerator
          sendToGraveyard={handleGraveyard}
          position={7}
          type="magic"
        />
        <CardGenerator
          sendToGraveyard={handleGraveyard}
          position={8}
          type="magic"
        />
        <CardGenerator
          sendToGraveyard={handleGraveyard}
          position={9}
          type="magic"
        />
        <CardGenerator
          sendToGraveyard={handleGraveyard}
          position={10}
          type="magic"
        />
      </div>
      <div className="cardsWrapper">
        <CardGenerator
          sendToGraveyard={handleGraveyard}
          position={1}
          type="monster"
        />
        <CardGenerator
          sendToGraveyard={handleGraveyard}
          position={2}
          type="monster"
        />
        <CardGenerator
          sendToGraveyard={handleGraveyard}
          position={3}
          type="monster"
        />
        <CardGenerator
          sendToGraveyard={handleGraveyard}
          position={4}
          type="monster"
        />
        <CardGenerator
          sendToGraveyard={handleGraveyard}
          position={5}
          type="monster"
        />
      </div>
    </Grid>
  );
};

export default Field;
