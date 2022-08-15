/* eslint-disable */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup, Spinner
} from 'react-bootstrap'
import Timer from './Timer'
import JoinGamePage from './JoinGamePage'
import PlayGamePage from './PlayGamePage'
import BetweenPage from './BetweenPage'
import EndPage from './EndPage'
import App2 from './SongPlayer'
import ModeUpdater from './Updaters/ModeUpdater'
import SongUpdater from './Updaters/SongUpdater'
import PlayersUpdater from './Updaters/PlayersUpdater'
import RoundUpdater from './Updaters/RoundUpdater'


const GamePage = props => {
  const { _id } = useParams()
  const [username, setUsername] = useState('')
  const [mode, setMode] = useState(0)
  const [song, setSong] = useState('')
  const [players, setPlayers] = useState([])
  const [round, setRound] = useState(0)

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
        return (<JoinGamePage />)
      case 2:
        return (<PlayGamePage song={song} players={players} round={round}/>)
      case 3:
        return (<BetweenPage players={players}/>) //If playerAdvancedToNextRound, then display between, else stay on oldie
      case 4:
        return (<EndPage players={players}/>)
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
      <ModeUpdater setState={setMode} initial={mode}/>
      <SongUpdater setState={setSong} initial={song}/>
      <PlayersUpdater setState={setPlayers} initial={players}/>
      <RoundUpdater setState={setRound} initial={round}/>
      {/* The mode is: {mode}
      <br />
      The players are: {players} 
      The round is: {round} */}
    </>
  )
}

export default GamePage
