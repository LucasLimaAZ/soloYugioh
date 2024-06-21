import { Grid, Box } from "@mui/material";
import ScoreBoard from "../scoreboard";
import ToolBar from "../toolBar";
import Field from "../field";

const Container = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right bottom, #090979, #00d4ff)",
        minHeight: "100vh",
        paddingX: "4%",
        paddingY: "1%",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <ScoreBoard />
        </Grid>
        <Grid item xs={12}>
          <Field />
        </Grid>
        <Grid item xs={12}>
          <ToolBar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Container;
