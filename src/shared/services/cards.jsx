import axios from "axios";
const damageSpells = [
  "00000000",
  "73134082",
  "46130346",
  "19523799",
  "76103675",
  "46918794",
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
        damageSpells[Math.floor(Math.random() * 5) + 1]
      }`
    )
    .then((res) => res.data);
};

export const getRandomMonster = () => {
  return axios
    .get("https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal%20monster")
    .then((res) => res.data);
};

export default getRandomCard;
