import React, { useState } from 'react'
import { ChatRoom, ChatMessages, UsersPerRoom } from '../data/types'
import './ChatPage.scss'

export const ChatPage = ({
  username,
  sendMessageHandler,
  chatMessages,
  chatRooms,
  setCurrentChatRoom,
  currentChatRoom,
  presenceInfo
}: {
  username: string
  sendMessageHandler: Function
  chatMessages: ChatMessages
  chatRooms: ChatRoom[]
  setCurrentChatRoom: Function
  currentChatRoom?: ChatRoom
  presenceInfo: UsersPerRoom
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
            className={`chat-room ${
              currentChatRoom && currentChatRoom.name === room.name ? 'chat-room--active' : ''
            } `}
            onClick={() => setCurrentChatRoom(room)}
            key={room.name}
          >
            {room.label}
            <div className="active-users">
              {presenceInfo[room.name] &&
                presenceInfo[room.name].map(activeUser => {
                  if (activeUser.username !== username) {
                    return (
                      <div key={`active_user_${activeUser.username}`} className="active-user">
                        <img src={activeUser.avatar} alt={activeUser.username} />
                        <h5>{activeUser.username}</h5>
                      </div>
                    )
                  }
                })}
            </div>
          </nav>
        ))}
      </aside>
      <section className="chat-messages--container">
        {currentChatRoom ? (
          <React.Fragment>
            <div id="chat_messages" className="chat-messages">
              {chatMessages[currentChatRoom.name].map((msg, idx) => {
                return (
                  <React.Fragment key={`message_bundle_${currentChatRoom.name}_${idx}`}>
                    <p
                      key={`username_label_${currentChatRoom.name}_${idx}`}
                      className={`subtitle ${
                        msg.username === username ? 'message-right' : 'message-left'
                      }`}
                    >
                      {msg.username}
                    </p>
                    <div
                      key={`message_${currentChatRoom.name}_${idx}`}
                      className={`chat-messages--message ${
                        msg.username === username
                          ? 'chat-messages--user message-right'
                          : 'chat-messages--other message-left'
                      }`}
                    >
                      <p>{msg.message}</p>
                    </div>
                  </React.Fragment>
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
          </React.Fragment>
        ) : (
          <h1 className="helper-message">Click a chat room to start chatting</h1>
        )}
      </section>
    </main>
  )
}
