import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './LandingPage.scss'

export const LandingPage = ({
  setUsername
}: {
  setUsername: (name: string) => void
}): JSX.Element => {
  const [input, setInput] = useState<string>('')
  const history = useHistory()
  const inputName = 'usernameInput'

  const handleSubmit = (): void => {
    setUsername(input)
    history.push('/chat')
  }

  return (
    <div className="display-name-form">
      <label htmlFor={inputName}>
        Display Name
        <input
          id={inputName}
          name={inputName}
          value={input}
          onChange={e => setInput(e.currentTarget.value)}
        />
      </label>
      <button onClick={() => handleSubmit()}>Enter Chat Room</button>
    </div>
  )
}
