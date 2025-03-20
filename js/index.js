let currSpyTile;
let currCivilianTile;
let score = 0;
let gameOver = false;
let spyClicked = false;
const backgroundSound = document.getElementById("background");
const catchSound = document.getElementById("catch");
const endgameSound = document.getElementById("endgame");

window.onload = function() {
  setGame();
}

function setGame() {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString(); // <= id must be a string (but js will convert this automatically anyway)
    document.getElementById("board").appendChild(tile);
    tile.addEventListener("click", selectTile);
  }

  setInterval(setSpy, 1000);
  setInterval(setCivilian, 1500);
}

function getRandomTile () {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setSpy() {
  if(gameOver) {
    return;
  }

  if (currSpyTile) {
    currSpyTile.innerHTML = "";
  }
  
  let createSpy = document.createElement("img");
  createSpy.src = "media/Spy_Vs_Spy_.png";

  let num = getRandomTile();
  if (currCivilianTile && currCivilianTile.id == num) {
    return;
}

  currSpyTile = document.getElementById(num);
  currSpyTile.appendChild(createSpy);
  spyClicked = false;

  setTimeout(() => {
    createSpy.classList.add("visible");
  }, 10);
}

function setCivilian() {
  if(gameOver) {
    return;
  }

  if (currCivilianTile) {
    currCivilianTile = currCivilianTile.innerHTML = "";
  }

  let civilian = document.createElement("img");
  civilian.src = "media/civilian.png";

  let num = getRandomTile();
  if (currSpyTile && currSpyTile.id == num) {
    return;
}

  currCivilianTile = document.getElementById(num);
  currCivilianTile.appendChild(civilian);

  setTimeout(() => {
    civilian.classList.add("visible");
  }, 10);
}

function selectTile() {
  if (gameOver) {
    return;
  }

  if (this == currSpyTile && !spyClicked) {
    score += 10;
    document.getElementById("span").innerText = score.toString();
    spyClicked = true;
    catchSound.play();
    catchSound.volume = 0.5;
  }

  else if (this == currCivilianTile) {
    document.getElementById("score").innerText = "GAME OVER, YOUR SCORE IS: \n" + score.toString();
    gameOver = true;
    endgameSound.play();
    endgameSound.volume = 0.5;
  }
}