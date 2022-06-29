'use strict';

const gameBoard = (function createGameBoard() {
  const board = ['', '', '', '', '', '', '', '', ''];
  const tiles = document.querySelectorAll('.gameboard-tile');

  const renderBoard = function () {
    tiles.forEach((tile, i) => {
      tile.textContent = board[i];
    });
  };

  return { board, tiles, renderBoard };
})();

const players = function (playerName, playerSymbol) {
  return { playerName, playerSymbol };
};

const displayController = (function () {
  const playerOne = players('Chris', 'X');
  const playerTwo = players('Orianna', 'O');
  let currentPlayer = playerOne;

  let winner = false;
  let spotsLeft = 9;

  const turn = function () {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const placeMark = function () {
    gameBoard.tiles.forEach((tile, i) => {
      tile.addEventListener('click', function tileEvent() {
        if (tile.textContent === '' && winner != true) {
          spotsLeft -= 1;
          const tileDataAttr = tile.dataset.index;
          gameBoard.board.splice(tileDataAttr, 1, currentPlayer.playerSymbol);
          gameBoard.renderBoard();
          checkWinner();
          turn();
          console.log(winner);
        }
        if (spotsLeft < 1) {
          console.log('tie');
        }
      });
    });

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    function checkWinner() {
      winningCombinations.forEach((combo) => {
        if (
          gameBoard.board[combo[0]] === currentPlayer.playerSymbol &&
          gameBoard.board[combo[1]] === currentPlayer.playerSymbol &&
          gameBoard.board[combo[2]] === currentPlayer.playerSymbol
        ) {
          console.log(`${currentPlayer.playerName} wins!`);
          winner = true;
        }
      });
    }
  };

  return { placeMark };
})();

displayController.placeMark();
