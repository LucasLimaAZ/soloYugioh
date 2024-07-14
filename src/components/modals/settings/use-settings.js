import { useDifficulty } from "../../../shared/hooks/difficulty";
import useField from "../../../shared/hooks/field";

export const useSettings = () => {
  const { rotateBoard, setRotateBoard } = useField();
  const { difficulty, setDifficulty } = useDifficulty();

  const handleRotateBoard = () => {
    setRotateBoard(!rotateBoard);
  };

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  return {
    handleRotateBoard,
    rotateBoard,
    difficulty,
    handleDifficulty,
  };
};
