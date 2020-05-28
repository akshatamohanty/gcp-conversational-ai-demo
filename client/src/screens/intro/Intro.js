import React, { useCallback, useState } from 'react'
import './Intro.css'

// helpers
import { useSpeech } from '../../Voice'

const Intro = ({ name, onStart, onEnd }) => {
  const [message, setMessage] = useState(null)

  const detectResponse = useCallback((transcript) => {
    if (!transcript) {
      return
    }

    const words = transcript.split(' ').map(w => w.toLowerCase())

    if (words.indexOf('yes') > -1) {
      setMessage(`OK - let's play ${name}!`)
      setTimeout(_ => {
        onStart()
      }, 1500)
    } else if (words.indexOf('no') > -1) {
      setMessage(`See you later ${name}!`)
      setTimeout(_ => {
        onEnd()
      }, 1500)
    }
  }, [setMessage, name, onStart, onEnd])

  useSpeech(detectResponse)

  let content = (
    <>
      <header className="app_header">
      Hello {name}!
      </header>
      <p>Would you like to play a game?</p>
    </>
  )

  if (message) {
    content = <h1>{message}</h1>
  }

  return content
}

export default Intro