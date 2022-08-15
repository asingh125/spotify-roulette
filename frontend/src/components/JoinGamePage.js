/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup, Well } from 'react-bootstrap'

const JoinGamePage = props => {
  const [players, setPlayers] = useState([])
  const [id, setID] = useState('    Loading...   ')

  useEffect(() => {
    const interval = setInterval(() => {
     updatePlayers()
     updateGameID()
    }, 500)
    return () => clearInterval(interval)
  }, [players])

  const updatePlayers = async () => {
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }

  const updateGameID = async () => {
    const { data } = await axios.get('/gameapi/gameID')
    setID(data.toString())
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
      <Card.Body>
      
      <Card.Title>Game Code:</Card.Title>
      <Alert key='warning' variant='secondary'>
              {/* <h6 className="text-center">{'  '}{id}{'  '}</h6> */}
              {id}
      </Alert>
      {/* <Card.Body>
        <Container>
          <Row > 
             </Container>className="justify-content-md-center"> 
            <Col md="auto"> 
              <Alert key='warning' variant='secondary'>
              {id}
              </Alert>
            </Col>
          </Row>
        </Container>

      {/* <Well ></Well> 
      </Card.Body> */}

      <div> <br/> </div>

      <Card.Title>Players:</Card.Title>
      <Card.Body>
        <ListGroup>
          <>
            {players.map(player => <> <ListGroup.Item>{player}</ListGroup.Item> </>)}
          </>
        </ListGroup>
      </Card.Body>
      <br/>
      <Button onClick={startGame}>Start Game</Button>
    {/* <h2>Players:</h2> */}
    {/* <>
      {players.map(player => <> <p>{player}</p> <br/> </>)}
    </> */}
    {/* <ProgressBar now={33} /> */}
    {/* <br />
     <GridContainer>
      <Button onClick={startGame}>Start Game</Button>
    </GridContainer>  */}
    </Card.Body>
    </Form>
    </Card>
    </Container>

    </>
  )
 
}

export default JoinGamePage
