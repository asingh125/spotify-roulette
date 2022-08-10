/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup } from 'react-bootstrap'


const JoinGamePage = props => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
     updatePlayers()
    }, 500)
    return () => clearInterval(interval)
  }, [players])

  const updatePlayers = async () => {
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }

  const navigate = useNavigate()

  const startGame = async () => {
    const { data } = await axios.post('/gameapi/startgame')
    if (data === 'game started') {
    } else {
      window.alert('Error starting game. Please try again.');
    }
  }

  return (
    <>

 <Container fluid="md">
    <Card>
    <Form className="rounded p-4 p-sm-3">
      <Card.Title>Players:</Card.Title>
      <Card.Body>
        <ListGroup>
          <>
            {players.map(player => <> <ListGroup.Item>{player}</ListGroup.Item> </>)}
          </>
        </ListGroup>
        <br/>
        <Button onClick={startGame}>Start Game</Button>
      </Card.Body>
    {/* <h2>Players:</h2> */}
    {/* <>
      {players.map(player => <> <p>{player}</p> <br/> </>)}
    </> */}
    {/* <ProgressBar now={33} /> */}
    {/* <br />
     <GridContainer>
      <Button onClick={startGame}>Start Game</Button>
    </GridContainer>  */}
    </Form>
    </Card>
    </Container>

    </>
  )
 
}

export default JoinGamePage
