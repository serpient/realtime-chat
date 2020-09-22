import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import io from 'socket.io-client'
import { LandingPage } from './landing-page'
import './App.scss'

function App() {
  const chatServiceEndpoint =
    process.env.NODE_ENV === 'production'
      ? 'wss://intense-plateau-11880.herokuapp.com:34000'
      : 'ws://localhost:34000'

  const socket = io(chatServiceEndpoint)

  socket.on('connect', function () {
    console.log('WebSocket Client Connected')
    socket.send('Hi this is web client.')
    // setInterval(() => {
    //   socket.emit('chat message', displayName)
    // }, 1000)
  })

  socket.on('event', function (data: any) {
    console.log('Received: ' + data)
  })

  socket.on('chat message', (msg: any) => {
    console.log(msg)
  })

  socket.on('disconnect', function () {
    console.log('WebSocket Client Disconnected')
  })
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/chat">
            <h1>Chat Room</h1>
          </Route>
          <Route path="/">
            <LandingPage displayName={displayName} setDisplayName={setDisplayName} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
