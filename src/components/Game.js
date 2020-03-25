import React from 'react'
import '../index.css'
import Board from './Board'
import { initialiseChessBoard } from '../helpers/board-initialiser'
import RadioBoxes from './RadioBoxes'

export default class Game extends React.Component {
  state = {
    squares: initialiseChessBoard(),
    whiteFallenSoldiers: [],
    blackFallenSoldiers: [],
    player: 1,
    sourceSelection: -1,
    status: '',
    turn: 'white',
    pieceColor: '',
    radioBoxColorChecked: false,
    radioBoxShapeChecked: false,
    boardSize: 48
  }

  handleClick(i) {
    const squares = this.state.squares.slice()

    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({
          status:
            'Wrong selection. Choose player ' + this.state.player + ' pieces.'
        })

        if (squares[i]) {
          delete squares[i].style.backgroundColor
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
      //   delete squares[this.state.sourceSelection].style.backgroundColor
      if (squares[i] && squares[i].player === this.state.player) {
        this.setState({
          status: 'Wrong selection. Choose valid source and destination again.',
          sourceSelection: -1
        })
      } else {
        const squares = this.state.squares.slice()
        const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice()
        const blackFallenSoldiers = this.state.blackFallenSoldiers.slice()
        const isDestEnemyOccupied = squares[i] ? true : false
        const isMovePossible = squares[
          this.state.sourceSelection
        ].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied)
        const srcToDestPath = squares[
          this.state.sourceSelection
        ].getSrcToDestPath(this.state.sourceSelection, i)
        const isMoveLegal = this.isMoveLegal(srcToDestPath)

        if (isMovePossible && isMoveLegal) {
          if (squares[i] !== null) {
            if (squares[i].player === 1) {
              whiteFallenSoldiers.push(squares[i])
            } else {
              blackFallenSoldiers.push(squares[i])
            }
          }
          console.log('whiteFallenSoldiers', whiteFallenSoldiers)
          console.log('blackFallenSoldiers', blackFallenSoldiers)
          squares[i] = squares[this.state.sourceSelection]
          squares[this.state.sourceSelection] = null
          let player = this.state.player === 1 ? 2 : 1
          let turn = this.state.turn === 'white' ? 'black' : 'white'
          this.setState({
            sourceSelection: -1,
            squares: squares,
            whiteFallenSoldiers: whiteFallenSoldiers,
            blackFallenSoldiers: blackFallenSoldiers,
            player: player,
            status: '',
            turn: turn
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
    debugger
    this.setState({
      radioBoxColorChecked: !this.state.radioBoxColorChecked,
      squares: initialiseChessBoard(event.target.name),
      pieceColor: event.target.name
    })
  }

  handleShapeChange = event => {
    this.setState({
      radioBoxShapeChecked: !this.state.radioBoxShapeChecked,
      squares: initialiseChessBoard(this.state.pieceColor, event.target.name)
    })
  }

  handleInputChange = event => {
    this.setState({ boardSize: event.target.value })
    // const size = event.target.value

    // this.state.squares[i].style.width = event.target.value
    // this.state.squares[i].style.height = event.target.value
    // this.setState((squares[i].style.width: size))

    // this.setState({ squares: size })
  }

  render() {
    return (
      <div className="container">
        <p>Checker Board</p>

        <input
          type="text"
          placeholder="Resize the board"
          style={{ marginBottom: '20px' }}
          onChange={this.handleInputChange}
        />

        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={i => this.handleClick(i)}
              boardSize={this.state.boardSize}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div
              id="player-turn-box"
              style={{ backgroundColor: this.state.turn }}
            ></div>
            <div className="game-status">{this.state.status}</div>
          </div>
        </div>
        <RadioBoxes
          handleInputChange={this.handleColorChange}
          radioBoxChecked={this.state.radioBoxColorChecked}
          text={'Change the color of the pieces:'}
          radioText={['black', 'red']}
        />
        <RadioBoxes
          handleInputChange={this.handleShapeChange}
          radioBoxChecked={this.state.radioBoxShapeChecked}
          text={'Change the shape of the pieces:'}
          radioText={['sphere', 'cube']}
        />
      </div>
    )
  }
}
