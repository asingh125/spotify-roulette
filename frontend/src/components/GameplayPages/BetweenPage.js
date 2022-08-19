/* eslint-disable */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ScoreList from '../MiniComponents/ScoreList'
import { useNavigate } from "react-router-dom"
import { Badge, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup } from 'react-bootstrap'

const BetweenPage = props => {
  const players = props.players
  const [round, setRound] = useState(1)
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      updateRound()
      updateAnswer()
    }, 200)
    return () => clearInterval(interval)
  }, [round])

  const updateRound = async () => {
    const { data } = await axios.get('/gameapi/roundnum')
    setRound(parseInt(data))
  }

  const updateAnswer = async () => {
    const { data } = await axios.get('/gameapi/answer')
    setAnswer(data.toString())
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
      <h4> Answer: &nbsp; <Badge bg={'info'} text="dark"> {answer} </Badge> </h4> 
    </Card.Body>

    <Card.Body>
      <ScoreList />
      <br/>
      { props.inGame ? 
        <Button onClick={startNextRound}>Start Next Round</Button>
        :
        <Button onClick={startNextRound} disabled={true}>Start Next Round</Button>
      }
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
