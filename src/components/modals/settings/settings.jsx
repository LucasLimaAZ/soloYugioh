import {
  Modal,
  Box,
  IconButton,
  Typography,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { ScreenRotation } from "@mui/icons-material";
import { useSettings } from "./use-settings";

const SettingsModal = (props) => {
  const { handleRotateBoard, rotateBoard, difficulty, handleDifficulty } =
    useSettings();

  return (
    <Modal
      open={props.openSettingsModal}
      onClose={props.handleCloseSettingsModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ paddingBottom: "32px" }}>
          <Typography variant="h5">Settings</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Field</Typography>
          <Divider />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingBottom: "32px" }}
        >
          <Typography>Perspective: {rotateBoard ? "angle" : "flat"}</Typography>
          <IconButton
            onClick={handleRotateBoard}
            color="inherit"
            aria-label="open drawer"
          >
            <ScreenRotation />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="h6">Opponent</Typography>
          <Divider />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Difficulty: </Typography>
          <Select value={difficulty} onChange={handleDifficulty} size="small">
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </Box>
      </Box>
    </Modal>
  );
};

export default SettingsModal;
