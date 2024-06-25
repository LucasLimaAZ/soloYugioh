import { Typography, Box, TextField, IconButton } from "@mui/material";
import { useStandbyPhase } from "./use-standby-phase";

const StandbyPhase = () => {
  const { standbyPhaseText, handleText, handleDeleteText } = useStandbyPhase();
  return (
    <Box>
      <Box marginBottom="16px" display="flex" gap="8px" alignItems="center">
        <Typography variant="h6">{standbyPhaseText}</Typography>
        {standbyPhaseText && (
          <IconButton onClick={handleDeleteText}>X</IconButton>
        )}
      </Box>
      <TextField
        placeholder="If something should happen during the standby phase type here"
        variant="standard"
        fullWidth
        size="small"
        onChange={handleText}
      />
    </Box>
  );
};

export default StandbyPhase;
