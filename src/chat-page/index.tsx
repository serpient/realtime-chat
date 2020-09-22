import React, { useState } from 'react'
import './ChatPage.scss'

const chatRooms = [
  {
    label: 'Water Tribe',
    name: 'waterTribe'
  },
  {
    label: 'Earth Kingdom',
    name: 'earthKingdom'
  },
  {
    label: 'Fire Nation',
    name: 'fireNation'
  },
  {
    label: 'Air Nation',
    name: 'airNation'
  }
]

export const ChatPage = ({ username }: { username: string }): JSX.Element => {
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
      // send messages through to socket
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
        <div className="chat-messages"></div>
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