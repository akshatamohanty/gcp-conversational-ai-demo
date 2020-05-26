import React, { useEffect, useCallback } from 'react'
import './Intro.css'

//
import SpeechSingleton from '../../Voice'

const Intro = ({ name, onStart, onEnd }) => {
  const detectResponse = useCallback((transcript) => {
    if (transcript === 'yes') {
      onStart()
    }

    if (transcript === 'no') {
      onEnd()
    }
  }, [onStart, onEnd])

  useEffect(() => {
    const speech = new SpeechSingleton()
    if (speech) {
      speech.onSpeech(detectResponse)
    } else {
      console.log('Web Speech Api not available')
    }
  }, [detectResponse])

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