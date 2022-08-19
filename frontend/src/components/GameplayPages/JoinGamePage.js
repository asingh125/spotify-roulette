/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup, Well } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'

const JoinGamePage = props => {
  const [players, setPlayers] = useState([])
  const [id, setID] = useState('    Loading...   ')
  const [spectateLink, setSpectateLink] = useState('    Loading...   ')
  const [leftGame, setLeftGame] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
     updatePlayers()
     updateGameID()
    }, 200)
    return () => clearInterval(interval)
  }, [players])

  const updatePlayers = async () => {
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }

  const updateGameID = async () => {
    const { data } = await axios.get('/gameapi/refererURL')
    const dataArr = data.split('/')
    setID(dataArr[dataArr.length - 1])
    setSpectateLink(data)
  }

  const startGame = async () => {
    const { data } = await axios.post('/gameapi/startgame')
    if (data === 'game started') {
    } else {
      window.alert('Error starting game. Please try again.');
    }
  }

  const leaveGame = async () => {
    const { data } = await axios.post('/gameapi/leave')
    if (data === 'success') {
      setLeftGame(true)
    } else {
      window.alert(`ERROR: ${data}. Please try again.`)
    }
  }

  return (
    <>

 <Container fluid="md">
    <Card>
    <Form className="rounded p-4 p-sm-3">
    <Alert variant="light" style={{ margin: '1px'}}>
      <Alert.Heading>Game Code: </Alert.Heading>
      <Alert variant='primary' style={{ fontSize: '20px' }}>
          {id}
      </Alert>
      <hr />
      <p className="mb-0">
      Send this link to friends who want to spectate:
      <Alert variant='secondary' style={{ height: '3.5rem', fontSize: '14px' }}>
        {spectateLink}
      </Alert>
      </p>
    </Alert>
      <Card.Body style={{ margin: '1px'}}>
      
      {/* <Card.Title>Game Code:</Card.Title> */}

    {/* <Alert variant="secondary">
      <Alert.Heading>Game Code: </Alert.Heading>
      <Alert variant='light' style={{ fontSize: '20px' }}>
          {id}
      </Alert>
      <hr />
      <p className="mb-0">
      Send this link to friends who want to spectate:
      <Alert variant='light' style={{ height: '3.5rem', fontSize: '14px' }}>
        {spectateLink}
      </Alert>
      </p>
    </Alert> */}


      {/* <Alert key='warning' variant='secondary'>
              {id}
      </Alert> */}

      {/* <div> <br/> </div> */}

      <Card.Title>Players:</Card.Title>
        <ListGroup>
          <>
            {players.map(player => <> <ListGroup.Item>{player}</ListGroup.Item> </>)}
          </>
        </ListGroup>
      <br/>
      { leftGame ? 
        <>
          <Alert variant="success" onClose={() => setLeftGame(false)} dismissible> 
            Successfully left game!
          </Alert>
          <br/>
        </>
        :
        <>
          { (props.inGame) ? 
            <>
              <Button onClick={startGame}>Start Game</Button>
              &nbsp;
              <Button onClick={leaveGame} variant='danger'>Leave Game</Button>
    
            </>
            :
            <>
              <Button onClick={startGame} disabled={true}>Start Game</Button>
            </>
          }
        </>
      }


    </Card.Body>
    </Form>
    </Card>
    </Container>

    </>
  )
 
}

export default JoinGamePage
