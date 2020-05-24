import React from 'react'
import './Score.css'

const Score = ({ name, score }) => {
  return (
    <div>
      <div>{name}'s stars</div>
      <div>{score}</div>
    </div>
  )
}

export default Score