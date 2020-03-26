import React from 'react'
import '../index.css'

export const Square = ({ shade, onClick, style }) => {
  return (
    <button
      className={'square ' + shade}
      onClick={onClick}
      style={style}
    ></button>
  )
}
