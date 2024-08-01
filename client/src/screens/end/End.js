import React, { useEffect } from 'react'
import './End.css'

import { speak } from '../../Voice'

const End = ({ name }) => {
  useEffect(() => {
    speak('Bye!')
  }, [])

  return (
    <>
      <h1>Bye {name}!</h1>
      <p>Thanks for playing!</p>
    </>
  )
}

export default End