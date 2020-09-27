import React from 'react'
import { ChatRoom, ChatMessages, Message } from '../data/types'

export const ChatMessagesPanel = ({
  username,
  chatMessages,
  currentChatRoom
}: {
  username: string
  chatMessages: ChatMessages
  currentChatRoom: ChatRoom
}): JSX.Element => {
  return (
    <div id="chat_messages" className="chat-messages">
      {chatMessages[currentChatRoom.name].map((msg: Message, idx: number) => {
        return (
          <React.Fragment key={`message_bundle_${currentChatRoom.name}_${idx}`}>
            <p
              key={`username_label_${currentChatRoom.name}_${idx}`}
              className={`subtitle ${msg.username === username ? 'message-right' : 'message-left'}`}
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
  )
}
