import {
  Box,
  TextField,
  Stack,
  Typography,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import UsePlayerInfo from "../../../shared/hooks/player-info";

const PlayerFieldInfo = ({ open, onClose }) => {
  const { playerInfo, togglePosition, setStat, addField, fields } =
    UsePlayerInfo();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Inform your monsters</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" gap={8} alignItems="center">
              <TextField
                placeholder={`Monster ${index + 1} stat`}
                onChange={(e) => setStat(e.target.value, index)}
                size="small"
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Atk</Typography>
                <Switch
                  checked={playerInfo?.monsters?.[index]?.isDefense || false}
                  onClick={() => togglePosition(index)}
                  color="warning"
                  inputProps={{ "aria-label": `Toggle Monster ${index + 1}` }}
                />
                <Typography>Def</Typography>
              </Stack>
            </Box>
          ))}
          <Button variant="outlined" color="primary" onClick={addField}>
            +
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerFieldInfo;
