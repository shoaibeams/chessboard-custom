import CircularPiece from '../pieces/CircularPiece'

export const initializeChessBoard = (color = 'black', shape = 'sphere') => {
  if (color === '') {
    color = 'black'
  }
  
  let topSideColor

  const squares = Array(64).fill(null)

  if (color === 'red') {
    topSideColor = 'black'
  } else {
    topSideColor = 'red'
  }

  for (let i = 8; i < 24; i++) {
    squares[i + 40] = new CircularPiece(1, color, shape)
  }

  for (let i = 0; i < 16; i++) {
    squares[i] = new CircularPiece(2, topSideColor, shape)
  }

  return squares
}
