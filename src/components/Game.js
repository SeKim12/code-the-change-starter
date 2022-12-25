import React, { useState } from "react";
import Board from "./Board";

const WIDTH = 3;

const Game = () => {
  const [board, setBoard] = useState(Array(WIDTH ** 2).fill(null));
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(false);
  const [winner, setWinner] = useState(null);

  const nextPlayer = () => {
    return xIsNext ? 'X' : 'O';
  }

  const calculateWinner = (lastMove, curBoard) => {
    let colStart = lastMove % WIDTH;
    let rowStart = lastMove - colStart;

    // traverse column of last move
    let count = 0;
    for (let i = colStart; i < curBoard.length; i += WIDTH) {
      if (curBoard[i] === null) break;
      count = curBoard[i] === 'O' ? count + 1 : count - 1;
    }
    if (Math.abs(count) === WIDTH) {
      return count > 0 ? 'O' : 'X';
    }

    // traverse row of last move
    count = 0;
    for (let i = 0; i < WIDTH; i++) {
      if (!curBoard[rowStart + i]) break;
      count = curBoard[rowStart + i] === 'O' ? count + 1 : count - 1;
    }
    if (Math.abs(count) === WIDTH) {
      return count > 0 ? 'O' : 'X';
    }

    // traverse both diagonals
    let diag = 0;
    count = 0;
    for (let i = 0; i < WIDTH; i++) {
      if (curBoard[diag] === null) break;
      count = curBoard[diag] === 'O' ? count + 1 : count - 1;
      diag += WIDTH + 1;
    }
    if (Math.abs(count) === WIDTH) {
      return count > 0 ? 'O' : 'X';
    }

    diag = WIDTH - 1;
    count = 0;
    for (let i = 0; i < WIDTH; i++) {
      if (curBoard[diag] === null) break;
      count = curBoard[diag] === 'O' ? count + 1 : count - 1;
      diag += WIDTH - 1;
    }
    if (Math.abs(count) === WIDTH) {
      return count > 0 ? 'O' : 'X';
    }
    return null;
  }

  const jumpToStart = () => {
    setBoard(Array(WIDTH ** 2).fill(null));
    setStepNumber(0);
    setXisNext(false);
    setWinner(null);
  }

  const handleClick = (i) => {
    if (winner) {
      alert(`${winner} already won!`);
    } else if (board[i]) {
      alert("Square already played!");
    } else {
      const newBoard = [...board];
      newBoard[i] = nextPlayer();
      setBoard(newBoard);
      setXisNext(nextPlayer() !== 'X');
      setStepNumber(stepNumber + 1);
      setWinner(calculateWinner(i, newBoard));
    }
  }

  const result = () => {
    if (winner) {
      return `Winner: <${winner}>`;
    } else if (stepNumber === WIDTH ** 2) {
      return "Tie Game";
    } else {
      return `Next Player: <${nextPlayer()}>`;
    }
  }

  return (
      <>
        <h1>Tic Tac Toe</h1>
        <Board squares={board} onClick={(i) => handleClick(i)}></Board>
        <div className='info-wrapper'>
          <div>
            <button onClick={jumpToStart}>Go to Start</button>
          </div>
          <h3>{result()}</h3>
        </div>
      </>
  );
};

export default Game;
