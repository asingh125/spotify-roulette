/* eslint-disable */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import ScoreList from './GameplayComponents/ScoreList'
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup, Badge } from 'react-bootstrap'

const EndPage = props => {
  // players = props.players
  const [players, setPlayers] = useState([])
  const [scores, setScores] = useState([])

  // const players = await axios.get('/gameapi/players')

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlayers()
      updateScores()
    }, 500)
    return () => clearInterval(interval)
  }, [players])

  const updatePlayers = async () => {
    //INSERT GET REQUEST FOR PLAYERS IN THE GAME
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }

  const updateScores = async () => {
    //INSERT GET REQUEST FOR PLAYERS IN THE GAME
    const { data } = await axios.get('/gameapi/scores')
    // console.log(`this is the data: ${data}`)
    const d = String(data).split(',')
    setScores(d)
  }

  const startNextRound = async () => {
    const { data } = await axios.post('/gameapi/nextround')
    if (data === 'round started') {
    } else if (data === 'game over') {
    }else {
      window.alert('Error starting next round. Please try again.');
    }
  }

  const navigate = useNavigate()

  const getWinners = () => {
    let windexes = [0]
    let winscore = scores[0]
    for (let i = 1; i < players.length; ++i) {
      if (scores[i] > winscore) {
        winscore = scores[i]
        windexes = [i]
      } else if (scores[i] === winscore) {
        windexes.push(i)
      }
    }

    let winnerHeader = ''
    if (windexes.length > 1) {
      winnerHeader = 'Winners: '
      // ret.push(<Card.Title>Winners: </Card.Title>)
    } else {
      winnerHeader = 'Winner: '
      // ret.push(<Card.Title>Winner: </Card.Title>)
    }

    let winnerList = []

    for (let i = 0; i < windexes.length; ++i) {
      winnerList.push( <> <Badge bg={'success'}>
        {players[windexes[i]]}
      </Badge> &nbsp; </>)
    }
    return (
      <h4>
        {winnerHeader} &nbsp; {winnerList}
      </h4>
    )
  }

  const goHome = async () => {
    navigate("/");
  }

  return ( 
    <>

    <Container fluid="md">
  <Row>
    <Col>
    <Card>
      {/* <Card.Header>
      Round {round}
      </Card.Header> */}
    <Form className="rounded p-4 p-sm-3">
      <Card.Body><h3 class="text-center">Game Over!</h3></Card.Body>
      <Card.Body>
        {getWinners()}
      </Card.Body>
      <Card.Body>
        <ScoreList />
        <br/>
        <Button>Play again {'('}same players{')'}</Button>
        <p></p>
        {/* <br/>
        <br/> */}
        <Button onClick={ () => {navigate('/')}}>New game</Button>
      </Card.Body>
    </Form>
    </Card>
    </Col>
    </Row>
    </Container>
      {/* <h2>Game Over! Final Scores:</h2>
      {returnPlayersAndScores()}
      <br />
      {getWinners()}
      <GridContainer>
      <Button onClick={goHome}>Back to Home</Button>
    </GridContainer>  */}
    </>
  )
 
}

export default EndPage
