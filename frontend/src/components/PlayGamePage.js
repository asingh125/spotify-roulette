/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
// import PlayerOption from './PlayerOption'
import AnswerSubmitter from './GameplayComponents/AnswerSubmitter'
import SongPlayer from './GameplayComponents/SongPlayer'
import { ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup } from 'react-bootstrap'


const PlayGamePage = props => {
  const players = props.players
  const round = props.round
  // const [round, setRound] = useState(1)
  const [selected, setSelected] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const song = props.song
  // const navigate = useNavigate()

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(`this is from playgamepage: ${players}`)
  //     // updatePlayers()
  //     // updateRound()
  //     // updateSong()
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [players])

  // const updatePlayers = async () => {
  //   const { data } = await axios.get('/gameapi/players')
  //   const d = data.split(',')
  //   setPlayers(d)
  // }

  // const updateSong = async () => {
  //   const { data } = await axios.get('/gameapi/song')
  //   setSong(data.split('|'))
  // }

  // const updateRound = async () => {
  //   const { data } = await axios.get('/gameapi/roundnum')
  //   setRound(parseInt(data))
  // }

  // const displayPlayerOptions = () => {
  //   let radios = []
  //   for (let i = 0; i < players.length; ++i) {
  //     const player = players[i]
  //     const radio = 
  //     <Form.Check 
  //       type={'radio'}
  //       id={`radio-${i}}`}
  //       label={player}
  //       name='radios'
  //       onClick={ () => {setSelected(player)} }
  //     />
  //     radios.push(radio)
  //     // let listOption = <> <ListGroup.Item>{player}</ListGroup.Item> </>
  //   }
  //   return (
  //     // <>
  //     //   {players.map(player => <> <ListGroup.Item>{player}</ListGroup.Item> </>)}
  //     // </>
  //     <>
  //     <Form>
  //       {radios}
  //     </Form>
  //   </>

  //   )
  // }

  // const submitAnswer = () => {
  //   axios.post('/gameapi/submitanswer', { selected }).then(result => {
  //     if (result.data === 'answer submitted') {
  //       setSubmitted(true)
  //     } else {
  //       window.alert('Error submitting answer. Please try again.');
  //     }
  //   })
  // }


  return (
    <>
    {/* <Navbar>
      <Container>
        <Navbar.Brand href="#home"> Spotify Roulette</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="">Signed in as: Aarushi</Nav.Link>
          <Button>Log out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}

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

      <AnswerSubmitter players={players} />

    </Form>
    </Card>
    </Col>
    </Row>
    </Container>
    </>
  )
 
}

export default PlayGamePage
