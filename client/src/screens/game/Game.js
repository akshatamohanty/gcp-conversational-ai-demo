import React, { useState, useEffect, useCallback } from 'react'
import './Game.css'

// components
import Score from '../../components/score/Score'
import Image from '../../components/image/Image'

// helpers
import { useSpeech, speak } from '../../Voice'

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

const hasAnswer = (words, answers) => {
  const hash = []
  for (const answer of answers) {
    hash[answer.toLowerCase()] = 1
  }

  for (const word of words) {
    if (hash[word.toLowerCase()] !== undefined) {
      return true
    }
  }

  return false
}

const Game = ({ name, onEnd, onQuit }) => {
  const [questions, setQuestions] = useState()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState(null)

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
    setMessage(`Yes - Well done!`)
    speak(`Yes! Well done! `)
    setScore(score + 1)

    setTimeout(_ => {
      setMessage(null)
      setIndex(index + 1)
    }, 1500)
  }, [index, score])

  const onIncorrectAnswer = useCallback((transcript) => {
    setMessage(`No, it's not ${transcript}! \n\n Try again!`)
    speak(`No, it's not. Try again!`)
    setTimeout(_ => setMessage(null), 1500)
  }, [])

  const onSpeech = useCallback((transcript) => {
    const words = transcript.split(' ')
    const answers = questions[index].answer

    const isCorrect = hasAnswer(words, answers)
    if (isCorrect) {
      onCorrectAnswer()
    } else {
      onIncorrectAnswer(transcript)
    }
  }, [index, onCorrectAnswer, onIncorrectAnswer, questions])

  useSpeech(onSpeech)

  useEffect(() => {
    if (questions && questions[index]) {
      speak(`What is this?`)
    }
  }, [index, name, questions])

  if (!questions || !questions[index]) {
    return null
  }

  const questionContent = (
    <>
      <header className="app_header">
        <p>What's this, {name}?</p>
      </header>
      <Image
        question={questions[index]}
        onCorrect={onCorrectAnswer}
        onIncorrect={onIncorrectAnswer}
        onEnd={onEnd}
        onQuit={onEnd}
      />
      <br />
    </>
  )

  return (
    <>
      <Score name={name} score={score} highlight={!!message} />
      <hr />
      <br /><br />
      { message ? <h1>{message}</h1> : questionContent }
      <hr />
      <br />
    </>
  )
}

export default Game