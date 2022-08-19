/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
// import PlayerOption from './PlayerOption'
import AnswerSubmitter from '../MiniComponents/AnswerSubmitter'
import SongPlayer from '../MiniComponents/SongPlayer'
import { ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup } from 'react-bootstrap'


const PlayGamePage = props => {
  const players = props.players
  const round = props.round
  const song = props.song
  // const [players, setPlayers] = useState([])
  // const [round, setRound] = useState(0)
  // const [song, setSong] = useState('')

  // const [round, setRound] = useState(1)
  
  // const navigate = useNavigate()

  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <Card>
              <Card.Header>
              Round {round}
              </Card.Header>
            <Form className="rounded p-4 p-sm-3">

              <SongPlayer song={song}/>
              
              <p></p>

              <AnswerSubmitter players={players} inGame={props.inGame}/>

            </Form>
            </Card>
          </Col>
          </Row>
      </Container>
    </>
  )
 
}

export default PlayGamePage
