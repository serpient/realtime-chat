import React, { useState } from 'react'
import { Messages, ChatRoom } from '../App'
import './ChatPage.scss'

export const ChatPage = ({
  username,
  sendMessageHandler,
  chatMessages,
  chatRooms
}: {
  username: string
  sendMessageHandler: Function
  chatMessages: Messages[]
  chatRooms: ChatRoom[]
}): JSX.Element => {
  const [currentRoom, setCurrentRoom] = useState<string>()
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
    <main className="chat-page--container">
      <aside>
        <span>
          <img
            src={`https://api.adorable.io/avatars/${50}/${username}`}
            alt={`${username}'s avatar`}
          />
          <h1>Hi {username}!</h1>
        </span>
        {chatRooms.map(room => (
          <nav
            className={`chat-room ${currentRoom === room.name ? 'chat-room--active' : ''} `}
            onClick={() => setCurrentRoom(room.name)}
            key={room.name}
          >
            {room.label}
          </nav>
        ))}
      </aside>
      <section>
        <div id={`chat_messages`} className="chat-messages">
          {chatMessages.map((msg, idx) => {
            return (
              <div
                className={`chat-messages--message ${
                  msg.username === username
                    ? 'chat-messages--mesage-right'
                    : 'chat-messages--mesage-left'
                }`}
                key={`${msg}_${idx}`}
              >
                <p>{msg.message}</p>
              </div>
            )
          })}
        </div>
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
      </section>
    </main>
  )
}
