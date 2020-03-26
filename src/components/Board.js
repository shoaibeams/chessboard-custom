import React from 'react'
import { Square } from './Square'
import { v4 as uuidv4 } from 'uuid'
import '../index.css'
import { isEven } from '../helpers/utils'
import bottomSide from '../pieces/CircularPiece'

const Board = props => {
  const renderSquare = (i, squareShade, boardSize) => {
    const squareToRender = props.squares[i]

    if (squareToRender) {
      squareToRender.style = {
        ...squareToRender.style,
        width: `${boardSize}px`,
        height: `${boardSize}px`
      }
    } else if (!props.squares[i]) {
      props.squares[i] = new bottomSide()
      props.squares[i].style = {
        ...props.squares[i].style,
        width: `${boardSize}px`,
        height: `${boardSize}px`
      }
    }

    return (
      <Square
        key={uuidv4()}
        piece={props.squares[i]}
        style={props.squares[i] ? props.squares[i].style : null}
        shade={squareShade}
        onClick={() => props.onClick(i)}
      />
    )
  }

  const board = []
  for (let i = 0; i < 8; i++) {
    const squareRows = []
    for (let j = 0; j < 8; j++) {
      const squareShade =
        (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
          ? 'light-square'
          : 'dark-square'
      squareRows.push(renderSquare(i * 8 + j, squareShade, props.boardSize))
    }
    board.push(
      <div className="board-row" key={uuidv4()}>
        {squareRows}
      </div>
    )
  }

  return (
    <div className="game">
      <div className="game-board">
        <div>{board}</div>
      </div>
    </div>
  )
}

export default Board
