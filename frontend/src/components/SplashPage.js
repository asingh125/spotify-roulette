import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, PageHeader } from 'react-bootstrap'
import StartNewGameComponent from './TabComponents/StartNewGameComponent'
import JoinGameComponent from './TabComponents/JoinGameComponent'
import AccountComponent from './TabComponents/AccountComponent'

/* eslint-disable */

const SplashPage = props => {
  const [username, setUsername] = useState('')
  const [gamecode, setGameCode] = useState('')
  const [loginStatus, setLoginStatus] = useState(true)

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
                <Nav variant="tabs" defaultActiveKey="#startgame">
                <Nav.Item>
                  <Nav.Link href="/#startgame">Start Game</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/#joingame">Join Game</Nav.Link>
                </Nav.Item>

                {/* <Nav.Item>
                  <Nav.Link href="#account" >
                    Account
                  </Nav.Link>
                </Nav.Item> */}

              </Nav>
              </Card.Header>

              {/* empty tab */}
              {(window.location.hash.substr(1) === '' || window.location.hash.substr(1) === 'startgame') ? 
                <StartNewGameComponent />
              :
              <></>
              }

              {/* join game tab */}
              {(window.location.hash.substr(1) === 'joingame') ? 
                <JoinGameComponent />
              :
              <></>
              }

              {/* account tab
              {(window.location.hash.substr(1) === 'account') ? 
                <AccountComponent />
              :
              <></>
              } */}

            </Card>
          </Col>
        </Row>
      </Container>

    </>
  )
 
}

export default SplashPage
