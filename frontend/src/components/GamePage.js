/* eslint-disable */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup, Spinner
} from 'react-bootstrap'
import Timer from './Timer'
import JoinGamePage from './GameplayPages/JoinGamePage'
import PlayGamePage from './GameplayPages/PlayGamePage'
import BetweenPage from './GameplayPages/BetweenPage'
import EndPage from './GameplayPages/EndPage'
import ModeUpdater from './Updaters/ModeUpdater'
import SongUpdater from './Updaters/SongUpdater'
import PlayersUpdater from './Updaters/PlayersUpdater'
import RoundUpdater from './Updaters/RoundUpdater'
import SpectatingWarning from './MiniComponents/SpectatingWarning'


const GamePage = props => {
  const { _id } = useParams()
  const [username, setUsername] = useState('')
  const [mode, setMode] = useState(0)
  const [song, setSong] = useState('')
  const [players, setPlayers] = useState([])
  const [round, setRound] = useState(0)
  const [inGame, setInGame] = useState(true)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // updateMode()
  //     // updateSong()
  //   }, 10000)
  //   return () => clearInterval(interval)
  // }, [mode, song])

  const navigate = useNavigate()

  const goHome = async () => {
    navigate('/')
  }

  const displayGameMode = () => {
    switch (mode) {
      case 1:
        return (<JoinGamePage inGame={inGame} setInGame={setInGame} />)
      case 2:
        return (<PlayGamePage song={song} players={players} round={round} inGame={inGame} setInGame={setInGame} />)
      case 3:
        return (<BetweenPage players={players} inGame={inGame} setInGame={setInGame} />) 
      case 4:
        return (<EndPage players={players} inGame={inGame} setInGame={setInGame} />)
      default:
        return (
          <Container fluid="md">
          <Card> 
            <Card.Body>
            <Container>
              <Row className="justify-content-md-center">
                <div> <br/> </div>
                <Col md="auto"> <Spinner animation="border" variant="primary" role="status"> </Spinner> </Col>
                <Col md="auto"> <h2>{'   Loading...'}</h2> </Col>
                <div> <br/> </div>
              </Row>
            </Container>
            </Card.Body>
          </Card>
          </Container>
        )
    }
  }

  const period = 100
  const updaterList = [
    <ModeUpdater setState={setMode} initial={mode} period={period}/>,
    <SongUpdater setState={setSong} initial={song} period={period}/>,
    <PlayersUpdater setState={setPlayers} initial={players} period={period}/>,
    <RoundUpdater setState={setRound} initial={round} period={period}/>,
  ]

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/"> Spotify Roulette</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end" />
        </Container>
      </Navbar>

      {displayGameMode()}

      <Container fluid="md">
          <Form className="rounded p-8 p-sm-3">
            <Card.Body>
              <SpectatingWarning inGame={inGame} setInGame={setInGame} />
            </Card.Body>
          </Form>
      </Container>


      {updaterList}

    </>
  )
}

export default GamePage
