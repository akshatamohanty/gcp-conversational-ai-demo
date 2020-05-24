import React, { useState, useEffect } from 'react'
import './App.css'

// components & screens
import Intro from './screens/intro/Intro'
import Game from './screens/game/Game'
import End from './screens/end/End'

// constants
const STAGE = Object.freeze({
  INTRO: 'intro',
  PLAYING: 'playing',
  END: 'end',
})

const name = 'Katelyn'

function App() {
  const [stage, setStage] = useState(STAGE.INTRO)

  if (stage === STAGE.INTRO) {
    return <Intro
      name={name}
      onStart={_ => setStage(STAGE.PLAYING)}
      onEnd={_ => setStage(STAGE.END)}
    />
  }

  if (stage === STAGE.PLAYING) {
    return <Game name={name} onEnd={_ => setStage(STAGE.END)}
    />
  }

  if (stage === STAGE.END) {
    return <End />
  }

  return null
}

export default App
