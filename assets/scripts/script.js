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
      this.claw = getRandomBetween(60, 100);
    } else {
      this.claw = getRandomBetween(20, 80);
    }
    if (this.gender) {
      this.meow = getRandomBetween(60, 100, this.claw);
    } else {
      this.meow = getRandomBetween(20, 80, this.claw);
    }
    if (this.size) {
      this.speed = getRandomBetween(60, 100, this.claw, this.size);
    } else {
      this.speed = getRandomBetween(20, 80, this.claw, this.size);
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
  return true;
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
function makeMove() {
  checked = document.querySelector(`input[name="attr-collection"]:checked`);

  switch (checked.value) {
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
  return true;
}

// executes round actions after attribute comparison
// winner = 0 if output is even / winner = 1 if p1 wins / winner = 2 if p2 wins
function doRoundActions(winner) {
  switch (winner) {
    case 0:
      startEvenCardsAnimation();
      moveCard(deckP1, pile);
      moveCard(deckP2, pile);
      break;
    case 1:
      startCardTwoAnimation();
      moveCard(deckP2, deckP1);
      sendCardToBottom(deckP1);
      if (pile.length !== 0) {
        startEvenCardsToP1();
        for (let i = 0; i <= pile.length; i++) {
          moveCard(pile, deckP1);
        }
      }
      break;
    case 2:
      startCardOneAnimation();
      moveCard(deckP1, deckP2);
      sendCardToBottom(deckP2);
      if (pile.length !== 0) {
        startEvenCardsToP2();
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
  return true;
}

// pushes first element of an array to another one 
function moveCard(fromArr, toArr) {
  const movedCard = fromArr.splice(0, 1);

  toArr.push(movedCard[0]);
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
  let highest;
  let selected;

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

  setTimeout(() => {
    if (p1turn) {
      //hide p2 card and show p1 card
      cardP1.style.backgroundImage = `url(${showImg})`;
      cardContentP1.style.visibility = 'visible';
      cardImgP1.style.visibility = 'visible';
      cardP2.style.backgroundImage = `url(${hideImg})`;
      cardContentP2.style.visibility = 'hidden';
      cardImgP2.style.visibility = 'hidden';
      displayP1cards();
    } else {
      cardP1.style.backgroundImage = `url(${hideImg})`;
      cardContentP1.style.visibility = 'hidden';
      cardImgP1.style.visibility = 'hidden';
      cardP2.style.backgroundImage = `url(${showImg})`;
      cardContentP2.style.visibility = 'visible';
      cardImgP2.style.visibility = 'visible';
      displayP2cards();
    }
  }, 3000);

  return true;
}

// checks for winning condition and declares winner
function lookForWinner() {
  const winnerImg = document.getElementById('winner-img');
  if (deckP1.length === 0 || deckP2.length === 0 && pile.length === 0) {
    if (p1turn) {
      changeDisplayToWinnerPage("Jogador 2 venceu!");
      winnerImg.setAttribute('src', deckP2[deckP2.length - 1].img);
    } else {
      changeDisplayToWinnerPage("Jogador 1 venceu!");
      winnerImg.setAttribute('src', deckP1[deckP1.length - 1].img);
    }
  }
  return true;
}

function showCardsDistribution() {
  const deckFieldP1 = document.getElementById('deck-field-p1');
  const deckFieldP2 = document.getElementById('deck-field-p2');
  const pileField = document.getElementById('pile-field');
  const pileFieldImg = document.getElementById('pile-field-img');
  const pileContainer = document.getElementById('pile-container');

  deckFieldP1.innerHTML = deckP1.length;
  deckFieldP2.innerHTML = deckP2.length;
  if (pile.length !== 0) {
    pileContainer.style.visibility = 'visible';
    pileField.innerHTML = `${pile.length}`;
    pileFieldImg.setAttribute('src', './assets/img/svg/messy-pile.svg');
  } else {
    pileContainer.style.visibility = 'hidden';
  }
  return true;
}

// set paw button animation behavior
function showClaws() {
  const soundClaw = new Audio('/./assets/audio/claw2.mp3');

  fightBtn.setAttribute('src', './assets/img/svg/claw.svg');
  soundClaw.volume = 0.4;
  soundClaw.play();
  setTimeout(() => {
    new Audio('/./assets/audio/hissing2.mp3').play();
  }, 200);
  setTimeout(() => {
    fightBtn.setAttribute('src', './assets/img/svg/paw.svg');
  }, 1200);
  return true;
}

// animation to move card from p1 to p2
function startCardOneAnimation() {
  const card1 = document.querySelector('#hidden-card-1');

  card1.style.animationName = "p1-wins";
  card1.style.animationPlayState = "running";
  setTimeout(() => {
    card1.style.animationName = "p1-wins-return";
    card1.style.animationPlayState = "paused";
  }, 1000);
  return true;
}

// animation to move card from p2 to p1
function startCardTwoAnimation() {
  const card2 = document.querySelector('#hidden-card-2');

  card2.style.animationName = "p2-wins";
  card2.style.animationPlayState = "running";
  setTimeout(() => {
    card2.style.animationName = "p2-wins-return";
    card2.style.animationPlayState = "paused";
  }, 1000);
  return true;
}

// animation to move cards from p1 and p2 to pile
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
  }, 1000);
  return true;
}

function startEvenCardsToP1() {
  const card1 = document.querySelector('#hidden-card-1');
  card1.style.animationName = "pile-to-p1";
  card1.style.animationPlayState = "running";
  setTimeout(() => {
    card1.style.animationName = "p1-wins";
    card1.style.animationPlayState = "paused";
  }, 1000);
  return true;
}

function startEvenCardsToP2() {
  const card2 = document.querySelector('#hidden-card-2');
  card2.style.animationName = "pile-to-p2";
  card2.style.animationPlayState = "running";
  setTimeout(() => {
    card2.style.animationName = "p2-wins";
    card2.style.animationPlayState = "paused";
  }, 1000);
  return true;
}

// change display of game-play and winner player's page
function changeDisplayToHome() {
  const home = document.getElementById("home-page");
  const winnerPage = document.getElementById("winner-page");

  home.setAttribute("class", "row d-flex flex-column align-items-center");
  winnerPage.setAttribute("class", "row d-none align-items-center justify-content-center body-size");
  tagAudioGameplay();
  return true;
}

// change element display to show winner page and hide gameplay
function changeDisplayToWinnerPage(text) {
  const textWinner = document.getElementById("text-winner");
  const home = document.getElementById("home-page");
  const winnerPage = document.getElementById("winner-page");

  home.setAttribute("class", "row d-none flex-column align-items-center");
  winnerPage.setAttribute("class", "row d-flex align-items-center justify-content-center body-size");
  textWinner.innerHTML = text;
  tagAudioWinner();
  return true;
}

function clearArray(array) {
  for (let i = 0; i < array.length; i++) {
    array.pop();
  }
  return true;
}

function newGame() {
  clearArray(deckP1);
  clearArray(deckP2);
  clearArray(pile);
  p1turn = true;
  checked = '';
  shuffle(deck);
  handCards(deck);
  displayP1cards();
  displayP2cards();
  hideAndShowCards();
  showCardsDistribution();
  return true;
}

// change music home and winners' page
function tagAudioWinner() {
  const audio = document.getElementById('vol-gameplay');
  audio.setAttribute('src', './assets/audio/thug-life2.mp3');
}

function tagAudioGameplay() {
  const audio = document.getElementById('vol-gameplay');
  audio.setAttribute('src', './assets/audio/saltimbancos.mp3');
}

//function to change labels style on click event
function changeStyle(index) {
  labels.forEach((el, id) => {
    if (id === index) {
      el.style.backgroundColor = '#f6cb09';
      el.style.border = '5px solid #f6b709';
    } else {
      el.style.backgroundColor = '#f6cb0900';
      el.style.border = '0px';
    }
  });
}

// ====================== literals & variables ======================

const deck = []; // array to store all game cards
const deckP1 = []; // array to store each
const deckP2 = []; // player's set of cards
const pile = []; // array to store cards when turn output is even
let p1turn = true; // defines wether it's player 1 turn or not
let checked; // stores checked value of attribute to be compared

// ========================== DOM elements ==========================

const fightBtn = document.getElementById('fight-btn');
const cardP1 = document.getElementById('card-p1');
const cardContentP1 = document.getElementById('card-content-p1');
const cardImgP1 = document.getElementById('card-img-p1');
const nameP1 = document.getElementById('name-p1');
const attrSectionP1 = document.getElementById('attr-section-p1');
const cardP2 = document.getElementById('card-p2');
const cardContentP2 = document.getElementById('card-content-p2');
const cardImgP2 = document.getElementById('card-img-p2');
const nameP2 = document.getElementById('name-p2');
const attrSectionP2 = document.getElementById('attr-section-p2');
const labels = document.querySelectorAll('.attr-select');

// =========================== characters ===========================
//constructor(name, type, gender, size)

deck.push(new Character('copelia', 0, 0, 1));
deck.push(new Character('katrina', 0, 0, 0));
deck.push(new Character('fabinho', 0, 1, 0));
deck.push(new Character('juanito', 0, 1, 1));
deck.push(new Character('siam', 1, 1, 1));
deck.push(new Character('feminha', 0, 0, 0));
deck.push(new Character('piju', 0, 0, 1));
deck.push(new Character('massinho', 1, 1, 0));
deck.push(new Character('jamile', 0, 0, 0));
deck.push(new Character('valtinho', 1, 1, 1));
deck.push(new Character('django', 0, 1, 0));
deck.push(new Character('bartolomeu', 0, 1, 0));
deck.push(new Character('bissinho', 1, 1, 1));
deck.push(new Character('dora', 0, 0, 0));
deck.push(new Character('belezinha', 1, 0, 1));
deck.push(new Character('mizinha', 1, 0, 1));
deck.push(new Character('figaro', 1, 1, 0));
deck.push(new Character('duquesa', 1, 0, 1));
deck.push(new Character('izma', 1, 0, 0));
deck.push(new Character('dinah', 0, 0, 1));
deck.push(new Character('felicia', 1, 0, 0));
deck.push(new Character('alfa', 0, 0, 1));
deck.push(new Character('dante', 1, 1, 0));
deck.push(new Character('tibbs', 1, 1, 0));
deck.push(new Character('louise', 0, 1, 1));
deck.push(new Character('diablo', 0, 1, 0));
deck.push(new Character('iago', 0, 1, 1));
deck.push(new Character('baguera', 0, 1, 1));
deck.push(new Character('amanda', 1, 0, 1));
deck.push(new Character('judite', 1, 0, 0));
deck.push(new Character('godofredo', 1, 1, 1));
deck.push(new Character('minuc', 1, 0, 1));
deck.push(new Character('purguinha', 0, 0, 0));
deck.push(new Character('edgar', 1, 1, 1));
deck.push(new Character('pink', 0, 1, 0));
deck.push(new Character('mimi', 1, 0, 0));

// ====================== execution ======================

fightBtn.addEventListener('click', showClaws);
fightBtn.addEventListener('click', makeMove);
labels.forEach((el, id) => {
  el.setAttribute(`onclick`, `changeStyle(${id})`);
});
newGame();