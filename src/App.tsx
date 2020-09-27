import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { LandingPage } from './landing-page'
import { ChatPage } from './chat-page'
import { ErrorBanner } from './error-banner'
import { createAppConfig } from './utilities/createAppConfig'
import { getRequest } from './utilities/getRequest'
import { ChatClient } from './utilities/chatClient'
import { ChatRoom, ChatMessages, UsersPerRoom, ApiErrorData } from './data/types'
import './App.scss'
import { events } from './data/eventNames'

const App = () => {
  const [username, setUsername] = useState<string>(localStorage.getItem('chat-username') || '')
  const [avatar] = useState(`https://api.adorable.io/avatars/${50}/${username}`)
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessages>({})
  const [presenceInfo, setPresenceInfo] = useState<UsersPerRoom>({})
  const [currentChatRoom, setCurrentChatRoom] = useState<ChatRoom>()
  const [error, setError] = useState<ApiErrorData>()
  const [chatClient, setChatClient] = useState<ChatClient>()

  useEffect(() => {
    async function setAppConfig() {
      try {
        const { websocketEndpoint, serverEndpoint } = createAppConfig()
        const chatRoomResponse: { data: { chatRooms: ChatRoom[] } } = await getRequest(
          `${serverEndpoint}/rooms`
        )
        const chatRoomsData = chatRoomResponse.data.chatRooms
        setChatRooms(chatRoomsData)
        const defaultChatMessages: ChatMessages = {}
        chatRoomsData.forEach(room => {
          defaultChatMessages[room.name] = []
        })
        setChatMessages(defaultChatMessages)
        const client = new ChatClient({
          chatServiceEndpoint: websocketEndpoint,
          clientName: username,
          chatRooms: chatRoomsData,
          setChatMessages,
          setPresenceInfo,
          setError
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
    localStorage.setItem('chat-username', username)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorBanner error={error} setError={setError} />
        <Switch>
          <PrivateRoute exact path="/chat" username={username}>
            <ChatPage
              chatMessages={chatMessages}
              sendMessageHandler={sendMessageHandler}
              username={username}
              avatar={avatar}
              chatRooms={chatRooms}
              setCurrentChatRoom={handleChangingChatRoom}
              currentChatRoom={currentChatRoom}
              presenceInfo={presenceInfo}
            />
          </PrivateRoute>
          <Route path="/">
            <LandingPage setUsername={handleSettingUsername} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App

const PrivateRoute = ({ children, ...rest }: any) => {
  return rest.username ? <Route {...rest}>{children}</Route> : <Redirect to="/" />
}
