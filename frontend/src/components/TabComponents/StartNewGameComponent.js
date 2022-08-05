/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, PageHeader } from 'react-bootstrap'

const StartNewGameComponent = props => {
  const [username, setUsername] = useState('')
  const [playlist, setPlaylist] = useState('')
  const [gamecode, setGameCode] = useState('')

  // useEffect(() => {
  // }, [])

  const navigate = useNavigate();

  const startGame = async () => {
    // console.log(username)
    // let players = [username]
    const playlistID = extractgameID(playlist)
    axios.post('/gameapi/create', { username, playlistID }).then(result => {
      // console.log(result.data)
      navigate(`/game/${result.data}`)
    })

  }

  // warning when link is in the wrong format??
  const extractgameID = (link) => {
    try {
      const basicUrl = link.split('?')[0]
      console.log(basicUrl)
      const splitArr = basicUrl.split('/')
      const playlistId = splitArr[splitArr.length - 1]
      console.log(playlistId)
      return playlistId
    }
    catch (err) {
      return ''
    }
  }

  const navigateToNewGame = async (result) => {
    navigate(`/game/${result._id}`)
  }

  return (
    <>
      <Card.Body>
        <Form className="rounded p-4 p-sm-3">
          <Card.Text>
            Click the button below to generate a new game and share the access code with your friends!
          </Card.Text>

          <Form.Group className="mb-3" controlId="userInfo">
            <Form.Control placeholder="Name" value={username} onChange={e => setUsername(e.target.value)} />
            <br/>
            <Form.Control placeholder="Playlist Link" value={playlist} onChange={e => setPlaylist(e.target.value)} />
            <br/>
            <Button variant="primary" onClick={startGame}>Create game</Button>
          </Form.Group>

        </Form>
      </Card.Body>
      {/* <Form className="rounded p-4 p-sm-3">
        <Form.Group>
          <Card.Body>
            <Card.Text>
              Click the button below to generate a new game and share the access code with your friends!
            </Card.Text>
            <Button variant="primary" onClick={startGame}>New NOT USED game</Button>
            <Card.Text>
              <br />
            <Card.Title>Access Code: </Card.Title>
              <Card>
                <Card.Body>
                f0c1405ab1
                </Card.Body>
              </Card>
            </Card.Text>
          </Card.Body>
        </Form.Group>
      </Form> */}
              
    </>
  )
 
}

export default StartNewGameComponent
