import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import io from 'socket.io-client'
import { LandingPage } from './landing-page'
import { ChatPage } from './chat-page'
import './App.scss'

export type ToApiMessages = {
  username: string
  message: string
  clientTimestamp: Date
}

export interface Messages extends ToApiMessages {
  serverTimestamp: Date
}
export type ChatRoom = {
  label: string
  name: string
}

type Config = {
  websocketEndpoint: string
  serverEndpoint: string
}

const getRequest = (endpoint: string): Promise<{ data: any }> => {
  return new Promise(resolve => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
  })
}

const defaultAppConfig = {
  websocketEndpoint: 'ws://localhost:34000',
  serverEndpoint: 'http://localhost:34000'
}

const createAppConfig = (
  serverPort: string
): {
  websocketEndpoint: string
  serverEndpoint: string
} => {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') {
    return {
      websocketEndpoint: `wss://intense-plateau-11880.herokuapp.com:${serverPort}`,
      serverEndpoint: 'https://intense-plateau-11880.herokuapp.com'
    }
  } else {
    return defaultAppConfig
  }
}

const App = () => {
  const [username, setUsername] = useState<string>(localStorage.getItem('chat-username') || '')
  const [chatMessages, setChatMessages] = useState<Messages[]>([])
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [config, setAppConfig] = useState<Config>(defaultAppConfig)
  const [error, setError] = useState<{ status: string; message: string }>()

  useEffect(() => {
    localStorage.setItem('chat-username', username)
  }, [username])

  useEffect(() => {
    async function setAppConfigs() {
      try {
        const response: { data: { port: string } } = await getRequest('http://localhost:34000/port')
        const { websocketEndpoint, serverEndpoint } = createAppConfig(response.data.port)
        const chatRoomResponse: { data: { chatRooms: ChatRoom[] } } = await getRequest(
          `${serverEndpoint}/chat/rooms`
        )
        setChatRooms(chatRoomResponse.data.chatRooms)
        setAppConfig({ websocketEndpoint, serverEndpoint })
      } catch (err) {
        setError({ status: err.status, message: err.message })
      }
    }
    setAppConfigs()
  }, [])

  const socket = io(config.websocketEndpoint, {
    transports: ['websocket', 'polling', 'flashsocket']
  })

  socket.on('connect', function () {
    console.log('WebSocket Client Connected')
    socket.send('Hi this is web client.')
  })

  socket.on('event', function (data: any) {
    console.log('Received: ' + data)
  })

  socket.on('chat_room', (data: any) => {
    const { username, message, clientTimestamp, serverTimestamp } = data
    console.log(data)
    setChatMessages([...chatMessages, { username, message, clientTimestamp, serverTimestamp }])
  })

  socket.on('disconnect', function () {
    console.log('WebSocket Client Disconnected')
  })

  const sendMessageHandler = (message: string): void => {
    socket.emit('new_message', { message, username, clientTimestamp: new Date().toISOString() })
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
