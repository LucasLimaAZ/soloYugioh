import axios from "axios";
import trapCards from "../cardLists/trapCards.json";
import damageSpellCards from "../cardLists/damageSpellCards.json";
import equipSpellCards from "../cardLists/equipSpellCards.json";

const baseUrl = "https://db.ygoprodeck.com/api/v7";

export const getRandomCard = () => {
  return axios.get(`${baseUrl}/randomcard.php`).then((res) => res.data);
};

export const getRandomDamageLpSpell = () => {
  let randomNumber = Math.floor(Math.random() * damageSpellCards.length);
  return axios
    .get(`${baseUrl}/cardinfo.php?id=${damageSpellCards[randomNumber]}`)
    .then((res) => res.data);
};

export const getRandomEquipSpell = () => {
  let randomNumber = Math.floor(Math.random() * equipSpellCards.length);
  return axios
    .get(`${baseUrl}/cardinfo.php?id=${equipSpellCards[randomNumber]}`)
    .then((res) => res.data);
};

export const getRandomTrap = () => {
  return axios
    .get(
      `${baseUrl}/cardinfo.php?id=${
        trapCards[Math.floor(Math.random() * trapCards.length)]
      }`
    )
    .then((res) => res.data);
};

export const getRandomTribute = () => {
  let monsterUrl = `${baseUrl}/cardinfo.php?type=normal%20monster&${
    Math.random() >= 0.3 ? "atk" : "def"
  }=gte2000&level=${Math.random() >= 0.5 ? "5" : "6"}`;
  return axios.get(monsterUrl).then((res) => res.data);
};

export const getRandomDualTribute = () => {
  let monsterUrl = `${baseUrl}/cardinfo.php?type=normal%20monster&level=${
    Math.random() >= 0.5 ? "7" : "8"
  }`;
  return axios.get(monsterUrl).then((res) => res.data);
};

export const getRandomMonster = () => {
  let monsterUrl = `${baseUrl}/cardinfo.php?type=normal%20monster&level=lte4`;
  let sort = Math.floor(Math.random() * 7) + 1;

  switch (sort) {
    case 3:
    case 4:
    case 5:
      monsterUrl += "&atk=gte1700";
      break;
    case 6:
      monsterUrl = `${baseUrl}/cardinfo.php?type=fusion%20monster&atk=gte2000&has_effect=false`;
      break;
    default:
      monsterUrl += "";
  }

  return axios.get(monsterUrl).then((res) => res.data);
};

export default getRandomCard;
