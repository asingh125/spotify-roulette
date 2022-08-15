/* eslint-disable */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ScoreList from './GameplayComponents/ScoreList'
import { useNavigate } from "react-router-dom"
import { ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup } from 'react-bootstrap'

const BetweenPage = props => {
  const players = props.players
  // const [players, setPlayers] = useState([])
  const [scores, setScores] = useState([])
  const [round, setRound] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      updateRound()
    }, 500)
    return () => clearInterval(interval)
  }, [round])

  const updateRound = async () => {
    const { data } = await axios.get('/gameapi/roundnum')
    setRound(parseInt(data))
  }

  const startNextRound = async () => {
    if (round >= (2 * players.length)) {
      await axios.post('/gameapi/end')
    } else {
      const { data } = await axios.post('/gameapi/nextround')

      if (data === 'round started') {

      } else if (data === 'game over') {
      }else {
        window.alert('Error starting next round. Please try again.');
      }
    }
  }

  const navigate = useNavigate()


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

    <Card.Body>
      <ScoreList />
      <br/>
      <Button onClick={startNextRound}>Start Next Round</Button>
    </Card.Body>

    </Form>
    </Card>
    </Col>
    </Row>
    </Container>
    </>
  )
 
}

export default BetweenPage
