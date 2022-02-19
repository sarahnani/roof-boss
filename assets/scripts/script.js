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

//displays chosen attribute from object in array into tag by its id
function displayAttr(array, attr, displayId) {
  const display = document.getElementById(displayId);

  if (attr === 'name') {
    display.innerHTML = array[0].name;
  } else {
    switch (attr) {
      case 'claw':
        display.innerHTML = array[0].claw;
        break;
      case 'meow':
        display.innerHTML = array[0].meow;
        break;
      case 'speed':
        display.innerHTML = array[0].speed;
        break;
    }
  }
}

//uses previous function to display player 1 current attributes
function displayP1cards() {
  displayAttr(deckP1, 'name', 'name-p1');
  displayAttr(deckP1, 'claw', 'claw-p1');
  displayAttr(deckP1, 'meow', 'meow-p1');
  displayAttr(deckP1, 'speed', 'speed-p1');
  return true;
}

//uses previous function to display player 2 current attributes
function displayP2cards() {
  displayAttr(deckP2, 'name', 'name-p2');
  displayAttr(deckP2, 'claw', 'claw-p2');
  displayAttr(deckP2, 'meow', 'meow-p2');
  displayAttr(deckP2, 'speed', 'speed-p2');
  return true;
}

//gets p1 chosen attribute by select's name, compares with p2 attribute 
function makeMoveP1() {
  const checked = document.querySelector(`input[name="p1-attr"]:checked`).value;
  console.log(checked);
  switch (checked) {
    case 'claw':
      if (deckP1[0].claw > deckP2[0].claw) {
        console.log(`${deckP1[0].claw} > ${deckP2[0].claw} P1`);
        doRoundActions(1);
      } else if (deckP2[0].claw > deckP1[0].claw) {
        console.log(`${deckP2[0].claw} > ${deckP1[0].claw} P2`);
        doRoundActions(2);
      } else {
        console.log(`${deckP2[0].claw} = ${deckP1[0].claw} EVEN`);
        doRoundActions(0);
      }
      break;
    case 'meow':
      if (deckP1[0].meow > deckP2[0].meow) {
        console.log(`${deckP1[0].meow} > ${deckP2[0].meow} P1`);
        doRoundActions(1);
      } else if (deckP2[0].meow > deckP1[0].meow) {
        console.log(`${deckP2[0].meow} > ${deckP1[0].meow} P2`);
        doRoundActions(2);
      } else {
        console.log(`${deckP2[0].meow} = ${deckP1[0].meow} EVEN`);
        doRoundActions(0);
      }
      break;
    case 'speed':
      if (deckP1[0].speed > deckP2[0].speed) {
        console.log(`${deckP1[0].speed} > ${deckP2[0].speed} P1`);
        doRoundActions(1);
      } else if (deckP2[0].speed > deckP1[0].speed) {
        console.log(`${deckP2[0].speed} > ${deckP1[0].speed} P2`);
        doRoundActions(2);
      } else {
        console.log(`${deckP2[0].speed} = ${deckP1[0].speed} EVEN`);
        doRoundActions(0);
      }
      break;
  }
  return p1turn;
}

// executes round actions after attribute comparison
// winner = 1 if p1 wins / winner = 2 if p2 wins / winner = 0 if output is even
function doRoundActions(winner) {
  switch (winner) {
    case 0:
      if (p1turn) {
        moveCard(deckP1, pile);
        sendCardToBottom(deckP2);
      } else {
        moveCard(deckP2, pile);
        sendCardToBottom(deckP1);
      }
      break;
    case 1:
      moveCard(deckP2, deckP1);
      sendCardToBottom(deckP1);
      if (pile.length !== 0) {
        for (let i = 0; i < pile.length; i++) {
          moveCard(pile, deckP1);
        }
      }
      break;
    case 2:
      moveCard(deckP1, deckP2);
      sendCardToBottom(deckP2);
      if (pile.length !== 0) {
        for (let i = 0; i < pile.length; i++) {
          moveCard(pile, deckP2);
        }
      }
      break;
  }
  lookForWinner();
  p1turn = !p1turn;
  hideAndShowCards();
}

// pushes first element of an array to another one 
function moveCard(fromArr, toArr) {
  const movedCard = fromArr.splice(0, 1);
  toArr.push(movedCard[0]);
  // console.log(p1turn);
  return true;
}

// sends current card to the end of array too
function sendCardToBottom(arr) {
  const movedCard = arr.splice(0, 1);
  arr.push(movedCard[0]);
  return true;
}

// returns bot's highest attribute name as string
function setBotAttr() {
  const botAttrs = [
    { id: 0 },
    { id: 1 },
    { id: 2 }
  ];

  botAttrs[0].val = deckP2[0].claw;
  botAttrs[1].val = deckP2[0].meow;
  botAttrs[2].val = deckP2[0].speed;

  for (let i = 0; i < botAttrs.length; i++) {
    for (let j = 0; j < botAttrs.length; j++) {
      if (botAttrs[i].val > botAttrs[j].val) {
        hold = botAttrs[i];
        botAttrs[i] = botAttrs[j];
        botAttrs[j] = hold;
      }
    }
  }
  let highest;

  switch (botAttrs[0].id) {
    case 0:
      console.log(`claw`);
      highest = 'claw';
      let selected = document.getElementById('claw-field-p2');
      selected.setAttribute('style', 'background-color:red');
      break;
    case 1:
      console.log(`meow`);
      highest = 'meow';
      selected = document.getElementById('meow-field-p2');
      selected.setAttribute('style', 'background-color:red');
      break;
    case 2:
      console.log(`speed`);
      highest = 'speed';
      selected = document.getElementById('speed-field-p2');
      selected.setAttribute('style', 'background-color:red');
      break;
  }

  return highest;
}

// hides and show elements depending on whose turn it is
function hideAndShowCards() {

  const displayImg = './assets/img/svg/teste-img.svg';
  const hideImg = './assets/img/svg/bg-card-front.svg';
  if (p1turn) {
    //hide p2 card and show p1 card
    nameP1.style.visibility = 'visible';
    attrSectionP1.style.visibility = 'visible';
    cardImgP1.style.visibility = 'visible';
    nameP2.style.visibility = 'hidden';
    attrSectionP2.style.visibility = 'hidden';
    cardImgP2.style.visibility = 'hidden';
    cardP1.setAttribute('src', displayImg);
    displayP1cards();
    cardP2.setAttribute('src', hideImg);
  } else {
    //hide p1 card and show p2 card
    nameP1.style.visibility = 'hidden';
    attrSectionP1.style.visibility = 'hidden';
    cardImgP1.style.visibility = 'hidden';
    nameP2.style.visibility = 'visible';
    attrSectionP2.style.visibility = 'visible';
    cardImgP2.style.visibility = 'visible';
    cardP1.setAttribute('src', hideImg);
    displayP2cards();
    cardP2.setAttribute('src', displayImg);
  }
}

function endRound() {
  displayP1cards();
  displayP2cards();
}

function lookForWinner() {
  if (deckP1.length === 0 || deckP2.length === 0 && pile.length === 0) {
    if (p1turn) {
      console.log('p2 wins');
    } else {
      console.log('p1 wins');
    }
  }
}

// ====================== literals & variables ======================

const deck = []; // array to store all game cards
const deckP1 = []; // array to store each
const deckP2 = []; // player's set of cards
let p1turn = true; // defines wether it's player 1 turn or not
const pile = []; // array to store cards when turn output is even

// ========================== DOM elements ==========================

const cardP1 = document.getElementById('card-img-p1');
cardP1.addEventListener('click', displayP1cards);
const cardP2 = document.getElementById('card-img-p2');
cardP2.addEventListener('click', displayP2cards);
const fightBtn = document.getElementById('fight-btn');
fightBtn.addEventListener('click', makeMoveP1);
const cardImgP1 = document.getElementById('card-img-p1');
const nameP1 = document.getElementById('name-p1');
const attrSectionP1 = document.getElementById('attr-section-p1');
const cardImgP2 = document.getElementById('card-img-p2');
const nameP2 = document.getElementById('name-p2');
const attrSectionP2 = document.getElementById('attr-section-p2');

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
displayP1cards();
hideAndShowCards();
//p1 a mostra com attr -> set timeout para revelar?
//p2 oculta
//p1 pode escolher attr