import axios from "axios";

const spellCards = [
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
  "73134082",
  "46130346",
  "19523799",
  "76103675",
  "46918794",
  "38199696",
  "20871001",
  "84257640",
  "11868825",
  "18144507",
  "19613556",
  "95051344",
];

const trapCards = [
  "96355986",
  "62279055",
  "14315573",
  "17814387",
  "44095762",
  "56120475",
  "96355986",
  "62279055",
  "14315573",
  "17814387",
  "56120475",
];

const baseUrl = "https://db.ygoprodeck.com/api/v7";

export const getRandomCard = () => {
  return axios.get(`${baseUrl}/randomcard.php`).then((res) => res.data);
};

export const getRandomDamageLpSpell = () => {
  let randomNumber = Math.floor(Math.random() * spellCards.length);
  return axios
    .get(`${baseUrl}/cardinfo.php?id=${spellCards[randomNumber]}`)
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
    case 6:
      monsterUrl += "&atk=gte1600";
      break;
    case 7:
      monsterUrl = `${baseUrl}/cardinfo.php?type=fusion%20monster&atk=gte2000&startdate=01/01/2000&enddate=08/23/2002&dateregion=tcg_date`;
      break;
    default:
      monsterUrl += "";
  }

  return axios.get(monsterUrl).then((res) => res.data);
};

export default getRandomCard;
