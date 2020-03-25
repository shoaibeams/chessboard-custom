import React from 'react'
import { Square } from './Square'
import '../index.css'
import { isEven } from '../helpers/utils'
import bottomSide from '../pieces/bottomSide'

const Board = props => {
  const renderSquare = (i, squareShade, boardSize) => {
    console.log('object', i, props.squares[i])

    if (props.squares[i]) {
      props.squares[i].style = {
        ...props.squares[i].style,
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

      // if (squareRows[i]) {
      //   console.log('squareRows', squareRows[i].props)
      //   squareRows[i].props.style = {
      //     ...squareRows[i].props.style,
      //     width: `20px`,
      //     height: `20px`
      //   }
      // }
      squareRows.push(renderSquare(i * 8 + j, squareShade, props.boardSize))
    }
    board.push(<div className="board-row">{squareRows}</div>)
  }

  return <div>{board}</div>
}

export default Board
