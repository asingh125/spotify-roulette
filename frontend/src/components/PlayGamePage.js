/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
// import PlayerOption from './PlayerOption'
import AnswerSubmitter from './GameplayComponents/AnswerSubmitter'
import SongPlayer from './GameplayComponents/SongPlayer'
import { ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup } from 'react-bootstrap'


const PlayGamePage = props => {
  const [players, setPlayers] = useState([])
  // const [song, setSong] = useState(['a','b','I Will Survive','Gloria Gaynor'])
  const [round, setRound] = useState(1)
  const [selected, setSelected] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const song = props.song
  const navigate = useNavigate()

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     updatePlayers()
  //     updateRound()
  //     // updateSong()
  //   }, 10000)
  //   return () => clearInterval(interval)
  // }, [players])

  const updatePlayers = async () => {
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }

  // const updateSong = async () => {
  //   const { data } = await axios.get('/gameapi/song')
  //   setSong(data.split('|'))
  // }

  const updateRound = async () => {
    const { data } = await axios.get('/gameapi/roundnum')
    setRound(parseInt(data))
  }

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

  const submitAnswer = () => {
    axios.post('/gameapi/submitanswer', { selected }).then(result => {
      if (result.data === 'answer submitted') {
        setSubmitted(true)
      } else {
        window.alert('Error submitting answer. Please try again.');
      }
    })
  }


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
      {/* <Card.Title>Song:</Card.Title>
      <Card.Body>
      <ListGroup>
      <ListGroup.Item variant="dark">
        <b>Title:</b> {song[2]}
      </ListGroup.Item>
      <ListGroup.Item variant="dark">
        <b>Artist:</b> {song[3]}
      </ListGroup.Item>
      </ListGroup>
      <Iframe iframe={iframe} /> 
      </Card.Body> */}

      <SongPlayer song={song}/>

      <AnswerSubmitter players={players}/>
      
      {/*
      <br />
      
      <Card.Title>Your guess:</Card.Title>
      <Card.Body>
      <ListGroup defaultActiveKey="">
        <>
          {displayPlayerOptions()}
        </>
        {/* <ListGroup.Item action href="">
          Aarushi
        </ListGroup.Item>
        <ListGroup.Item action href="">
          Ishaan
        </ListGroup.Item>
        <ListGroup.Item action href="">
          Sarah
        </ListGroup.Item> 
        </ListGroup>
        <br/>
        <Button onClick={submitAnswer}>Submit Answer</Button>
      </Card.Body> */}
    </Form>
    </Card>
    </Col>
    </Row>
    </Container>

    {/* <br />
    <>
      <h2>Song:</h2>
      <h3>Title: {song[2]}</h3>
      <h3>Artist: {song[3]}</h3>
      {players.map(player => <PlayerOption player={player} />)}
    </> */}
    </>
  )
 
}

export default PlayGamePage
