import React, { useState } from 'react'
import { ChatRoom, ChatMessages, UsersPerRoom } from '../data/types'
import { ChatMessagesPanel } from './ChatMessagesPanel'
import { ChatMessageInput } from './ChatMessageInput'
import { ChatRoomSelector } from './ChatRoomSelector'
import './ChatPage.scss'

export const ChatPage = ({
  username,
  sendMessageHandler,
  chatMessages,
  chatRooms,
  setCurrentChatRoom,
  currentChatRoom,
  presenceInfo,
  avatar
}: {
  username: string
  avatar: string
  sendMessageHandler: Function
  chatMessages: ChatMessages
  chatRooms: ChatRoom[]
  setCurrentChatRoom: Function
  currentChatRoom?: ChatRoom
  presenceInfo: UsersPerRoom
}): JSX.Element => {
  const [menuIsExpanded, setMenuVisibility] = useState(true)
  return (
    <section className="chat-page--container">
      <header className="header">
        <button
          tabIndex={0}
          onClick={() => setMenuVisibility(!menuIsExpanded)}
          className="mobile-menu"
        >
          <p className="visually-hidden">Expand menu</p>
          <i className="fas fa-ellipsis-h"></i>
        </button>
        <h2 className="logo">commune</h2>
      </header>
      <ChatRoomSelector
        style={menuIsExpanded ? { display: 'block' } : { display: 'none' }}
        username={username}
        avatar={avatar}
        chatRooms={chatRooms}
        currentChatRoom={currentChatRoom}
        setCurrentChatRoom={setCurrentChatRoom}
        presenceInfo={presenceInfo}
      />
      <section className="chat-messages--container">
        {currentChatRoom ? (
          <React.Fragment>
            <ChatMessagesPanel
              username={username}
              chatMessages={chatMessages}
              currentChatRoom={currentChatRoom}
            />
            <ChatMessageInput sendMessageHandler={sendMessageHandler} />
          </React.Fragment>
        ) : (
          <h1 className="helper-message">Click a chat room to start chatting</h1>
        )}
      </section>
    </section>
  )
}
