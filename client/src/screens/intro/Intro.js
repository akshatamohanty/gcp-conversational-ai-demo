import React, { useCallback } from 'react'
import './Intro.css'

// helpers
import { useSpeech } from '../../Voice'

const Intro = ({ name, onStart, onEnd }) => {
  const detectResponse = useCallback((transcript) => {
    if (transcript === 'yes') {
      onStart()
    }

    if (transcript === 'no') {
      onEnd()
    }
  }, [onStart, onEnd])

  useSpeech(detectResponse)

  return (
    <div className="app">
      <header className="app_header">
        Hello {name}!
      </header>
      <p>Would you like to play a game?</p>
    </div>
  )
}

export default Intro