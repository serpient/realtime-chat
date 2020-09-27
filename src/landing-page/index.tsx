import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './LandingPage.scss'

export const LandingPage = ({
  setUsername
}: {
  setUsername: (name: string) => void
}): JSX.Element => {
  const [input, setInput] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')
  const history = useHistory()
  const inputName = 'usernameInput'

  const handleSubmit = (): void => {
    if (input === '') {
      setValidationError('Your display name is required')
    } else {
      setUsername(input)
      history.push('/chat')
    }
  }

  const handleKeyPress = (e: any): void => {
    const ENTER_KEY = 13

    if (e.which === ENTER_KEY) {
      if (input === '') {
        setValidationError('Your display name is required')
      } else {
        handleSubmit()
      }
    }
  }

  return (
    <section className="landing-page--container">
      <h1 className="logo">join commune</h1>
      <div className="display-name-form">
        <label htmlFor={inputName}>
          Set Your Display Name
          <input
            id={inputName}
            name={inputName}
            value={input}
            onChange={e => {
              setInput(e.currentTarget.value)
              setValidationError('')
            }}
            onKeyDown={e => handleKeyPress(e)}
          />
        </label>
        {validationError && <p className="input-error">{validationError}</p>}
        <button onClick={() => handleSubmit()}>Enter Chat Room</button>
      </div>
    </section>
  )
}
