import React from 'react'
import '../index.css'
import Board from './Board'
import { initializeChessBoard } from '../helpers/board-initializer'
import RadioBoxes from './RadioBoxes'
import GameInfo from './GameInfo'
import GameControls from './GameControls'
import GameInput from './GameInput'
import bottomSide from '../pieces/CircularPiece'

export default class Game extends React.Component {
  state = {
    squares: initializeChessBoard(),
    player: 1,
    sourceSelection: -1,
    status: '',
    turn: 'white',
    pieceColor: '',
    radioBoxColorChecked: false,
    radioBoxShapeChecked: false,
    boardSize: 48,
    originalSquares: [],
    resetTriggered: false,
    saveTriggered: false
  }

  componentDidMount() {
    this.setState({ originalSquares: this.state.squares })

    const squares = JSON.parse(localStorage.getItem('squares'))
    const sourceSelection = parseInt(localStorage.getItem('sourceSelection'))
    const turn = localStorage.getItem('turn')
    const player = parseInt(localStorage.getItem('player'))

    if (squares) {
      this.setState({ squares, sourceSelection, turn, player })
    }
  }

  saveHandler = () => {
    localStorage.clear()
    this.setState({ saveTriggered: true })

    if (this.state.resetTriggered) {
      localStorage.setItem(
        'squares',
        JSON.stringify(this.state.originalSquares)
      )
    } else {
      localStorage.setItem('squares', JSON.stringify(this.state.squares))
    }

    localStorage.setItem('sourceSelection', this.state.sourceSelection)
    localStorage.setItem('turn', this.state.turn)
    localStorage.setItem('player', this.state.player)
  }

  handleClick(i) {
    let squares
    squares = this.state.squares.slice()
    squares[i].__proto__ = new bottomSide()

    if (this.state.resetTriggered) {
      squares = this.state.originalSquares.slice()
    }

    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        debugger

        this.setState({
          status:
            'Wrong selection. Choose player ' + this.state.player + ' pieces.'
        })

        if (squares[i]) {
          squares[i].style = {
            ...squares[i].style,
            backgroundColor: ''
          }
        }
      } else {
        squares[i].style = {
          ...squares[i].style,
          backgroundColor: 'RGB(100, 121, 148)'
        }
        this.setState({
          status: 'Choose destination for the selected piece',
          sourceSelection: i
        })
      }
    } else if (this.state.sourceSelection > -1) {
      squares[this.state.sourceSelection].style = {
        ...squares[this.state.sourceSelection].style,
        backgroundColor: ''
      }
      if (squares[i] && squares[i].player === this.state.player) {
        this.setState({
          status: 'Wrong selection. Choose valid source and destination again.',
          sourceSelection: -1
        })
      } else {
        const isDestEnemyOccupied = squares[i] ? true : false
        const isMovePossible = squares[
          this.state.sourceSelection
        ].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied)
        const srcToDestPath = squares[
          this.state.sourceSelection
        ].getSrcToDestPath(this.state.sourceSelection, i)
        debugger
        const isMoveLegal = this.isMoveLegal(srcToDestPath)

        if (isMovePossible && isMoveLegal) {
          squares[i] = squares[this.state.sourceSelection]
          squares[this.state.sourceSelection] = null

          let player = this.state.player === 1 ? 2 : 1
          let turn = this.state.turn === 'white' ? 'black' : 'white'

          console.log('check', squares === this.state.originalSquares)

          this.setState({
            sourceSelection: -1,
            squares,
            player,
            status: '',
            turn,
            resetTriggered: false
          })
        } else {
          this.setState({
            status:
              'Wrong selection. Choose valid source and destination again.',
            sourceSelection: -1
          })
        }
      }
    }
  }

  isMoveLegal(srcToDestPath) {
    let isLegal = true
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (this.state.squares[srcToDestPath[i]] !== null) {
        isLegal = false
      }
    }
    return isLegal
  }

  handleColorChange = event => {
    this.setState({
      radioBoxColorChecked: !this.state.radioBoxColorChecked,
      squares: initializeChessBoard(event.target.name),
      pieceColor: event.target.name
    })
  }

  handleShapeChange = event => {
    this.setState({
      radioBoxShapeChecked: !this.state.radioBoxShapeChecked,
      squares: initializeChessBoard(this.state.pieceColor, event.target.name)
    })
  }

  handleInputChange = event => {
    this.setState({ boardSize: event.target.value })
  }

  resetHandler = () => {
    this.setState({
      resetTriggered: true,
      turn: 'white',
      player: 1,
      sourceSelection: -1,
      status: ''
    })
  }

  render() {
    const {
      turn,
      status,
      saveTriggered,
      resetTriggered,
      originalSquares,
      squares,
      boardSize,
      radioBoxColorChecked,
      radioBoxShapeChecked
    } = this.state

    return (
      <div className="container">
        <p>Checker Board</p>
        <GameInput handleInputChange={this.handleInputChange} />
        <GameInfo turn={turn} status={status} text="Turn" />
        <GameControls
          saveHandler={this.saveHandler}
          resetHandler={this.resetHandler}
          saveTriggered={saveTriggered}
        />
        <Board
          squares={resetTriggered ? originalSquares : squares}
          onClick={i => this.handleClick(i)}
          boardSize={boardSize}
        />

        <RadioBoxes
          handleInputChange={this.handleColorChange}
          radioBoxChecked={radioBoxColorChecked}
          text={'Change the color of the pieces:'}
          radioText={['black', 'red']}
        />
        <RadioBoxes
          handleInputChange={this.handleShapeChange}
          radioBoxChecked={radioBoxShapeChecked}
          text={'Change the shape of the pieces:'}
          radioText={['sphere', 'cube']}
        />
      </div>
    )
  }
}
