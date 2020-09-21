import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LandingPage } from './landing-page'
import './App.scss'

function App() {
  const [displayName, setDisplayName] = useState('')
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
