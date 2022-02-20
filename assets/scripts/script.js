/////////FORK

// ========================== creating class ==========================
class Character {
  constructor(name, type, gender, size) {
    this.name = name
    this.type = type // 1 street cat, 0 house cat
    this.gender = gender // 1 male, 0 female
    this.weight = size // 1 thin, 0 fat
    this.img = `/./assets/img/cats/${name}.png`
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
  cardImgP1.setAttribute('src', deckP1[0].img);
  return true;
}

//uses previous function to display player 2 current attributes
function displayP2cards() {
  displayAttr(deckP2, 'name', 'name-p2');
  displayAttr(deckP2, 'claw', 'claw-p2');
  displayAttr(deckP2, 'meow', 'meow-p2');
  displayAttr(deckP2, 'speed', 'speed-p2');
  cardImgP2.setAttribute('src', deckP2[0].img);
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
      moveCard(deckP1, pile);
      moveCard(deckP2, pile);
      break;
    case 1:
      moveCard(deckP2, deckP1);
      sendCardToBottom(deckP1);
      if (pile.length !== 0) {
        for (let i = 0; i <= pile.length; i++) {
          moveCard(pile, deckP1);
        }
      }
      break;
    case 2:
      moveCard(deckP1, deckP2);
      sendCardToBottom(deckP2);
      if (pile.length !== 0) {
        for (let i = 0; i <= pile.length; i++) {
          moveCard(pile, deckP2);
        }
      }
      break;
  }
  lookForWinner();
  showCardsDistribution();
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
  let selected;

  switch (botAttrs[0].id) {
    case 0:
      console.log(`claw`);
      highest = 'claw';
      selected = document.getElementById('claw-field-p2');
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
  const hideImg = './assets/img/svg/bg-card-back.svg';
  const showImg = './assets/img/svg/bg-card-front.svg';
  if (p1turn) {
    //hide p2 card and show p1 card
    nameP1.style.visibility = 'visible';
    attrSectionP1.style.visibility = 'visible';
    cardImgP1.style.visibility = 'visible';
    nameP2.style.visibility = 'hidden';
    attrSectionP2.style.visibility = 'hidden';
    cardImgP2.style.visibility = 'hidden';
    cardP2.style.backgroundImage = `url(${hideImg})`;
    cardP1.style.backgroundImage = `url(${showImg})`;
    displayP1cards();
  } else {
    //hide p1 card and show p2 card
    nameP1.style.visibility = 'hidden';
    attrSectionP1.style.visibility = 'hidden';
    cardImgP1.style.visibility = 'hidden';
    nameP2.style.visibility = 'visible';
    attrSectionP2.style.visibility = 'visible';
    cardP1.style.backgroundImage = `url(${hideImg})`; //carta grande que contém os elementos
    cardP2.style.backgroundImage = `url(${showImg})`;
    cardImgP2.style.visibility = 'visible';
    displayP2cards();
  }
}

function endRound() {
  displayP1cards();
  displayP2cards();
}

function lookForWinner() {
  if (deckP1.length === 0 || deckP2.length === 0 && pile.length === 0) {
    if (p1turn) {
      // console.log(`p2 wins with ${deckP2[deckP2.length - 1].name}`);
      changeDisplayToWinnerPage("Jogador 2 venceu!");
    } else {
      // console.log(`p1 wins with ${deckP1[deckP1.length - 1].name}`);
      changeDisplayToWinnerPage("Jogador 1 venceu!");
    }
  }
}

function showCardsDistribution() {
  const deckFieldP1 = document.getElementById('deck-field-p1');
  deckFieldP1.innerHTML = `p1 ${deckP1.length}`;
  const deckFieldP2 = document.getElementById('deck-field-p2');
  deckFieldP2.innerHTML = `p2 ${deckP2.length}`;
  const pileField = document.getElementById('pile-field');
  if (pile.length !== 0) {
    pileField.innerHTML = `pile ${pile.length}`;
    if (pile.length === 2) {
      pileField.innerHTML += `
      <img src="./assets/img/svg/double-minicard.svg" alt="duas cartas ocultas">`;
    } else if (pile.length === 4) {
      pileField.innerHTML += `
      <img src="./assets/img/svg/double-minicard.svg" alt="duas cartas ocultas">
      <img src="./assets/img/svg/double-minicard.svg" alt="duas cartas ocultas">`;
    } else {
      pileField.innerHTML += `
      <img src="./assets/img/svg/messy-pile.svg" alt="uma pilha de cartas bagunçadas">`;
    }
  } else {
    pileField.innerHTML = '';
  }
}

// set paw button animation behavior
function showClaws() {
  fightBtn.setAttribute('src', './assets/img/svg/claw.svg');

  const soundClaw = new Audio('/./assets/audio/claw2.mp3');
  soundClaw.volume = 0.4;
  soundClaw.play();

  setTimeout(() => {
    new Audio('/./assets/audio/hissing2.mp3').play();
  }, 200);

  setTimeout(() => {
    fightBtn.setAttribute('src', './assets/img/svg/paw.svg');
  }, 1200);
}

// hidden cards Animation to opponent
function startCardOneAnimation() {
  const card1 = document.querySelector('#hidden-card-1');
  card1.style.animationName = "p1-wins";
  card1.style.animationPlayState = "running";
  setTimeout(() => {
    card1.style.animationName = "p1-wins-return";
    card1.style.animationPlayState = "paused";
  }, 3000)
}

function startCardTwoAnimation() {
  const card2 = document.querySelector('#hidden-card-2');
  card2.style.animationName = "p2-wins";
  card2.style.animationPlayState = "running";
  setTimeout(() => {
    card2.style.animationName = "p2-wins-return";
    card2.style.animationPlayState = "paused";
  }, 3000)
}

function startEvenCardsAnimation() {
  const card1 = document.querySelector('#hidden-card-1');
  const card2 = document.querySelector('#hidden-card-2');
  card1.style.animationName = "p1-even";
  card1.style.animationPlayState = "running";
  card2.style.animationName = "p2-even";
  card2.style.animationPlayState = "running";
  setTimeout(() => {
    card1.style.animationName = "p1-wins-return";
    card1.style.animationPlayState = "paused";
    card2.style.animationName = "p2-wins-return";
    card2.style.animationPlayState = "paused";
  }, 3000)
}

// change display of game-play and winner player's page
function changeDisplayToHome() {
  const home = document.getElementById("home-page");
  const winnerPage = document.getElementById("winner-page");

  home.setAttribute("class", "row d-flex flex-column align-items-center");
  winnerPage.setAttribute("class", "row d-none align-items-center justify-content-center body-size");
}

function changeDisplayToWinnerPage(text) {
  const textWinner = document.getElementById("text-winner");
  const home = document.getElementById("home-page");
  const winnerPage = document.getElementById("winner-page");

  home.setAttribute("class", "row d-none flex-column align-items-center");
  winnerPage.setAttribute("class", "row d-flex align-items-center justify-content-center body-size");
  textWinner.innerHTML = text;
}

// ====================== literals & variables ======================

const deck = []; // array to store all game cards
const deckP1 = []; // array to store each
const deckP2 = []; // player's set of cards
let p1turn = true; // defines wether it's player 1 turn or not
const pile = []; // array to store cards when turn output is even

// ========================== DOM elements ==========================

const cardP1 = document.getElementById('card-p1');
const cardP2 = document.getElementById('card-p2');
const fightBtn = document.getElementById('fight-btn');

fightBtn.addEventListener('click', makeMoveP1);
const cardImgP1 = document.getElementById('card-img-p1'); //quadradinho da foto do gato
const nameP1 = document.getElementById('name-p1');
const attrSectionP1 = document.getElementById('attr-section-p1');
const cardImgP2 = document.getElementById('card-img-p2');
const nameP2 = document.getElementById('name-p2');
const attrSectionP2 = document.getElementById('attr-section-p2');

// fightBtn.addEventListener('click', getAttrP1);
fightBtn.addEventListener('click', showClaws);


// =========================== characters =========================== [BETA VERSION]
//constructor(name, type, gender, size)

deck.push(new Character('1', 1, 1, 1));
deck.push(new Character('2', 0, 0, 0));
deck.push(new Character('3', 0, 0, 1));
deck.push(new Character('4', 1, 1, 0));
deck.push(new Character('5', 0, 0, 1));
deck.push(new Character('6', 0, 0, 0));
deck.push(new Character('7', 1, 1, 1));
deck.push(new Character('8', 0, 1, 0));
deck.push(new Character('9', 0, 1, 0));
deck.push(new Character('10', 0, 1, 0));
deck.push(new Character('11', 1, 1, 1));
deck.push(new Character('12', 0, 0, 0));
deck.push(new Character('13', 1, 0, 1));
deck.push(new Character('14', 0, 0, 0));
deck.push(new Character('15', 1, 0, 1));
deck.push(new Character('16', 1, 1, 0));
deck.push(new Character('17', 1, 0, 1));
deck.push(new Character('18', 0, 1, 1));
deck.push(new Character('19', 1, 0, 0));
deck.push(new Character('20', 0, 0, 1));
deck.push(new Character('21', 1, 0, 0));
deck.push(new Character('22', 0, 0, 1));
deck.push(new Character('23', 1, 1, 0));
deck.push(new Character('24', 1, 1, 0));
deck.push(new Character('25', 0, 1, 1));
deck.push(new Character('26', 0, 1, 0));
deck.push(new Character('27', 0, 1, 1));
deck.push(new Character('28', 0, 1, 1));
deck.push(new Character('29', 1, 0, 1));
deck.push(new Character('30', 1, 0, 0));
deck.push(new Character('31', 1, 1, 1));
deck.push(new Character('32', 1, 0, 1));
deck.push(new Character('33', 0, 0, 0));
deck.push(new Character('34', 1, 1, 1));
deck.push(new Character('35', 0, 1, 0));
deck.push(new Character('36', 1, 0, 0));

// ====================== execution ======================
shuffle(deck);
handCards(deck);
displayP1cards();
displayP2cards();
hideAndShowCards();
showCardsDistribution();
