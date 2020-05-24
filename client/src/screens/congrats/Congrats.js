import React from 'react'
import './Congrats.css'

// components
import Score from '../../components/score/Score'

const Congrats = ({ name, score, onQuit, onStart }) => {
  return (
    <div className="app">
      <header className="app_header">
        Yay, {name} got {score} stars!
      </header>
      <br />
      Play another game?
      <button onStart={onStart}>yes</button>
      <button onQuit={onQuit}>no</button>
    </div>
  )
}

export default Congrats