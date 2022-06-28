const gameBoard = (function createGameBoard() {
  const board = ['', '', '', '', '', '', '', '', ''];
  const boardTiles = document.querySelectorAll('.gameboard-tile');

  const renderGameBoard = function () {
    boardTiles.forEach((tile, i) => {
      tile.textContent = board[i];
    });
  };

  return { board, boardTiles, renderGameBoard };
})();

const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerX;

const players = function () {
  const changePlayer = function () {
    currentPlayer === playerX
      ? (currentPlayer = playerO)
      : (currentPlayer = playerX);
  };

  return { changePlayer };
};

const game = (function () {
  // allows me to inheriate from the gameboard module using object destructiring
  const { board, boardTiles, renderGameBoard } = gameBoard;
  const { changePlayer } = players();

  const playerMoves = function () {
    boardTiles.forEach((tile) => {
      tile.addEventListener('click', function tileListener() {
        const tileIndex = tile.dataset.index;
        board.splice(tileIndex, 1, currentPlayer);
        renderGameBoard();
        changePlayer();
        tile.removeEventListener('click', tileListener);
      });
    });
  };

  return { playerMoves };
})();

const jeff = game;

jeff.playerMoves();
