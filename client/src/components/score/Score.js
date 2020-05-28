import React from 'react'
import './Score.css'

const Score = ({ name, score, highlight }) => {
  const styles = { fontSize: '24px' }

  if (highlight) {
    styles.color = 'pink'
    styles.fontWeight = 'bold'
  }

  return (
    <div className='app-header'>
      <b>{name}'s stars</b>:
      <span style={styles}>
        {(Array.from(Array(score))).map(_ => '✰')}
      </span>
    </div>
  )
}

export default Score