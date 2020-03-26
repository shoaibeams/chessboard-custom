import React from 'react'

const GameControls = ({ saveHandler, resetHandler, saveTriggered }) => {
  return (
    <div style={{ transform: 'translateY(-15px)' }}>
      <button onClick={saveHandler} style={{ marginRight: '15px' }}>
        Save
      </button>
      <button onClick={resetHandler}>Reset</button>
      {saveTriggered && (
        <div
          style={{
            color: 'green',
            marginTop: '2px',
            transform: 'translateX(-2px)'
          }}
        >
          Saved successfully
        </div>
      )}
    </div>
  )
}

export default GameControls
