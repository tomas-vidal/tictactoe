const startButton = document.querySelector("#start");

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
        if (e.target.textContent !== "" || Game.gameOver) {
          return;
        }
        addToken(e.target.id);
      });
    });
  };

  const addToken = (indexMark) => {
    board[indexMark] = Game.switchPlayer();
    render();
    Game.checkBoard(board);
    console.log(Game.gameOver);
  };

  return {
    render,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let gameOver = false;
  let players = [
    { name: "John", mark: "X" },
    { name: "Mark", mark: "O" },
  ];
  let currentPlayerIndex = 0;

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    return players[currentPlayerIndex].mark;
  };

  const checkBoard = (board) => {
    for (let i = 0; i < players.length; i++) {
      if (
        board[0] === players[i].mark &&
        board[1] === players[i].mark &&
        board[2] === players[i].mark
      ) {
        Game.gameOver = true;
      } else if (
        board[3] === players[i].mark &&
        board[4] === players[i].mark &&
        board[5] === players[i].mark
      ) {
        Game.gameOver = true;
      } else if (
        board[6] === players[i].mark &&
        board[7] === players[i].mark &&
        board[8] === players[i].mark
      ) {
        Game.gameOver = true;
      } else if (
        board[0] === players[i].mark &&
        board[4] === players[i].mark &&
        board[8] === players[i].mark
      ) {
        Game.gameOver = true;
      } else if (
        board[2] === players[i].mark &&
        board[4] === players[i].mark &&
        board[6] === players[i].mark
      ) {
        Game.gameOver = true;
      } else if (
        board[0] === players[i].mark &&
        board[3] === players[i].mark &&
        board[6] === players[i].mark
      ) {
        Game.gameOver = true;
      } else if (
        board[1] === players[i].mark &&
        board[4] === players[i].mark &&
        board[7] === players[i].mark
      ) {
        Game.gameOver = true;
      } else if (
        board[2] === players[i].mark &&
        board[5] === players[i].mark &&
        board[8] === players[i].mark
      ) {
        Game.gameOver = true;
      }
    }
  };

  return {
    switchPlayer,
    checkBoard,
    gameOver,
  };
})();

startButton.addEventListener("click", () => {
  Gameboard.render();
});
