import axios from "axios";

const damageSpellCards = [
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
  "12580477",
  "72892473",
  "5318639",
  "88279736",
  "82003859",
];

const equipSpellCards = [
  "64047146",
  "65169794",
  "40619825",
  "83746708",
  "56747793",
  "61127349",
  "34664411",
  "32022366",
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
  "126218",
  "74137509",
  "24068492",
  "55713623",
];

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
