import React, { useState } from 'react'

export const ChatMessageInput = ({
  sendMessageHandler
}: {
  sendMessageHandler: Function
}): JSX.Element => {
  const [input, setInput] = useState<string>('')
  const inputName = 'chatInput'

  const handleInput = (e: any): void => {
    e.preventDefault()
    setInput(e.currentTarget.value)
  }

  const handleKeyboard = (e: any): void => {
    const ENTER_KEY = 13

    if (e.which === ENTER_KEY) {
      sendMessageHandler(input)
      setInput('')
    }
  }

  return (
    <div className="chat-input--container">
      <label htmlFor={inputName}>
        <p className="visually-hidden">Chat Message Input</p>
        <input
          id={inputName}
          name={inputName}
          value={input}
          placeholder="Type a message"
          onChange={e => handleInput(e)}
          onKeyDown={e => handleKeyboard(e)}
        />
      </label>
    </div>
  )
}
