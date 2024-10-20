import axios from "axios";
import trapCards from "../cardLists/trapCards.json";
import damageSpellCards from "../cardLists/damageSpellCards.json";
import equipSpellCards from "../cardLists/equipSpellCards.json";
import effectMonsters from "../cardLists/effectMonsters.json";
import flipMonsters from "../cardLists/flipMonsters.json";

const baseUrl = "https://db.ygoprodeck.com/api/v7";

export const searchCard = (name) => {
  return axios
    .get(`${baseUrl}/cardinfo.php?fname=${name}&num=20&offset=0`)
    .then((res) => res.data);
};

export const getCard = (id) => {
  return axios.get(`${baseUrl}/cardinfo.php?id=${id}`).then((res) => res.data);
};

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
  let sort = Math.floor(Math.random() * 9) + 1;

  switch (sort) {
    case 1:
    case 2:
      monsterUrl = `${baseUrl}/cardinfo.php?id=${
        flipMonsters[Math.floor(Math.random() * flipMonsters.length)]
      }`;
      break;
    case 3:
    case 4:
      monsterUrl = `${baseUrl}/cardinfo.php?id=${
        effectMonsters[Math.floor(Math.random() * effectMonsters.length)]
      }`;
      break;
    case 5:
      monsterUrl += "&atk=gte1700";
      break;
    case 6:
      monsterUrl += "&atk=gte1800";
      break;
    case 7:
      monsterUrl += "&atk=gte1900";
      break;
    case 8:
      monsterUrl = `${baseUrl}/cardinfo.php?type=fusion%20monster&atk=gte2000&has_effect=false`;
      break;
    default:
      monsterUrl += "";
  }

  return axios.get(monsterUrl).then((res) => res.data);
};

export default getRandomCard;
