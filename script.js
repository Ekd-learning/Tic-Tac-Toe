"use strict";
let whoseTurn = true; // true = 1st player, false = 2nd player

const gameboard = (function () {
  const theBoard = [
    ["*", "*", "*"],
    ["*", "*", "*"],
    ["*", "*", "*"],
  ];
  let player1_score = 0;
  let player2_score = 0;

  const clearTheBoard = () => {
    for (let row = 0; row < theBoard.length; row++) {
      for (let col = 0; col < theBoard[row].length; col++)
        theBoard[row][col] = "*";
    }
  };
  const addX = (row, col) => {
    if (validMove(row, col)) theBoard[row][col] = "X";
  };
  const addO = (row, col) => {
    if (validMove(row, col)) theBoard[row][col] = "O";
  };
  const checkLine = (arr) => {
    if (arr.every((value) => value > 0)) return 1;
    else if (arr.every((value) => value < 0)) return -1;
    else {
      return 0;
    }
  };
  const printGameboard = () => {
    console.log("The board: \n");
    for (let row = 0; row < theBoard.length; row++) {
      let theLine = "";
      for (let col = 0; col < theBoard[row].length; col++)
        theLine += theBoard[row][col];
      console.log(theLine);
    }
  };

  const checkRowsVictory = () => {
    for (let row = 0; row < theBoard.length; row++) {
      if (theBoard[row].every((el) => el === theBoard[row][0])) {
        let retVal = 0;
        if (theBoard[row][0] === "X") return 1;
        if (theBoard[row][0] === "O") return -1;
      }
      return 0;
    }
  };
  const checkColsVictory = () => {
    let values = [0, 0, 0];
    for (let row = 0; row < theBoard.length; row++) {
      for (let col = 0; col < theBoard[row].length; col++) {
        if (theBoard[col][row] === "X") values[col] = 1;
        if (theBoard[col][row] === "O") values[col] = -1;
      }
      if (values.every((el) => el === 1)) return 1;
      if (values.every((el) => el === -1)) return -1;
      values = [0, 0, 0];
    }
    return 0;
  };
  const checkLeftToRightDiagonalVictory = () => {
    let values = [0, 0, 0];
    for (let row = 0; row < theBoard.length; row++) {
      for (let col = 0; col < theBoard[row].length; col++) {
        if (row !== col) continue;
        if (theBoard[row][col] === "X") values[row] = 1;
        if (theBoard[row][col] === "O") values[col] = -1;
      }
    }
    if (values.every((el) => el === 1)) return 1;
    if (values.every((el) => el === -1)) return -1;
    return 0;
  };
  const checkRightToLeftDiagonalVictory = () => {
    let values = [0, 0, 0];
    for (let row = 0; row < theBoard.length; row++) {
      for (let col = 0; col < theBoard[row].length; col++) {
        if (row !== theBoard[row].length - 1 - col) continue;
        if (theBoard[row][col] === "X") values[row] = 1;
        if (theBoard[row][col] === "O") values[col] = -1;
      }
    }
    if (values.every((el) => el === 1)) return 1;
    if (values.every((el) => el === -1)) return -1;
    return 0;
  };

  const checkVictory = () => {
    let isVictory = checkRowsVictory();
    if (Boolean(isVictory)) return isVictory;
    isVictory = checkColsVictory();
    if (Boolean(isVictory)) return isVictory;
    isVictory = checkLeftToRightDiagonalVictory();
    if (Boolean(isVictory)) return isVictory;
    isVictory = checkRightToLeftDiagonalVictory();
    if (Boolean(isVictory)) return isVictory;
    return 0;
  };

  const validMove = (row, col) => (theBoard[row][col] === "*" ? true : false);
  return { addX, addO, checkVictory, printGameboard, validMove, clearTheBoard };
})();

const displayController = (function () {
  const theContainer = document.querySelector(`.tictactoe-container`);

  const createElement = (value = " ") =>
    `<img src='./images/${value}.png' width='100%' height='100%'>`;

  const placeElement = (row, col, value = " ") => {
    const theCard = document.getElementById(`${row + "" + col}`);
    if (theCard.childNodes.length !== 0) return;
    theCard.insertAdjacentHTML("beforeend", createElement(value));
  };

  const clearTheBoard = () =>
    [...theContainer.children].forEach((card) => card.firstChild?.remove());

  return { placeElement, clearTheBoard };
})();

document.addEventListener("click", function (e) {
  const target = e.target.closest(".card");
  if (!target) return;
  const row = target.getAttribute("id").charAt(0);
  const col = target.getAttribute("id").charAt(1);
  if (gameboard.validMove(row, col)) {
    displayController.placeElement(row, col, whoseTurn ? "X" : "O");
    whoseTurn ? gameboard.addX(row, col) : gameboard.addO(row, col);
    gameboard.printGameboard();
    if (gameboard.checkVictory() > 0) {
      player1_score++;
    }
    if (gameboard.checkVictory() < 0) {
      player2_score++;
    }
    whoseTurn = whoseTurn ? false : true;
  }
});
document.querySelector(`#clearTheBoard`).addEventListener("click", function () {
  gameboard.clearTheBoard();
  console.log(gameboard.printGameboard());
  displayController.clearTheBoard();
});
document.querySelector(`#start`).addEventListener("click", function () {
  const player1_name = document.querySelector(`#player1_name`).value;
  if (!player1_name) return;
  const player2_name = document.querySelector(`#player2_name`).value;
  if (!player2_name) return;

  document.querySelector(`.input_container`).classList.add("hidden");
  document.querySelector(`#clearTheBoard`).classList.remove("hidden");
  document.querySelector(`.tictactoe-container`).classList.remove("hidden");
});
