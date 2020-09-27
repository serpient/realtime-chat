import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { LandingPage } from './landing-page'
import { ChatPage } from './chat-page'
import { createAppConfig } from './utilities/createAppConfig'
import { getRequest } from './utilities/getRequest'
import { ChatClient } from './utilities/chatClient'
import { ChatRoom, ChatMessages, UsersPerRoom } from './data/types'
import './App.scss'
import { events } from './data/eventNames'

const App = () => {
  const [username, setUsername] = useState<string>(localStorage.getItem('chat-username') || '')
  const [avatar] = useState(`https://api.adorable.io/avatars/${50}/${username}`)
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessages>({})
  const [presenceInfo, setPresenceInfo] = useState<UsersPerRoom>({})
  const [currentChatRoom, setCurrentChatRoom] = useState<ChatRoom>()
  const [error, setError] = useState<{ status: string; message: string }>()
  const [chatClient, setChatClient] = useState<ChatClient>()

  useEffect(() => {
    localStorage.setItem('chat-username', username)
  }, [username])

  useEffect(() => {
    async function setAppConfig() {
      try {
        const { websocketEndpoint, serverEndpoint } = createAppConfig()
        const chatRoomResponse: { data: { chatRooms: ChatRoom[] } } = await getRequest(
          `${serverEndpoint}/rooms`
        )
        setChatRooms(chatRoomResponse.data.chatRooms)
        const defaultChatMessages: ChatMessages = {}
        chatRoomResponse.data.chatRooms.forEach(room => {
          defaultChatMessages[room.name] = []
        })
        setChatMessages(defaultChatMessages)
        const client = new ChatClient({
          chatServiceEndpoint: websocketEndpoint,
          clientName: username,
          chatRooms: chatRoomResponse.data.chatRooms,
          setChatMessages,
          setPresenceInfo
        })
        setChatClient(client)
      } catch (err) {
        setError({ status: err.status, message: err.message })
      }
    }
    setAppConfig()
    // eslint-disable-next-line
  }, [])

  const sendMessageHandler = (message: string): void => {
    if (chatClient && currentChatRoom) {
      chatClient.sendMessageToServer({
        message,
        username,
        chatRoom: currentChatRoom,
        uuid: uuid()
      })
    }
    // TODO else handle error
  }

  const handleChangingChatRoom = (chatRoom: ChatRoom): void => {
    setCurrentChatRoom(chatRoom)
    if (chatClient) {
      chatClient.sendMessageToServer(
        {
          username,
          avatar,
          currentRoom: chatRoom
        },
        events.NEW_PRESENCE_INFORMATION
      )
    }
  }

  const handleSettingUsername = (username: string): void => {
    setUsername(username)
  }

  return (
    <BrowserRouter>
      <div className="App">
        {error && <div className="error-banner">{error.message || 'An error occured'}</div>}
        <Switch>
          <Route exact path="/chat">
            <ChatPage
              chatMessages={chatMessages}
              sendMessageHandler={sendMessageHandler}
              username={username}
              chatRooms={chatRooms}
              setCurrentChatRoom={handleChangingChatRoom}
              currentChatRoom={currentChatRoom}
              presenceInfo={presenceInfo}
            />
          </Route>
          <Route path="/">
            <LandingPage setUsername={handleSettingUsername} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
