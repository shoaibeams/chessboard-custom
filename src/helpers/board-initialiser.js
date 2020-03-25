import bottomSide from '../pieces/bottomSide'

export const initialiseChessBoard = (color = 'black', shape = 'sphere') => {
  if (color === '') {
    color = 'black'
  }

  console.log('color', color)

  let topSideColor, topSideShape

  const squares = Array(64).fill(null)

  if (color === 'red') {
    topSideColor = 'black'
  } else {
    topSideColor = 'red'
  }

  console.log('shape', shape)

  for (let i = 8; i < 24; i++) {
    squares[i + 40] = new bottomSide(1, color, shape)
  }

  for (let i = 0; i < 16; i++) {
    squares[i] = new bottomSide(2, topSideColor, shape)
  }

  return squares
}
