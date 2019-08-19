window.onload = () => start(); //Initialize game variables

//Player class
class player {
  constructor(name) {
    this.name = name;
    this.tempBank = 0;
    this.permBank = 0;
  }
  addToTemp(dice) {
    this.tempBank += dice;
  }

  addToPerm() {
    this.permBank += this.tempBank;
    this.tempBank = 0;
  }

  deleteFromTemp() {
    this.tempBank = 0;
  }
}

// //Create players
const player1Obj = new player('Player1');
const player2Obj = new player('Player2');

//Dice faces
const diceNumbers = [
  '',
  './images/dice-1.png',
  './images/dice-2.png',
  './images/dice-3.png',
  './images/dice-4.png',
  './images/dice-5.png',
  './images/dice-6.png'
];

//Randomize players
const players = [
  '',
  player1Obj,
  player2Obj,
  player1Obj,
  player2Obj,
  player1Obj,
  player2Obj
];

//Get DOM Elements
const diceDiv = document.querySelector('.roll .dice');
const rollDiv = document.querySelector('.roll');
const rollDice = document.querySelector('#roll');
const play = document.querySelector('.play');
const playBtn = document.getElementById('playBtn');
const info = document.querySelector('.msg');
const msg = document.querySelector('.info p');
const add1 = document.querySelector('.add1');
const add2 = document.querySelector('.add2');
const end1 = document.querySelector('.end1');
const end2 = document.querySelector('.end2');
const player1Dom = document.querySelector('.player1');
const player2Dom = document.querySelector('.player2');
const restart = document.querySelector('.restart');
const quit = document.querySelector('.quit');
const name = document.querySelector('.name');
const temp1 = document.querySelector('.temp1 p');
const temp2 = document.querySelector('.temp2 p');
const perm1 = document.querySelector('.perm1 p');
const perm2 = document.querySelector('.perm2 p');

//Globals
let number = 0;
let currentPlayer = {};
let dice = 0;

//Initialize variables, and DOM controls to off until play button clicked
const start = () => {
  showDice();
  playBtn.disabled = false;
  play.style = 'opacity: 1';
  rollDice.disabled = true;
  add1.disabled = true;
  end1.disabled = true;
  add2.disabled = true;
  end2.disabled = true;
  temp1.innerHTML = '';
  perm1.innerHTML = '';
  temp2.innerHTML = '';
  perm2.innerHTML = '';
  rollDice.style = 'opacity: 0.3';
  rollDiv.style = 'opacity: 0.3';
  player1Dom.style = 'opacity: 0.3';
  player2Dom.style = 'opacity: 0.3';
};

//Play button clicked.Switch on controls
playBtn.addEventListener('click', e => {
  currentPlayer = players[dice];
  rollDice.disabled = false;
  playBtn.disabled = true;
  play.style = 'opacity: 0.3';
  rollDice.style = 'opacity: 1';
  rollDiv.style = 'opacity: 1';
  info.style = 'opacity: 1';
  msg.innerHTML = `<strong>${
    currentPlayer.name
  }</strong> <br> Please roll the dice`;
  msg.style = 'padding-top: 0; transform: scale(1); color: #302f2f;';
  currentPlayer === player1Obj
    ? (player1Dom.style = 'opacity: 1')
    : (player2Dom.style = 'opacity: 1');
});

//Listen for click on roll-dice button
rollDice.addEventListener('click', () => {
  showDice();

  if (dice === 1) {
    currentPlayer.deleteFromTemp();
    if (currentPlayer === player1Obj) {
      temp1.innerHTML = `Temporary score ${player1Obj.tempBank}`;
    } else {
      temp2.innerHTML = `Temporary score ${player2Obj.tempBank}`;
    }

    msg.innerHTML = `<strong>${
      currentPlayer.name
    }</strong> <br> you have rolled a <strong>${dice}</strong> <br><br> and wiped out your Temporary score!`;

    //Delay message so it can be read....
    setTimeout(() => {
      changePlayer();
    }, 5000);
  } else {
    msg.innerHTML = `<strong>${
      currentPlayer.name
    } you have rolled a ${dice}</strong> <br><br> Either accept the roll by clicking add <br> or end the session.`;
    if (currentPlayer === player1Obj) {
      add1.disabled = false;
      end1.disabled = false;
      rollDice.disabled = true;
    } else {
      add2.disabled = false;
      end2.disabled = false;
      rollDice.disabled = true;
    }
  }
});

//Listen for player add button click
const add = (button, tempBox, playerObj) => {
  button.addEventListener('click', () => {
    playerObj.addToTemp(dice);
    tempBox.innerHTML = `Temporary score ${playerObj.tempBank}`;
    button.disabled = true;
    rollDice.disabled = false;
    msg.innerHTML = `<strong>${
      currentPlayer.name
    }</strong> <br> Please roll again`;
  });
};

const end = (button, tempBox, permBox, playerObj) => {
  button.addEventListener('click', () => {
    currentPlayer.addToPerm();
    tempBox.innerHTML = `Temporary score ${playerObj.tempBank}`;
    permBox.innerHTML = `Permanent score ${playerObj.permBank}`;
    rollDice.disabled = false;

    if (currentPlayer.permBank >= 100) {
      msg.innerHTML = `<strong>${
        currentPlayer.name
      }</strong> <br> Congratulations, You are a winner`;
      msg.style = 'padding-top: 20px; transform: scale(1.1); color: orangered';
      start();
    } else {
      changePlayer();
    }
  });
};

//Listen for player 1 and player 2 add/end button clicks
add(add1, temp1, player1Obj);
add(add2, temp2, player2Obj);
end(end1, temp1, perm1, player1Obj);
end(end2, temp2, perm2, player2Obj);

//Change player
const changePlayer = () => {
  if (currentPlayer === player1Obj) {
    currentPlayer = player2Obj;
    msg.innerHTML = `<strong>${
      currentPlayer.name
    }</strong> <br> Please roll the dice`;
    player2Dom.style = 'opacity: 1';
    player1Dom.style = 'opacity: 0.3';
    end1.disabled = true;
    add1.disabled = true;
    end2.disabled = false;
  } else {
    currentPlayer = player1Obj;
    msg.innerHTML = `<strong>${
      currentPlayer.name
    }</strong> <br> Please roll the dice`;
    player1Dom.style = 'opacity: 1';
    player2Dom.style = 'opacity: 0.3';
    end2.disabled = true;
    add2.disabled = true;
    end1.disabled = false;
  }
};

//Get random number between 1 - 6 and display on DOM
const showDice = () => {
  dice = getRandomIntInclusive(1, 6);
  diceDiv.innerHTML = `<img src=${diceNumbers[dice]}>`;
};

//This function returns a random number
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
};

//Restart game
restart.addEventListener('click', () => {
  msg.innerHTML = '';
  start();
});

//Quit game
quit.addEventListener('click', () => window.close());
