import React from 'react'
import { useHistory } from 'react-router-dom'
import './LandingPage.scss'

export const LandingPage = ({
  displayName,
  setDisplayName
}: {
  displayName: string
  setDisplayName: (name: string) => void
}): JSX.Element => {
  const inputName = 'displayNameInput'

  const handleInputChange = (e: any): void => {
    e.preventDefault()
    setDisplayName(e.currentTarget.value)
  }

  const history = useHistory()

  return (
    <div className="display-name-form">
      <label htmlFor={inputName}>
        Display Name
        <input
          id={inputName}
          name={inputName}
          value={displayName}
          onChange={e => handleInputChange(e)}
        />
      </label>
      <button onClick={() => history.push('/chat')}>Enter Chat Room</button>
    </div>
  )
}
