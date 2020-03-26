import React from 'react'

const GameInfo = ({ turn, status, text }) => {
  return (
    <div className="game-info">
      <h3>{text}</h3>
      <div id="player-turn-box" style={{ backgroundColor: turn }}></div>
      <div className="game-status">{status}</div>
    </div>
  )
}

export default GameInfo
