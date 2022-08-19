import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, PageHeader, Tabs, Tab, NavItem } from 'react-bootstrap'
import StartNewGameComponent from './TabComponents/StartNewGameComponent'
import JoinGameComponent from './TabComponents/JoinGameComponent'

/* eslint-disable */

const SplashPage = props => {
  const [username, setUsername] = useState('')
  const [gamecode, setGameCode] = useState('')
  const [loginStatus, setLoginStatus] = useState(true)
  const [navKey, setNavKey] = useState('startgame')

  useEffect(() => {
  }, [])

  const navigate = useNavigate()

  const startGame = async () => {
    console.log(username)
    const players = [username]
    const { _id } = await axios.post('/gameapi/create', { players })
    navigate(`/game/${_id}`)
    navigate(`/game/${result._id}`)
  }

  const navigateToNewGame = async (result) => {
    navigate(`/game/${result._id}`)
  }

  const joinGame = async () => {
    const _id = gamecode
    const { data1 } = await axios.post('/gameapi/join', { _id, username })
    console.log(data1)
    const { data } = await axios.post('gameapi/add_songs_to_game', { _id })
    console.log(data)
    if (data === 'songs added') {
      navigate(`/game/${_id}`)
    } else {
      window.alert(`Error: ${data}. Please try again.`)
    }
  }

  // const authenticateWithSpotify = async () => {
  //   const { data } = await axios.get('/login')
  //   .then(addTokenToUser())
  // }

  // const addTokenToUser = async () => {
  //   const { data } = await axios.post('gameapi/add_token_to_user')
  //   console.log(data)
  // }

  const navSelect = key => {
    setNavKey(key)
  }

  return (
    <>

      {/* header at the top */}
      <Navbar>
        <Container>
          <Navbar.Brand href="/"> Spotify Roulette</Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>

      <Container fluid="md">

        {/* game rules */}
        <Card>
          <Form className="rounded p-4 p-sm-3">
            <Form.Group>
              <Card.Title>Welcome to Spotify Roulette, a game where you try to guess your friends' music taste!</Card.Title> 
              Each round, a song from a different player's playlist will show up on the screen, and each player must guess whose they think it came from. The person with the most correct guesses at the end of the game wins. 
              To start playing, input a username and link to your favorite Spotify playlist. Have fun!
            </Form.Group>
          </Form>
        </Card>

        <Row>
          <Col>
            <Card>

              {/* navigation bar */}
              <Card.Header>
                <Nav variant="tabs" activeKey="startgame" onSelect={navSelect}>
                <Nav.Item>
                  <Nav.Link eventKey='startgame' active={navKey === 'startgame'}>Start Game</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='joingame' active={navKey === 'joingame'}>Join Game</Nav.Link>
                </Nav.Item>

              </Nav>
              </Card.Header>

              {/* empty tab */}
              {(navKey === 'startgame') ? 
                <StartNewGameComponent />
              :
              <></>
              }

              {/* join game tab */}
              {(navKey === 'joingame') ? 
                <JoinGameComponent />
              :
              <></>
              }


            </Card>
          </Col>
        </Row>
      </Container>

    </>
  )
 
}

export default SplashPage
