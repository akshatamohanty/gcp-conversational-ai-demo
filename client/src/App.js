import React, { useState } from 'react'
import './App.css'

// components & screens
import Intro from './screens/intro/Intro'
import Game from './screens/game/Game'
import End from './screens/end/End'

// constants
const STAGE = Object.freeze({
  START: 'start',
  INTRO: 'intro',
  PLAYING: 'playing',
  END: 'end',
})

const name = 'Kay'

function App() {
  const [stage, setStage] = useState(STAGE.INTRO)

  let content
  if (stage === STAGE.START) {
    content = (
      <>
        <h1>Welcome to our game!</h1>
        <button onClick={_ => setStage(STAGE.INTRO)}>Enter</button>
      </>
    )
  }

  if (stage === STAGE.INTRO) {
    content = <Intro
      name={name}
      onStart={_ => setStage(STAGE.PLAYING)}
      onEnd={_ => setStage(STAGE.END)}
    />
  }

  if (stage === STAGE.PLAYING) {
    content = <Game name={name} onEnd={_ => setStage(STAGE.END)} />
  }

  if (stage === STAGE.END) {
    content = <End />
  }

  return (
    <div className='app'>{content}</div>
  )
}

export default App
