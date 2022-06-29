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
  const playerOne = players('PlayerX', 'X');
  const playerTwo = players('PlayerO', 'O');
  let currentPlayer = playerOne;
  let winner = false;
  let spotsLeft = 9;

  const turn = function () {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const placeMark = function () {
    gameBoard.tiles.forEach((tile) => {
      tile.addEventListener('click', function tileEvent() {
        if (tile.textContent === '' && winner != true) {
          spotsLeft -= 1;
          const tileDataAttr = tile.dataset.index;
          console.log(gameBoard.board);
          gameBoard.board.splice(tileDataAttr, 1, currentPlayer.playerSymbol);
          checkWinner();
          turn();
          gameBoard.renderBoard();
        }

        if (spotsLeft <= 0 && winner != true ) {
          const modal = document.querySelector('.modal-background');
          const winnerMessage = document.querySelector('.winner-message');
          modal.classList.add('modal-active');
          winnerMessage.textContent = 'Its A Tie';
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
          const winnerMessage = document.querySelector('.winner-message');
          const modal = document.querySelector('.modal-background');
          modal.classList.add('modal-active');
          winnerMessage.textContent = `${currentPlayer.playerName} Wins !`;
          winner = true;
        }
      });
    }

    const playAgainBtn = document.querySelector('.play-again-btn');
    playAgainBtn.addEventListener('click', function () {
      const modal = document.querySelector('.modal-background');
      gameBoard.board.splice(0, gameBoard.board.length, '', '', '', '', '', '', '', '', '');
      currentPlayer = playerOne;
      gameBoard.tiles.forEach((tile) => {
        tile.textContent = '';
      });
      spotsLeft = 9;
      winner = false;
      modal.classList.remove('modal-active');
    });
  };

  return { placeMark };
})();

displayController.placeMark();

const playBtn = document.querySelector('.play-btn');
const playGameContainer = document.querySelector('.playgame');
const gameboardContainer = document.querySelector('.gameboard');

playBtn.addEventListener('click', function () {
  playGameContainer.style.display = 'none';
  gameboardContainer.style.display = 'grid';
});
