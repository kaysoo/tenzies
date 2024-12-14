import React from 'react'

const Die = ({value,isHeld,holdDice,id}) => {
  return (
    <button
    aria-pressed={isHeld}
    aria-label={`Die with value ${value}, ${isHeld ? 'held' : 'not held'}`}
     onClick={()=>holdDice(id)}
      style={{"backgroundColor": isHeld ? '#59e391' : 'white'}}>
        {value}
    </button>
  )
}

export default Die