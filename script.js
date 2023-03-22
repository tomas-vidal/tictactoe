const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  let boardDiv = document.querySelector("#game");
  const render = () => {
    boardDiv.innerHTML = "";
    board.forEach((board, index) => {
      boardDiv.innerHTML += `<div class="cell" id="${index}">${board}</div>`;
    });
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (e.target.textContent !== "" || Game.getGameStatus()) {
          return;
        }
        addToken(e.target.id);
        if (Game.getGameStatus()) {
          console.log(`winner is ${Game.getWinner()}`);
          ScoreBoard.renderScores();
        }
      });
    });
  };

  const addToken = (indexMark) => {
    board[indexMark] = Game.switchPlayer();
    render();
    Game.checkBoard(board);
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    render();
  };

  return {
    render,
    resetBoard,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
    score: 0,
  };
};

const ScoreBoard = (() => {
  const title = document.querySelector("h1");
  const scoreElement = document.createElement("div");

  const renderScores = () => {
    const players = Game.getPlayers();
    scoreElement.innerHTML = `<div>${players[0].name} ${players[0].score} - ${players[1].score} ${players[1].name} </div>`;
    title.parentNode.insertBefore(scoreElement, title.nextSibling);
  };

  return {
    renderScores,
  };
})();

const Game = (() => {
  let gameOver = false;
  let winnerIndex = "";
  let players = [
    { name: "John", mark: "X", score: 0 },
    { name: "Mark", mark: "O", score: 0 },
  ];
  let currentPlayerIndex = 1;

  const start = () => {
    Gameboard.render();
    ScoreBoard.renderScores();
  };

  const reset = () => {
    currentPlayerIndex = 1;
    gameOver = false;
    Gameboard.resetBoard();
  };

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 1 ? 0 : 1;
    return players[currentPlayerIndex].mark;
  };

  const checkBoard = (board) => {
    const winnerPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (pattern of winnerPattern) {
      if (
        board[pattern[0]] !== "" &&
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[0]] === board[pattern[2]]
      ) {
        gameOver = true;
        winnerIndex = board[pattern[0]] === "X" ? "0" : "1";
      }
    }
  };

  const getGameStatus = () => {
    return gameOver;
  };

  const getWinner = () => {
    players[winnerIndex].score++;
    return players[winnerIndex].name;
  };

  const getPlayers = () => {
    return players;
  };

  return {
    start,
    reset,
    switchPlayer,
    checkBoard,
    getGameStatus,
    getWinner,
    getPlayers,
  };
})();

startButton.addEventListener("click", () => {
  Game.start();
});

resetButton.addEventListener("click", () => {
  Game.reset();
});
