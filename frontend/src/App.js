import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter } from "react-router-dom"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import SignUp from './components/SignUp'
import Login from './components/Login'
import SplashPage from './components/SplashPage'
import GamePage from './components/GamePage'
 
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SplashPage />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/game/:id" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
