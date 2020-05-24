import React, { useState, useEffect, useCallback } from 'react'
import './Game.css'

// components
import Score from '../../components/score/Score'
import Image from '../../components/image/Image'

const getQuestions = () => {
  return [
    {
      url: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      answer: ['apple', 'fruit'],
      attribution: 'Photo by mali maeder from Pexels'
    },
    {
      url: 'https://images.pexels.com/photos/39571/gorilla-silverback-animal-silvery-grey-39571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      answer: ['monkey', 'gorilla', 'animal'],
      attribution: 'Photo by Pixabay'
    },
    {
      url: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      answer: ['avocado', 'fruit'],
      attribution: 'Photo by Foodie Factor from Pexels'
    },
  ]
}

const Game = ({ name, onEnd, onQuit }) => {
  const [questions, setQuestions] = useState()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const questions = getQuestions()
    setQuestions(questions)

    return () => {
      //
    }
  }, [])

  useEffect(() => {
    if (index === questions?.length) {
      onEnd()
    }
  }, [index, onEnd, questions])

  const onCorrectAnswer = useCallback(() => {
    setScore(score + 1)
    setIndex(index + 1)
  }, [index, score])

  const onIncorrectAnswer = useCallback(() => {
    // provide encouragement
  }, [])

  if (!questions || !questions[index]) {
    return null
  }

  return (
    <div className="app">
      <header className="app_header">
        Let's play {name}!
      </header>
      <p>What's this object?</p>
      <Image
        question={questions[index]}
        onCorrect={onCorrectAnswer}
        onIncorrect={onIncorrectAnswer}
        onEnd={onEnd}
        onQuit={onEnd}
      />
      <br />
      <hr />
      <br />
      <Score name={name} score={score} />
    </div>
  )
}

export default Game