/* eslint-disable */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import ScoreList from './GameplayComponents/ScoreList'
import { ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup, Badge } from 'react-bootstrap'

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
    let ret = [<h2>Winner: </h2>]
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

    for (let i = 0; i < windexes.length; ++i) {
      ret.push(<h3>{players[windexes[i]]}</h3>)
    }
    return ret
  }

  const returnPlayersAndScores = () => {
    const ret = []
    // itemsArray.sort(function(a, b){  
    //   return sortingArr.indexOf(a) - sortingArr.indexOf(b);
    // });

    // console.log(players)
    // console.log(scores)

    for (let i = 0; i < players.length; ++i) {
      ret.push(       
        <ListGroup.Item as="li">
          {players[i]} {' '}
          <Badge variant="primary" pill >
            {scores[i]}
          </Badge>
        </ListGroup.Item> 
      )
    }

    return (
      <ListGroup as="ol" numbered >
        {ret}
      </ListGroup>
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
      
      <Card.Title>Game Over! Final Scores:</Card.Title>
      <Card.Body>
        <ScoreList />
        <br/>
        <Button>Play again with same players</Button>
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
