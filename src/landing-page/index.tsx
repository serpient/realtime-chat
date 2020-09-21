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
  const history = useHistory()
  const inputName = 'displayNameInput'

  const handleInputChange = (e: any): void => {
    e.preventDefault()
    setDisplayName(e.currentTarget.value)
  }

  const handleSubmit = (): void => {
    history.push('/chat')
  }

  const chatServiceEndpoint =
    process.env.NODE_ENV === 'production'
      ? 'ws://intense-plateau-11880.herokuapp.com'
      : 'ws://localhost:8080'

  const websocket = new WebSocket(chatServiceEndpoint)

  websocket.onopen = function () {
    console.log('WebSocket Client Connected')
    websocket.send('Hi this is web client.')
  }
  websocket.onmessage = function (e) {
    console.log("Received: '" + e.data + "'")
  }

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
      <button onClick={() => handleSubmit()}>Enter Chat Room</button>
    </div>
  )
}
