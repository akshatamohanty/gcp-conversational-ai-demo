import React, { useCallback, useState } from 'react'
import './Intro.css'

// helpers
import { useSpeech, speak } from '../../Voice'

const Intro = ({ name, onStart, onEnd }) => {
  const [start, setStart] = useState(false)
  const [message, setMessage] = useState(null)

  const handleOnStart = useCallback(() => {
    const greeting = `Hello ${name}! Would you like to play a game?`
    speak(greeting)
    setStart(true)
  }, [name])

  const detectResponse = useCallback((transcript) => {
    if (!transcript) {
      return
    }

    const words = transcript.split(' ').map(w => w.toLowerCase())

    if (words.indexOf('yes') > -1) {
      const utter = `OK - let's play ${name}!`
      setMessage(utter)
      speak(utter)
      setTimeout(_ => {
        onStart()
      }, 1500)
    } else if (words.indexOf('no') > -1) {
      const utter = `See you later ${name}!`
      speak(utter)
      setMessage(utter)
      setTimeout(_ => {
        onEnd()
      }, 1500)
    }
  }, [setMessage, name, onStart, onEnd])

  useSpeech(detectResponse)

  let content = start ? (
    <>
      <header className="app_header">
      Hello {name}!
      </header>
      <p>Would you like to play a game?</p>
    </>
  ) : <button onClick={handleOnStart}>Start</button>

  if (message) {
    content = <h1>{message}</h1>
  }

  return content
}

export default Intro