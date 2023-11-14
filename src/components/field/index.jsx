import Card from "../card";
import { Link } from "@mui/material";
import { useField } from "../../shared/hooks/hooks";
import { useAtom } from "jotai";
import { fieldAtom } from "../../shared/state";

const Field = () => {
  const { generateMonster, generateMagic } = useField();
  const [field] = useAtom(fieldAtom);

  const handleMonsterClick = (position) => {
    if (field[position]) return;
    generateMonster(position);
  };

  const handleMagicClick = (position) => {
    if (field[position]) return;
    generateMagic(position);
  };

  return (
    <>
      <div className="cardsWrapper">
        {[...Array(5)].map((e, i) => (
          <Link
            key={i}
            sx={{ margin: "50px 10px" }}
            onClick={() => handleMagicClick(i)}
          >
            <Card type="magic" position={i} card={field[i]} />
          </Link>
        ))}
      </div>
      <div className="cardsWrapper">
        {[...Array(5)].map((e, i) => (
          <Link
            key={i}
            sx={{ margin: "50px 10px" }}
            onClick={() => handleMonsterClick(5 + i)}
          >
            <Card type="monster" position={5 + i} card={field[5 + i]} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Field;
