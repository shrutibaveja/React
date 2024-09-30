import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

function driveActivePlayer(gameTurns){
    let currentPlayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }

    return currentPlayer;
}

function driveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map((innerArray)=>[...innerArray])];

  for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function driveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() { 

  const [gameTurns, setGameTurns] = useState([]);

  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = driveActivePlayer(gameTurns);

  const gameBoard = driveGameBoard(gameTurns);
  
  const winner = driveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
   
    setGameTurns((prevTurns) => {
      const currentPlayer = driveActivePlayer(prevTurns)

      const updatedTurns = [
        {
          square: {row: rowIndex, col: colIndex},
          player: currentPlayer
        },
        ...prevTurns
      ]

      return updatedTurns;
    })

  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers( (prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} restart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  )
}

export default App
