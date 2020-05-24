import React from 'react'
import './End.css'

const End = ({ name }) => {
  return (
    <div className="app">
      <header className="app_header">
        Bye {name}!
      </header>
      <p>Thanks for playing!</p>
    </div>
  )
}

export default End