import { Grid } from "@mui/material";
import ScoreBoard from "../scoreboard";
import Deck from "../deck";
import Graveyard from "../graveyard";
import ToolBar from "../toolBar";
import Field from "../field";

const Container = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ScoreBoard />
      </Grid>
      <Grid item xs={2}>
        <Deck remainingCards={40} />
        <Graveyard graveyardList={[]} />
      </Grid>
      <Grid item xs={9}>
        <Field />
      </Grid>
      <Grid item xs={12}>
        <ToolBar />
      </Grid>
    </Grid>
  );
};

export default Container;
