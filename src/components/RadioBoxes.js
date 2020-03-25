import React from 'react'

const RadioBoxes = ({
  handleInputChange,
  radioBoxChecked,
  text,
  radioText
}) => {
  return (
    <label htmlFor="" style={{ marginTop: '10px' }}>
      {text}&nbsp;
      <label htmlFor="">{radioText[0]}</label>
      <input
        type="radio"
        placeholder="change the color"
        onChange={handleInputChange}
        checked={!radioBoxChecked}
        name={radioText[0]}
      />
      <label htmlFor="">{radioText[1]}</label>
      <input
        type="radio"
        placeholder="change the color"
        checked={radioBoxChecked}
        onChange={handleInputChange}
        name={radioText[1]}
      />
    </label>
  )
}

export default RadioBoxes
