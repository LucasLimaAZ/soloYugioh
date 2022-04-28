import { defaultListboxReducer } from "@mui/base";
import axios from "axios";
const spellCards = [
  "00000000",
  "73134082",
  "46130346",
  "19523799",
  "76103675",
  "46918794",
  "53129443",
  "38199696",
  "20871001",
  "84257640",
  "11868825",
  "18144507",
  "19613556",
  "95051344",
];

export const getRandomCard = () => {
  return axios
    .get("https://db.ygoprodeck.com/api/v7/randomcard.php")
    .then((res) => res.data);
};

export const getRandomDamageLpSpell = () => {
  return axios
    .get(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${
        spellCards[Math.floor(Math.random() * spellCards.length) + 1]
      }`
    )
    .then((res) => res.data);
};

export const getRandomMonster = () => {
  let monsterUrl =
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster";
  let sort = Math.floor(Math.random() * 10) + 1;

  switch (sort) {
    case 3:
      monsterUrl =
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster&atk=gte1600";
      break;
    case 4:
      monsterUrl =
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster&atk=gte1700";
      break;
    case 5:
      monsterUrl =
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster&atk=gte1800";
      break;
    case 6:
      monsterUrl =
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster&atk=gte1900";
      break;
    case 7:
      monsterUrl =
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster&def=gte2000";
      break;
    case 8:
      monsterUrl =
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster&atk=gte2000";
      break;
    case 9:
      monsterUrl =
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster&def=gte2300";
      break;
    case 10:
      monsterUrl =
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster&atk=gte2800";
      break;
    default:
      monsterUrl =
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster";
  }

  return axios.get(monsterUrl).then((res) => res.data);
};

export default getRandomCard;
