import React from 'react'
import './Intro.css'

const Intro = ({ name, onStart, onEnd }) => {
  return (
    <div className="app">
      <header className="app_header">
        Hello {name}!
      </header>
      <p>Would you like to play a game?</p>
      <button onClick={onStart}>Yes</button>
      <button onClick={onEnd}>No</button>
    </div>
  )
}

export default Intro