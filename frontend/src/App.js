/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import SignUp from './components/SignUp'
// import Login from './components/Login'
import {
  Alert, Button, Card, Nav, Form,
} from 'react-bootstrap'
import SplashPage from './components/SplashPage'
import GamePage from './components/GamePage'
// import JoinGamePage from './components/JoinGamePage'
// import PlayGamePage from './components/PlayGamePage'
// import EndPage from './components/EndPage'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './custom.scss'

const App = () => (
  <BrowserRouter>
    {/* <Button>Test Button</Button>
    <Alert> Would you like to log in?</Alert> */}
    <Routes>
      <Route exact path="/" element={<SplashPage />} />
      {/* <Route exact path="/game:id" element={<SignUp />} /> */}
      <Route exact path="/game/:id" element={<GamePage />} />
      {/* <Route exact path="/redir" element={<Link to={{ pathname: "https://example.zendesk.com/hc/en-us/articles/123456789-Privacy-Policies" }} target="_blank" />} /> */}

      {/* <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/joingame/:id" element={<JoinGamePage />} />
        <Route exact path="/game/:id" element={<GamePage />} />
        <Route exact path="/play/:id" element={<PlayGamePage />} />
        <Route exact path="/end/:id" element={<EndPage />} /> */}
    </Routes>
  </BrowserRouter>
)

export default App
