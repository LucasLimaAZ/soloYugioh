import { useAtom } from "jotai";
import { difficultyAtom } from "../atoms";

export const useDifficulty = () => {
  const [difficulty, setDifficulty] = useAtom(difficultyAtom);

  return {
    difficulty,
    setDifficulty,
  };
};
