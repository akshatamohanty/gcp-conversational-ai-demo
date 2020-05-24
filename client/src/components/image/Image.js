import React, { useState, useCallback } from 'react'
import './Image.css'

const InputAnswer = ({ answer, onCorrect, onIncorrect, onQuit }) => {
  const [input, setInput] = useState('')
  const onChange = useCallback((event) => {
    const text = event.target.value
    setInput(text)

    // check intent
    if (text === 'quit') {
      onQuit()
    }

    // check answer
    if (answer.indexOf(text) > -1) {
      onCorrect()
    } else {
      onIncorrect()
    }
  },[answer, onCorrect, onQuit, onIncorrect])

  return (
    <input onChange={onChange} />
  )
}

const Image = (props) => {
  const {
    question,
    onCorrect,
    onIncorrect,
    onQuit,
  } = props

  const {
    url,
    answer,
    // attribution,
  } = question

  return (
    <>
      <div
        className='image_wrapper'
        style={{'backgroundImage': `url(${url})`}}
      />
      <InputAnswer
        answer={answer}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
        onQuit={onQuit}
      />
    </>
  )
}

export default Image