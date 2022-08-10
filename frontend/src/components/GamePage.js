/* eslint-disable */

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
import ModeUpdater from './Updaters/ModeUpdater'
import SongUpdater from './Updaters/SongUpdater'
import PlayersUpdater from './Updaters/PlayersUpdater'


const GamePage = props => {
  const { _id } = useParams()
  const [username, setUsername] = useState('')
  const [mode, setMode] = useState(1)
  const [song, setSong] = useState('')
  const [players, setPlayers] = useState([])

  // const updateMode = async () => {
  //   const { data } = axios.get('/gameapi/mode').then(result => {
  //     return parseInt(result.data, 10)
  //   })
  // }

  // const updateSong = async () => {
  //   const { data } = axios.get('/gameapi/songID').then(result => {
  //     return result.data
  //   })
  // }

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
        return (<PlayGamePage song={song} players={players}/>)
      case 3:
        return (<BetweenPage players={players}/>) //If playerAdvancedToNextRound, then display between, else stay on oldie
      case 4:
        return (<EndPage players={players}/>)
      default:
        return (<></>)
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
      The mode is: {mode}
      <br />
      The players are: {players}


    </>
  )
}

export default GamePage
