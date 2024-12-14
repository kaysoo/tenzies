import { useEffect, useRef, useState } from "react";
import Die from "./components/Die"
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

function App() {
  const [dice,setDice]= useState(() => generateAllNewDice())
  const rollDiceRef = useRef(null)

  const { width, height } = useWindowSize()

  const gameWon = dice.every(die => die.isHeld) && 
  dice.every(die => die.value===dice[0].value)
  
  function generateAllNewDice(){
    return new Array(10).fill(0).map(()=>(
      {
        value : Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    ))
  }

  useEffect(()=>{
    gameWon ? 
    rollDiceRef.current.focus() : null
  },[gameWon])

  function RollDice(){
    if(!gameWon){
      setDice(prev => prev.map(
        die=> die.isHeld ? die : {...die,value : Math.ceil(Math.random() * 6)}))  
    }else{
      setDice(generateAllNewDice())
    }
   }

  function holdDice(id){
    setDice(prev => 
       prev.map((die)=>
         die.id === id ? {...die, isHeld: !die.isHeld} : {...die}
      )
    )
    
  }

  return (
    <main >
      {gameWon ?<Confetti width={width} height={height}  /> : null}
      <div aria-live="polite">
        {gameWon && <p className="sr-only">Congratulations you won! Press "New game" to continue</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {
          dice.map((i)=>(
            <Die key={i.id}
            id={i.id}
             value={i.value}
             isHeld={i.isHeld}
             holdDice={holdDice}
               />
          ))
        }
        
      </div>
      <button ref={rollDiceRef} className="roll-dice" onClick={ RollDice}>
        {gameWon ? 'New Game' : "Roll"}
        </button>
    </main>
  )
}

export default App
