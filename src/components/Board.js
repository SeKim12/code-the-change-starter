import React from "react";
import Square from "./Square";

const Board = ({squares, onClick}) => (
  <div className="board" style={{
    "grid-template": `repeat(${Math.sqrt(squares.length)}, 1fr) / repeat(${Math.sqrt(squares.length)}, 1fr)`
  }}>
    {squares.map((_, i) => <Square value={_} onClick={() => onClick(i)}/>)}
  </div>
);

export default Board;
