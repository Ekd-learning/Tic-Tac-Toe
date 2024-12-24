"use strict";

const gameboard = (function () {
  const theBoard = [
    ["*", "*", "*"],
    ["*", "*", "*"],
    ["*", "*", "*"],
  ];
  const addX = (row, col) => (theBoard[row][col] = "X");
  const addO = (row, col) => (theBoard[row][col] = "O");
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
  const checkVictory = () => {
    // check rows first
    for (let row = 0; row < theBoard.length; row++) {
      let values = [0, 0, 0];
      for (let col = 0; col < theBoard[row].length; col++) {
        if (theBoard[row][col] === "X") values[col] = 1;
        if (theBoard[row][col] === "O") values[col] = -1;
      }
      if (checkLine(values) === 1) return 1;
      if (checkLine(values) === -1) return -1;
    }
    // check columns second
    for (let row = 0; row < theBoard.length; row++) {
      let values = [0, 0, 0];
      for (let col = 0; col < theBoard[row].length; col++) {
        if (theBoard[col][row] === "X") values[row] = 1;
        if (theBoard[col][row] === "O") values[row] = -1;
      }
      if (checkLine(values) === 1) return 1;
      if (checkLine(values) === -1) return -1;
    }
    // check left-to-right diagonal first
    let values = [0, 0, 0]; // cant store it inside the row-forLoop as it will be refreshed
    for (let row = 0; row < theBoard.length; row++) {
      for (let col = 0; col < theBoard[row].length; col++) {
        if (row !== col) continue;
        if (theBoard[row][col] === "X") values[col] = 1;
        if (theBoard[row][col] === "O") values[col] = -1;
      }
    }
    if (checkLine(values) === 1) return 1;
    if (checkLine(values) === -1) return -1;
    // check right-to-left diagonal last
    values = [0, 0, 0];
    for (let row = 0; row < theBoard.length; row++) {
      for (let col = 0; col < theBoard[row].length; col++) {
        if (theBoard[row][theBoard.length - 1 - col] === "X") values[col] = 1;
        if (theBoard[row][theBoard.length - 1 - col] === "O") values[col] = -1;
      }
    }
    if (checkLine(values) === 1) return 1;
    if (checkLine(values) === -1) return -1;
    return 0;
  };
  return { addX, addO, checkVictory, printGameboard };
})();

gameboard.printGameboard();
gameboard.addX(2, 0);
gameboard.addX(1, 1);
gameboard.addX(0, 2);
console.log("victory? :", gameboard.checkVictory() ? "Yay" : "Nah");
gameboard.printGameboard();
