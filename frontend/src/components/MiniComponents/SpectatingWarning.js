/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup, Well } from 'react-bootstrap'

const SpectatingWarning = props => {
  // const alternative = props.alt
  const inGame = props.inGame
  const setInGame = props.setInGame
  // const [inGame, setInGame] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      checkIfInGame()
    }, 200)
    return () => clearInterval(interval)
  }, [inGame])

  const checkIfInGame = async () => {
    const { data } = await axios.get('/gameapi/players')
    const players = data.split(',')
    
    const gameIDURL = await axios.get('/gameapi/gameIDfromURL')

    const gameIDCookie = await axios.get('/gameapi/gameID')

    const username = await axios.get('/gameapi/username')

    setInGame(players.includes(username.data) && (gameIDURL.data === gameIDCookie.data) && inGame)
  }

  return (
    <>
    { (inGame) ? 
      // {alternative}
      <></>
      :
      <>
        <Alert variant="warning" > 
          You are currently spectating. Click <Alert.Link href="/">here</Alert.Link> to join game. 
        </Alert>
      </>
    }
    </>
  )

}

export default SpectatingWarning