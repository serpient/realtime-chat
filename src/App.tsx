import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import io from 'socket.io-client'
import { v4 as uuid } from 'uuid'
import { LandingPage } from './landing-page'
import { ChatPage } from './chat-page'
import { defaultAppConfig, createAppConfig, Config } from './utilities/createAppConfig'
import { getRequest } from './utilities/getRequest'
import { scrollToBottom } from './utilities/scrollToBottom'
import {
  setupSockets,
  setupChatRooms,
  sendMessageThroughSocket
} from './utilities/websocketHandler'
import { ChatRoom, ChatMessages, ChatMessageIds } from './data/message'
import './App.scss'

const App = () => {
  const [username, setUsername] = useState<string>(localStorage.getItem('chat-username') || '')
  const [chatMessages, setChatMessages] = useState<ChatMessages>({})
  const [chatMessageIds] = useState<ChatMessageIds>(new Set())
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [currentChatRoom, setCurrentChatRoom] = useState<ChatRoom>()
  const [config, setConfig] = useState<Config>(defaultAppConfig)
  const [error, setError] = useState<{ status: string; message: string }>()
  const [socket, setSocket] = useState<SocketIOClient.Socket>()

  useEffect(() => {
    localStorage.setItem('chat-username', username)
  }, [username])

  useEffect(() => {
    const incomingMessageHandler = (data: any, roomName: string) => {
      if (!chatMessageIds.has(data.uuid)) {
        setChatMessages(prevState => {
          return {
            ...prevState,
            [roomName]: [...prevState[roomName], data]
          }
        })
        chatMessageIds.add(data.uuid)
        scrollToBottom()
      }
    }

    async function setAppConfig() {
      try {
        const { websocketEndpoint, serverEndpoint } = createAppConfig()
        const chatRoomResponse: { data: { chatRooms: ChatRoom[] } } = await getRequest(
          `${serverEndpoint}/chat/rooms`
        )
        setChatRooms(chatRoomResponse.data.chatRooms)
        const defaultChatMessages: ChatMessages = {}
        chatRoomResponse.data.chatRooms.forEach(room => {
          defaultChatMessages[room.name] = []
        })
        setChatMessages(defaultChatMessages)
        setConfig({ websocketEndpoint, serverEndpoint })
        const socket = io(websocketEndpoint, {
          transports: ['websocket', 'polling', 'flashsocket']
        })
        setupSockets(socket)
        setupChatRooms(socket, chatRoomResponse.data.chatRooms, incomingMessageHandler)
        setSocket(socket)
      } catch (err) {
        setError({ status: err.status, message: err.message })
      }
    }
    setAppConfig()
    // eslint-disable-next-line
  }, [])

  const sendMessageHandler = (message: string): void => {
    if (socket && currentChatRoom) {
      sendMessageThroughSocket(socket, {
        message,
        username,
        clientTimestamp: new Date().toISOString(),
        chatRoom: currentChatRoom,
        uuid: uuid()
      })
    }
    // TODO else handle error
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
              setCurrentChatRoom={setCurrentChatRoom}
              currentChatRoom={currentChatRoom}
            />
          </Route>
          <Route path="/">
            <LandingPage setUsername={setUsername} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
