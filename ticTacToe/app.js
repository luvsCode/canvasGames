window.addEventListener("DOMContentLoaded", () => {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  const resetButton = document.querySelector("#reset");
  const xBtn = document.querySelector("xBtn");
  const oBtn = document.querySelector("oBtn");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;
  let roundWon = false;

  const xWon = "X won";
  const oWon = "O won";
  const tie = "Its a tie";
  /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleResultValidation() {
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
  }

  if (roundWon) {
    announce(currentPlayer === "X" ? xWon : oWon);
    isGameActive = false;
    console.log("round won");
    return;
  }

  if (!board.includes("")) {
    announce(tie);
    console.log("tie");
  }

  const announce = (type) => {
    switch (type) {
      case oWon:
        console.log("O won this round");
        break;
      case xWon:
        console.log("X won this round");
        break;
      case tie:
        console.log("its a tie!!!");
    }
  };

  const isValidAction = (tile) => {
    if (tile.innerText === "X" || tile.innerText === "O") {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    console.log("current player was: " + currentPlayer);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log("Current player is now: " + currentPlayer);
  };

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;

    if (currentPlayer === "O") {
      changePlayer();
      //console.log("Current player O changed to: " + currentPlayer);
    }

    tiles.forEach((tile) => {
      tile.innerText = "";
      tile.classList.remove("playerX");
      tile.classList.remove("playerO");
    });
  };

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
  });

  resetButton.addEventListener("click", resetBoard);
});
