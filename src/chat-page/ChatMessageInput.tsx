import React, { useState } from 'react'

export const ChatMessageInput = ({
  sendMessageHandler
}: {
  sendMessageHandler: Function
}): JSX.Element => {
  const [input, setInput] = useState<string>('')
  const inputName = 'chatInput'
  const ENTER_KEY = 13

  const handleInput = (e: any): void => {
    e.preventDefault()
    if (e.currentTarget.value === '\n') {
      setInput('')
    } else {
      setInput(e.currentTarget.value)
    }
  }

  const handleKeyboard = (e: any): void => {
    if (e.which === ENTER_KEY) {
      setInput('')
      sendMessageHandler(input)
    }
  }

  return (
    <div className="chat-input--container">
      <label htmlFor={inputName}>
        <p className="visually-hidden">Chat Message Input</p>
        <textarea
          id={inputName}
          name={inputName}
          value={input}
          autoFocus
          placeholder="Type a message"
          onChange={e => handleInput(e)}
          onKeyDown={e => handleKeyboard(e)}
        />
      </label>
    </div>
  )
}
