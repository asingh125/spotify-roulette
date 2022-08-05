import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup,
} from 'react-bootstrap'
import Timer from './Timer'
import JoinGamePage from './JoinGamePage'
import PlayGamePage from './PlayGamePage'
import BetweenPage from './BetweenPage'
import EndPage from './EndPage'
import App2 from './SongPlayer'

const GamePage = props => {
  const { _id } = useParams()
  const [username, setUsername] = useState('')
  const [mode, setMode] = useState(1)

  const updateMode = async () => {
    const { data } = axios.get('/gameapi/mode').then(result => {
      setMode(parseInt(result.data, 10))
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateMode()
    }, 1000)
    return () => clearInterval(interval)
  }, [mode])

  const updateLoginStatus = async () => {
    // const { data } = await axios.post('/account/isLoggedIn', { })
    // if (data.length > 0) {
    //   setLoginStatus(true)
    //   setUsername(data)
    // } else {
    //   setLoginStatus(false)
    // }
  }

  const navigate = useNavigate()

  const goHome = async () => {
    navigate('/')
  }

  const displayGameMode = () => {
    switch (mode) {
      case 1:
        return (<JoinGamePage />)
      case 2:
        return (<PlayGamePage />)
      case 3:
        return (<BetweenPage />) //If playerAdvancedToNextRound, then display between, else stay on oldie
      case 4:
        return (<EndPage />)
      default:
        return (<></>)
    }
  }

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home"> Spotify Roulette</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end" />
        </Container>
      </Navbar>

      {/* <Container fluid="md">
        <Row>
          <Col>
            <Card className="rounded p-4 p-sm-3"> */}
              {displayGameMode()}
            {/* </Card>
          </Col>
        </Row>
      </Container> */}

    </>
  )
}

export default GamePage
