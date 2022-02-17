/////////FORK

// ========================== creating class ==========================
class Character {
  constructor(name, type, gender, size) {
    this.name = name
    this.type = type // 1 street cat, 0 house cat
    this.gender = gender // 1 male, 0 female
    this.weight = size // 1 thin, 0 fat
    this.claw = 0
    this.meow = 0
    this.speed = 0
    this.setAttributes()
  }

  setAttributes() {
    if (this.type) {
      this.claw = getRandomBetween(6, 10);
    } else {
      this.claw = getRandomBetween(2, 8);
    }
    if (this.gender) {
      this.meow = getRandomBetween(6, 10, this.claw);
    } else {
      this.meow = getRandomBetween(2, 8, this.claw);
    }
    if (this.size) {
      this.speed = getRandomBetween(6, 10, this.claw, this.size);
    } else {
      this.speed = getRandomBetween(2, 8, this.claw, this.size);
    }
  }
}

// ============================= functions =============================

//returns a random number in a range set as parameter
function getRandomBetween(min, max, exception1 = -1, exception2 = - 1) {
  const minv = Math.ceil(min);
  const maxv = Math.floor(max);
  let random = Math.floor(Math.random() * (maxv - minv + 1)) + minv;

  if (random === exception1) {
    random++;
  } else if (random === exception2) {
    random++;
  }
  if (random === exception2) {
    random++;
  }
  if (random > max) {
    random = min;
  }
  return random;
}

//shuffles array using Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//hands cards to both playes one by one
function handCards(array) {

  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 1) {
      deckP1.push(deck[i]);
    } else {
      deckP2.push(deck[i]);
    }
  }
  return true;
}

// ====================== literals & variables ======================

const deck = []; // array to store all game cards
const deckP1 = []; // array to store each
const deckP2 = []; // player's set of cards

// =========================== characters =========================== [BETA VERSION]
//constructor(name, type, gender, size)

deck.push(new Character('Bissinho', 0, 1, 1));
deck.push(new Character('Minuc', 0, 0, 1));
deck.push(new Character('Piju', 1, 0, 0));
deck.push(new Character('Massinho', 0, 1, 0));
deck.push(new Character('Django', 0, 1, 0));
deck.push(new Character('Feminha', 0, 0, 1));
deck.push(new Character('Katrina', 0, 0, 1));
deck.push(new Character('Alfa', 1, 1, 1));

// ====================== execution ======================

shuffle(deck);
handCards(deck);
