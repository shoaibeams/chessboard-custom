import React from 'react'

const GameInput = ({ handleInputChange }) => {
  return (
    <input
      type="text"
      placeholder="Resize the board"
      onChange={handleInputChange}
    />
  )
}

export default GameInput
