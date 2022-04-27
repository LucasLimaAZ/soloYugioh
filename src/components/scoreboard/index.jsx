import React from "react";
import "./style.scss";
import { Button, Grid, TextField } from "@mui/material";

const ScoreBoard = () => {
  return (
    <Grid className="scoreBoard" container>
      <Grid item xs={6} container className="playerWrapper">
        <Grid className="inputsWrapper" item xs={6}>
          <Button color="primary" className="lpButtons" variant="contained">
            +
          </Button>
          <TextField
            id="outlined-basic"
            label="Increase / Decrease"
            variant="outlined"
          />
          <Button color="primary" className="lpButtons" variant="contained">
            -
          </Button>
        </Grid>
        <Grid item xs={6}>
          <div className="lifepointsBg">
            <h1>8000</h1>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={6} container className="playerWrapper">
        <Grid item xs={6}>
          <div className="lifepointsBg">
            <h1>8000</h1>
          </div>
        </Grid>
        <Grid className="inputsWrapper" item xs={6}>
          <Button color="primary" className="lpButtons" variant="contained">
            +
          </Button>
          <TextField
            id="outlined-basic"
            label="Increase / Decrease"
            variant="outlined"
          />
          <Button color="primary" className="lpButtons" variant="contained">
            -
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ScoreBoard;
