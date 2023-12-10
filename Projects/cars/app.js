document.addEventListener("keydown", handleKey);
document.addEventListener("DOMContentLoaded", startGame);
const myCar = new Car();
const playGround = document.querySelector(".parent");
let myTarget = new Target();
let points = 0;
const pointsPar = document.querySelector("#points");
let bombs = [];

function startGame() {
  createBombs(4);
  myTarget.addTarget();
  playGround.appendChild(myCar.html);
}

function createBombs(numberOfBombs) {
  for (let index = 0; index < numberOfBombs; index++) {
    bombs[index] = new Bomb();
    bombs[index].addBomb();
  }
}

function handleKey(event) {
  if (myCar.direction == event.key) {
    myCar.move(event.key);
  } else {
    myCar.rotate(event.key);
  }
}

function isWin() {
  if (
    myTarget.locationRow == myCar.locationRow &&
    myTarget.locationColumn == myCar.locationColumn
  ) {
    points++;
    pointsPar.textContent = points;
    myTarget.removeTarget();
    myTarget = new Target();
    myTarget.addTarget();
  }
}

function isLose() {
  for (let index = 0; index < bombs.length; index++) {
    if (
      bombs[index].locationColumn == myCar.locationColumn &&
      bombs[index].locationRow == myCar.locationRow
    ) {
      points--;
      pointsPar.textContent = points;
      bombs[index].removeBomb();
      bombs[index] = new Bomb();
      bombs[index].addBomb();
    }
  }
}

function Car() {
  this.direction = "ArrowRight";
  this.html = document.createElement("img");
  this.html.src = "car.png";
  this.html.className = "car";
  this.locationColumn = 1;
  this.locationRow = 1;
  this.html.style.gridRow = this.locationRow;
  this.html.style.gridColumn = this.locationColumn;
  this.rotate = function (pressedKey) {
    this.direction = pressedKey;
    if (pressedKey == "ArrowDown") {
      this.html.style.transform = "rotate(135deg)";
    }
    if (pressedKey == "ArrowUp") {
      this.html.style.transform = "rotate(315deg)";
    }
    if (pressedKey == "ArrowRight") {
      this.html.style.transform = "rotate(45deg)";
    }
    if (pressedKey == "ArrowLeft") {
      this.html.style.transform = "rotate(225deg)";
    }
  };
  this.move = function (pressedKey) {
    if (pressedKey == "ArrowDown") {
      if (this.locationRow < 10) {
        this.html.style.gridRow = this.locationRow + 1;
        this.locationRow = this.locationRow + 1;
      }
    }
    if (pressedKey == "ArrowUp") {
      if (this.locationRow > 1) {
        this.html.style.gridRow = this.locationRow - 1;
        this.locationRow = this.locationRow - 1;
      }
    }
    if (pressedKey == "ArrowRight") {
      if (this.locationColumn < 10) {
        this.html.style.gridColumn = this.locationColumn + 1;
        this.locationColumn = this.locationColumn + 1;
      }
    }
    if (pressedKey == "ArrowLeft") {
      if (this.locationColumn > 1) {
        this.html.style.gridColumn = this.locationColumn - 1;
        this.locationColumn = this.locationColumn - 1;
      }
    }
    isWin();
    isLose();
  };
}

function Target() {
  this.html = document.createElement("img");
  this.locationColumn = Math.floor(Math.random() * 10) + 1;
  this.locationRow = Math.floor(Math.random() * 10) + 1;
  this.html.src = "target.png";
  this.html.className = "target";
  this.html.style.gridColumn = this.locationColumn;
  this.html.style.gridRow = this.locationRow;
  this.addTarget = function () {
    playGround.appendChild(this.html);
  };
  this.removeTarget = function () {
    playGround.removeChild(this.html);
  };
}

function Bomb() {
  this.html = document.createElement("img");
  this.locationColumn = Math.floor(Math.random() * 10) + 1;
  this.locationRow = Math.floor(Math.random() * 10) + 1;
  this.html.src = "bomb.png";
  this.html.className = "bomb";
  this.html.style.gridColumn = this.locationColumn;
  this.html.style.gridRow = this.locationRow;
  this.addBomb = function () {
    playGround.appendChild(this.html);
  };
  this.removeBomb = function () {
    playGround.removeChild(this.html);
  };
}
